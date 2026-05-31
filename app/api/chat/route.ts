import { NextResponse } from 'next/server';
import type { JWTInput } from 'google-auth-library';
let GoogleAuth: any = null;
try {
  // optional import; package is listed as optionalDependency
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  GoogleAuth = require('google-auth-library').GoogleAuth;
} catch (e) {
  GoogleAuth = null;
}

type ChatRequestBody = {
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body: ChatRequestBody = await request.json().catch(() => ({}));
    const prompt = body?.message;
    if (!prompt) {
      return NextResponse.json({ error: 'Missing `message` in request body' }, { status: 400 });
    }

    // Demo mode: disable external AI calls and return a custom auto-reply.
    const demoDisableAI = process.env.DEMO_DISABLE_AI === 'true' || process.env.DISABLE_AI === 'true';
    if (demoDisableAI) {
      const autoReply = process.env.DEMO_AUTO_REPLY_MESSAGE || 'Auto-reply: This system is in demo mode and AI calls are disabled.';
      return NextResponse.json({ reply: autoReply, model: 'demo-autoreply' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server missing GEMINI_API_KEY env var' }, { status: 500 });
    }

    // Try a prioritized list of models so we can pick the best available free model
    const candidates: string[] = process.env.GEMINI_MODEL
      ? [process.env.GEMINI_MODEL]
      : [
          // Prioritize Gemini Flash variants first per user preference
          'gemini-1.5-flash',
          'gemini-1.5',
          'gemini-1.5-mini',
          // Fallbacks
          'gemini-1.0',
          'text-bison-001',
        ];

    const maxTokens = Number(process.env.GEMINI_MAX_TOKENS || '256');

    let lastError: any = null;
    for (const model of candidates) {
      try {
            const apiEndpoint =
              process.env.GEMINI_API_ENDPOINT ||
              `https://generativelanguage.googleapis.com/v1beta2/models/${model}:generateText`;

            const payload = {
              prompt: { text: prompt },
              temperature: 0.2,
              maxOutputTokens: maxTokens,
            };

            // Determine auth: prefer service account JSON -> Bearer token, else use API key as ?key= param
            let url = apiEndpoint;
            const headers: Record<string, string> = { 'Content-Type': 'application/json' };

            const saJson = process.env.GEMINI_SERVICE_ACCOUNT_JSON;
            if (saJson && GoogleAuth) {
              try {
                const credentials: JWTInput = JSON.parse(saJson);
                const auth = new GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
                const client = await auth.getClient();
                const accessToken = (await client.getAccessToken()) as any;
                const token = accessToken?.token || accessToken;
                if (!token) throw new Error('Could not obtain access token from service account');
                headers.Authorization = `Bearer ${token}`;
              } catch (e: any) {
                lastError = `Service account auth failed: ${String(e?.message ?? e)}`;
                // Try next model or fallback to API key below
              }
            }

            if (!headers.Authorization) {
              // fall back to API key query param
              url = `${apiEndpoint}?key=${apiKey}`;
            }

            const res = await fetch(url, {
              method: 'POST',
              headers,
              body: JSON.stringify(payload),
            });

        const data = await res.json().catch(() => null);

        // Best-effort parsing for different generative API shapes.
        let reply = '';
        if (!data) {
          lastError = `No response for model ${model}`;
          continue;
        } else if (Array.isArray(data?.candidates) && data.candidates[0]?.output) {
          reply = data.candidates[0].output;
        } else if (typeof data?.output === 'string') {
          reply = data.output;
        } else if (Array.isArray(data?.output) && data.output[0]?.content) {
          reply = data.output[0].content;
        } else if (typeof data?.reply === 'string') {
          reply = data.reply;
        } else if (data?.choices && Array.isArray(data.choices) && data.choices[0]?.message?.content) {
          // OpenAI-like shape
          reply = data.choices[0].message.content;
        } else {
          // Not a recognized shape — keep as diagnostic
          lastError = `Unrecognized response shape for model ${model}: ${JSON.stringify(data).slice(0, 400)}`;
          continue;
        }

        // Success
        return NextResponse.json({ reply, model });
      } catch (err: any) {
        lastError = err?.message ?? err;
        // try next candidate
      }
    }

    return NextResponse.json({ error: String(lastError ?? 'No model produced a valid response') }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}

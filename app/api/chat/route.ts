/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { genRequestId, logRequest, logResponse, logError, maskKey, summarizePayload, summarizeResponseShape } from '@/lib/llm-logger';
import type { JWTInput } from 'google-auth-library';

let googleAuthModule: typeof import('google-auth-library') | null = null;

type ChatRequestBody = {
  message?: string;
};

type ModelFamily = 'gemini' | 'text' | 'unknown';

function getModelFamily(model: string): ModelFamily {
  if (model.startsWith('gemini-')) return 'gemini';
  if (model.startsWith('text-') || model.includes('bison')) return 'text';
  return 'unknown';
}

function buildEndpoint(model: string, customEndpoint?: string | null) {
  if (customEndpoint) {
    return {
      url: customEndpoint,
      endpointKind: /generateContent/i.test(customEndpoint)
        ? 'generateContent'
        : /generateText/i.test(customEndpoint)
          ? 'generateText'
          : 'custom',
    };
  }

  if (getModelFamily(model) === 'gemini') {
    return {
      url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      endpointKind: 'generateContent',
    };
  }

  return {
    url: `https://generativelanguage.googleapis.com/v1beta2/models/${model}:generateText`,
    endpointKind: 'generateText',
  };
}

function buildPayload(modelFamily: ModelFamily, prompt: string, maxTokens: number) {
  if (modelFamily === 'gemini') {
    return {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: maxTokens,
      },
    };
  }

  return {
    prompt: { text: prompt },
    temperature: 0.2,
    maxOutputTokens: maxTokens,
  };
}

function parseJson(raw: string) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function extractReply(data: any, modelFamily: ModelFamily) {
  if (modelFamily === 'gemini') {
    const candidate = data?.candidates?.[0];
    const parts = candidate?.content?.parts;
    if (Array.isArray(parts)) {
      const text = parts
        .map((part: any) => (typeof part?.text === 'string' ? part.text : ''))
        .filter(Boolean)
        .join('');
      if (text) return { reply: text, branch: 'candidates[0].content.parts[*].text' };
    }
    if (typeof candidate?.content?.text === 'string' && candidate.content.text) {
      return { reply: candidate.content.text, branch: 'candidates[0].content.text' };
    }
    if (typeof candidate?.output === 'string' && candidate.output) {
      return { reply: candidate.output, branch: 'candidates[0].output' };
    }
    if (typeof data?.output === 'string' && data.output) {
      return { reply: data.output, branch: 'output:string' };
    }
    if (typeof data?.reply === 'string' && data.reply) {
      return { reply: data.reply, branch: 'reply:string' };
    }
    return { reply: '', branch: 'gemini:unrecognized' };
  }

  if (Array.isArray(data?.candidates) && data.candidates[0]?.output) {
    return { reply: data.candidates[0].output, branch: 'candidates[0].output' };
  }
  if (typeof data?.output === 'string' && data.output) {
    return { reply: data.output, branch: 'output:string' };
  }
  if (Array.isArray(data?.output) && data.output[0]?.content) {
    return { reply: data.output[0].content, branch: 'output[0].content' };
  }
  if (typeof data?.reply === 'string' && data.reply) {
    return { reply: data.reply, branch: 'reply:string' };
  }
  if (data?.choices && Array.isArray(data.choices) && (data.choices[0]?.message?.content || data.choices[0]?.text)) {
    return {
      reply: data.choices[0]?.message?.content ?? data.choices[0]?.text ?? '',
      branch: 'choices[0].message.content|choices[0].text',
    };
  }
  if (Array.isArray(data?.responses) && data.responses[0]?.text) {
    return { reply: data.responses[0].text, branch: 'responses[0].text' };
  }
  return { reply: '', branch: 'unrecognized' };
}

function getEndpointWarnings(model: string, endpointKind: string, customEndpoint: string | null) {
  const warnings: string[] = [];
  if (getModelFamily(model) === 'gemini' && endpointKind === 'generateText') {
    warnings.push('Gemini models should use generateContent, not generateText.');
  }
  if (getModelFamily(model) === 'text' && endpointKind === 'generateContent') {
    warnings.push('Text-bison style models usually use generateText, not generateContent.');
  }
  if (customEndpoint && !/generativelanguage\.googleapis\.com/.test(customEndpoint)) {
    warnings.push('Custom endpoint does not look like the Gemini API host.');
  }
  return warnings;
}

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

    const endpointOverride = process.env.GEMINI_API_ENDPOINT?.trim() || null;

    // Try a prioritized list of models so we can pick the best available free model
    const candidates: string[] = process.env.GEMINI_MODEL
      ? [process.env.GEMINI_MODEL]
      : [
          // Prefer broadly-available / stable models first to avoid gated-model 404s
          'gemini-1.5',
          'gemini-1.5-flash',
          'text-bison-001',
          'gemini-1.5-mini',
          // Less likely to be available to all projects; try last
          'gemini-2.5-flash',
        ];

    const maxTokens = Number(process.env.GEMINI_MAX_TOKENS || '256');

    let lastError: any = null;
    for (let candidateIndex = 0; candidateIndex < candidates.length; candidateIndex += 1) {
      const model = candidates[candidateIndex];
      const requestId = genRequestId();
        const modelFamily = getModelFamily(model);
        const endpoint = buildEndpoint(model, endpointOverride);
        const endpointWarnings = getEndpointWarnings(model, endpoint.endpointKind, endpointOverride);
      try {
        const payload = buildPayload(modelFamily, prompt, maxTokens);

        // Determine auth: prefer service account JSON -> Bearer token, else use API key header.
        const url = endpoint.url;
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        let authMode: string = 'api-key';

        const saJson = process.env.GEMINI_SERVICE_ACCOUNT_JSON;
        if (!googleAuthModule) {
          try {
            googleAuthModule = await import('google-auth-library');
          } catch {
            googleAuthModule = null;
          }
        }

        if (saJson && googleAuthModule?.GoogleAuth) {
          try {
            const credentials: JWTInput = JSON.parse(saJson);
            const auth = new googleAuthModule.GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
            const client = await auth.getClient();
            const accessToken = (await client.getAccessToken()) as any;
            const token = accessToken?.token || accessToken;
            if (!token) throw new Error('Could not obtain access token from service account');
            headers.Authorization = `Bearer ${token}`;
            authMode = 'service-account';
          } catch (e: any) {
            lastError = `Service account auth failed: ${String(e?.message ?? e)}`;
            endpointWarnings.push(`Service account auth failed: ${String(e?.message ?? e)}`);
          }
        }

        if (!headers.Authorization) {
          headers['x-goog-api-key'] = apiKey;
          authMode = 'api-key-header';
        }

        // log request (mask sensitive values and capture shape, not full prompt content)
        try {
          await logRequest(requestId, {
            model,
            provider: 'google-generative-language',
            endpointKind: endpoint.endpointKind,
            candidateIndex,
            candidateCount: candidates.length,
            url,
            headers: {
              Authorization: headers.Authorization ? '[REDACTED]' : null,
              'x-goog-api-key': headers['x-goog-api-key'] ? maskKey(headers['x-goog-api-key']) : null,
            },
            payloadShape: summarizePayload(payload),
            config: {
              modelFamily,
              authMode,
              endpointOverride: !!endpointOverride,
              warnings: endpointWarnings,
            },
          });
        } catch {
          // ignore logger failures
        }

        const res = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });

        // Read raw text first so we can surface helpful diagnostics for non-JSON responses
        const raw = await res.text().catch(() => '');
        const data = parseJson(raw);
        const responseShape = summarizeResponseShape(data ?? raw);
        const providerError = data?.error ?? null;

        // HTTP-level errors
        if (!res.ok) {
          const diag = providerError?.message ?? providerError ?? raw ?? `${res.status} ${res.statusText}`;
          lastError = `HTTP ${res.status} ${res.statusText} from ${model} (${endpoint.endpointKind}): ${String(diag).slice(0, 400)}`;
          try {
            await logError(requestId, {
              model,
              provider: 'google-generative-language',
              endpointKind: endpoint.endpointKind,
              status: res.status,
              statusText: res.statusText,
              diag,
              raw,
              responseShape,
              warnings: endpointWarnings,
              config: {
                modelFamily,
                authMode,
                endpointOverride: !!endpointOverride,
              },
            });
          } catch {
            // noop
          }
          continue;
        }

        // API-level error object
        if (providerError) {
          const diag = typeof providerError === 'string' ? providerError : providerError?.message ?? JSON.stringify(providerError);
          lastError = `Provider error from ${model} (${endpoint.endpointKind}): ${String(diag).slice(0, 400)}`;
          try {
            await logError(requestId, {
              model,
              provider: 'google-generative-language',
              endpointKind: endpoint.endpointKind,
              status: res.status,
              statusText: res.statusText,
              diag,
              raw,
              responseShape,
              warnings: [
                ...endpointWarnings,
                typeof providerError === 'object' && providerError?.status
                  ? `Provider error status: ${providerError.status}`
                  : null,
                typeof providerError === 'object' && providerError?.code
                  ? `Provider error code: ${providerError.code}`
                  : null,
              ].filter(Boolean),
              config: {
                modelFamily,
                authMode,
                endpointOverride: !!endpointOverride,
              },
            });
          } catch {
            // noop
          }
          continue;
        }

        // Best-effort parsing for different generative API shapes.
        let reply = '';
        let parserBranch = 'unknown';
        if (data) {
          const extracted = extractReply(data, modelFamily);
          reply = extracted.reply;
          parserBranch = extracted.branch;
          if (!reply) {
            const promptFeedback = data?.promptFeedback ? ` promptFeedback=${JSON.stringify(data.promptFeedback).slice(0, 200)}` : '';
            lastError = `Unrecognized response shape for model ${model} (${endpoint.endpointKind}): ${JSON.stringify(responseShape).slice(0, 400)}${promptFeedback}`;
            try {
              await logError(requestId, {
                model,
                provider: 'google-generative-language',
                endpointKind: endpoint.endpointKind,
                status: res.status,
                statusText: res.statusText,
                diag: lastError,
                raw,
                responseShape,
                parserBranch,
                warnings: endpointWarnings,
                config: {
                  modelFamily,
                  authMode,
                  endpointOverride: !!endpointOverride,
                },
              });
            } catch {
              // noop
            }
            continue;
          }
        } else if (raw) {
          // Fallback to raw text body when JSON parsing failed but text exists.
          reply = raw.trim();
          parserBranch = 'raw-text-fallback';
          if (!reply) {
            lastError = `Empty text response from ${model}`;
            continue;
          }
        } else {
          lastError = `No response for model ${model}`;
          continue;
        }

        if (!reply || typeof reply !== 'string') {
          lastError = `Empty or invalid reply from ${model}`;
          try {
            await logError(requestId, {
              model,
              provider: 'google-generative-language',
              endpointKind: endpoint.endpointKind,
              diag: lastError,
              raw,
              responseShape,
              parserBranch,
              warnings: endpointWarnings,
              config: {
                modelFamily,
                authMode,
                endpointOverride: !!endpointOverride,
              },
            });
          } catch {
            // noop
          }
          continue;
        }
        // Success - log response and return
        try {
          await logResponse(requestId, {
            model,
            provider: 'google-generative-language',
            endpointKind: endpoint.endpointKind,
            parserBranch,
            status: res.status,
            statusText: res.statusText,
            raw,
            responseShape,
            parsedKeys: data && typeof data === 'object' ? Object.keys(data).slice(0, 20) : null,
            reply,
            note: endpointWarnings.length ? endpointWarnings.join(' | ') : null,
          });
          } catch {
            // noop
          }
        return NextResponse.json({ reply, model });
      } catch (err: any) {
        lastError = err?.message ?? err;
        try {
          await logError(requestId, {
            model,
            provider: 'google-generative-language',
            endpointKind: buildEndpoint(model, endpointOverride).endpointKind,
            message: err?.message ?? String(err),
            stack: err?.stack ?? null,
            raw: err?.raw ?? null,
            diag: err?.diag ?? null,
            warnings: endpointWarnings,
            config: {
              modelFamily: getModelFamily(model),
              endpointOverride: !!endpointOverride,
            },
          });
        } catch {
          // noop
        }
        // try next candidate
      }
    }

    return NextResponse.json({ error: String(lastError ?? 'No model produced a valid response') }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}

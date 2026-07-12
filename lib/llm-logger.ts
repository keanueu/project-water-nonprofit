/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';

function genId() {
  return `llm_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function safeStringify(v: any, max = 10000) {
  try {
    const s = typeof v === 'string' ? v : JSON.stringify(v);
    if (s.length > max) return s.slice(0, max) + '...<truncated>';
    return s;
  } catch {
    try {
      return String(v).slice(0, max);
    } catch {
      return '<unserializable>';
    }
  }
}

function sanitizeUrl(raw?: string | null) {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    for (const key of ['key', 'x-goog-api-key', 'access_token', 'token', 'authorization']) {
      if (url.searchParams.has(key)) {
        url.searchParams.set(key, '[REDACTED]');
      }
    }
    return url.toString();
  } catch {
    return raw.replace(/([?&](?:key|x-goog-api-key|access_token|token|authorization)=)[^&]+/gi, '$1[REDACTED]');
  }
}

function summarizeValue(value: any, depth = 0): any {
  if (value === null || value === undefined) return value === null ? null : undefined;
  if (typeof value === 'string') {
    return { type: 'string', length: value.length };
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return { type: typeof value, value };
  }
  if (Array.isArray(value)) {
    return {
      type: 'array',
      length: value.length,
      sample: depth >= 2 ? [] : value.slice(0, 3).map((item) => summarizeValue(item, depth + 1)),
    };
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const summary: Record<string, any> = {
      type: 'object',
      keyCount: keys.length,
      keys: keys.slice(0, 20),
    };

    if ('error' in value) summary.error = summarizeValue((value as any).error, depth + 1);
    if ('candidates' in value) summary.candidates = summarizeValue((value as any).candidates, depth + 1);
    if ('choices' in value) summary.choices = summarizeValue((value as any).choices, depth + 1);
    if ('responses' in value) summary.responses = summarizeValue((value as any).responses, depth + 1);

    return summary;
  }
  return { type: typeof value };
}

export function summarizePayload(payload: any) {
  return summarizeValue(payload);
}

export function summarizeResponseShape(response: any) {
  return summarizeValue(response);
}

function maskKey(k?: string | null) {
  if (!k) return null;
  if (k.length <= 10) return `${k.slice(0, 2)}...${k.slice(-2)}`;
  return `${k.slice(0, 4)}...${k.slice(-6)}`;
}

async function appendFileSafe(line: string) {
  try {
    if (process.env.DISABLE_FILE_LOGS === 'true') return;
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
    const file = path.join(logsDir, 'llm.log');
    fs.appendFileSync(file, line + '\n');
  } catch (error: any) {
    // 1. Fixed: Changed 'e' to 'error' to match your catch variable
    // 2. Fixed: casted or typed to 'any' so TypeScript allows the '.message' check
    console.warn('llm-logger: appendFileSafe failed', error?.message ?? error);
  }
}

async function write(entry: Record<string, any>) {
  const obj = {
    ts: new Date().toISOString(),
    ...entry,
  } as Record<string, any>;
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(JSON.stringify(obj));
    }
  } catch {
    // ignore
  }
  try {
    await appendFileSafe(JSON.stringify(obj));
  } catch {
    // noop
  }
}

export function genRequestId() {
  return genId();
}

export async function logRequest(id: string, meta: Record<string, any>) {
  const entry = {
    id,
    type: 'request',
    model: meta.model,
    provider: meta.provider || null,
    endpointKind: meta.endpointKind || null,
    candidateIndex: meta.candidateIndex ?? null,
    candidateCount: meta.candidateCount ?? null,
    url: sanitizeUrl(meta.url),
    payloadShape: meta.payloadShape || (meta.payload ? summarizePayload(meta.payload) : null),
    headers: meta.headers || null,
    env: {
      geminiModel: process.env.GEMINI_MODEL || null,
      geminiEndpoint: process.env.GEMINI_API_ENDPOINT ? '<custom>' : null,
      geminiApiKey: maskKey(process.env.GEMINI_API_KEY || null),
      hasServiceAccount: !!process.env.GEMINI_SERVICE_ACCOUNT_JSON,
    },
    config: meta.config || null,
  };
  await write(entry);
}

export async function logResponse(id: string, meta: Record<string, any>) {
  const entry = {
    id,
    type: 'response',
    model: meta.model,
    provider: meta.provider || null,
    endpointKind: meta.endpointKind || null,
    parserBranch: meta.parserBranch || null,
    responseShape: meta.responseShape || (meta.raw ? summarizeResponseShape(meta.raw) : null),
    status: meta.status,
    statusText: meta.statusText,
    rawPreview: meta.raw ? safeStringify(meta.raw, 500) : null,
    parsedKeys: meta.parsedKeys || null,
    replyLength: typeof meta.reply === 'string' ? meta.reply.length : null,
    note: meta.note || null,
  };
  await write(entry);
}

export async function logError(id: string, meta: any) {
  const entry = {
    id,
    type: 'error',
    model: meta?.model || null,
    provider: meta?.provider || null,
    endpointKind: meta?.endpointKind || null,
    status: meta?.status ?? null,
    statusText: meta?.statusText ?? null,
    parserBranch: meta?.parserBranch || null,
    responseShape: meta?.responseShape || null,
    rawShape: meta?.raw ? summarizeResponseShape(meta.raw) : null,
    message: meta?.message || (meta && meta.toString && meta.toString()) || String(meta),
    diag: meta?.diag || null,
    rawPreview: meta?.raw ? safeStringify(meta.raw, 4000) : null,
    stack: meta?.stack || null,
    warnings: meta?.warnings || null,
    config: meta?.config || null,
  };
  await write(entry);
}

export { maskKey };

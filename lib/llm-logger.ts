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
  } catch (e) {
    try {
      return String(v).slice(0, max);
    } catch (e2) {
      return '<unserializable>';
    }
  }
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
  } catch (e) {
    // best-effort only
    // eslint-disable-next-line no-console
    console.warn('llm-logger: appendFileSafe failed', e?.message ?? e);
  }
}

async function write(entry: Record<string, any>) {
  const obj = {
    ts: new Date().toISOString(),
    ...entry,
  } as Record<string, any>;
  try {
    // Print to console for immediate visibility in dev
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(obj));
  } catch (e) {
    // ignore
  }
  try {
    await appendFileSafe(JSON.stringify(obj));
  } catch (e) {
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
    url: meta.url,
    payload: meta.payload ? safeStringify(meta.payload, 2000) : null,
    headers: meta.headers || null,
    env: {
      geminiModel: process.env.GEMINI_MODEL || null,
      geminiEndpoint: process.env.GEMINI_API_ENDPOINT ? '<custom>' : null,
      geminiApiKey: maskKey(process.env.GEMINI_API_KEY || null),
      hasServiceAccount: !!process.env.GEMINI_SERVICE_ACCOUNT_JSON,
    },
  };
  await write(entry);
}

export async function logResponse(id: string, meta: Record<string, any>) {
  const entry = {
    id,
    type: 'response',
    model: meta.model,
    status: meta.status,
    statusText: meta.statusText,
    raw: meta.raw ? safeStringify(meta.raw, 20000) : null,
    parsedKeys: meta.parsedKeys || null,
  };
  await write(entry);
}

export async function logError(id: string, meta: any) {
  const entry = {
    id,
    type: 'error',
    model: meta?.model || null,
    message: meta?.message || (meta && meta.toString && meta.toString()) || String(meta),
    diag: meta?.diag || null,
    raw: meta?.raw ? safeStringify(meta.raw, 10000) : null,
    stack: meta?.stack || null,
  };
  await write(entry);
}

export { maskKey };

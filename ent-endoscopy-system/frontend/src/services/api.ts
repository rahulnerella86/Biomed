const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export function getToken() {
  return localStorage.getItem("medicore_token");
}
export function setToken(t: string) {
  localStorage.setItem("medicore_token", t);
}
export function clearToken() {
  localStorage.removeItem("medicore_token");
}

async function request(path: string, opts: RequestInit = {}) {
  const headers: Record<string,string> = { "Content-Type": "application/json", ...(opts.headers as any || {}) };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if (!res.ok) {
    const text = await res.text();
    let json: any;
    try { json = JSON.parse(text); } catch { json = { detail: text }; }
    const msg = json.detail || json.error?.message || text || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

export const api = {
  get: (p: string) => request(p),
  post: (p: string, body: any) => request(p, { method: "POST", body: JSON.stringify(body) }),
  put: (p: string, body: any) => request(p, { method: "PUT", body: JSON.stringify(body) }),
  del: (p: string) => request(p, { method: "DELETE" }),
  upload: async (p: string, file: File) => {
    const token = getToken();
    const fd = new FormData();
    fd.append("file", file);
    const headers: Record<string,string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${p}`, { method: "POST", headers, body: fd });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
};

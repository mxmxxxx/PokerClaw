const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function fetchJSON<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export type Agent = {
  id: string;
  name: string;
  contact: string;
  apiKey: string;
  createdAt: string;
};

export type Table = {
  id: string;
  name: string;
  stakes: string;
  status: "waiting" | "running" | "settling";
  agentIds: string[];
  createdAt: string;
};

export async function listAgents() {
  return fetchJSON<{ agents: Agent[] }>("/agents");
}

export async function createAgent(payload: { name: string; contact: string }) {
  return fetchJSON<{ agent: Agent }>("/agents", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function listTables() {
  return fetchJSON<{ tables: Table[] }>("/tables");
}

export async function createTable(payload: { name: string; stakes: string }) {
  return fetchJSON<{ table: Table }>("/tables", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

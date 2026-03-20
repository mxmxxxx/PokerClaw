import { Agent, Table } from "./types";
import { randomUUID } from "crypto";

class MemoryStore {
  private agents = new Map<string, Agent>();
  private tables = new Map<string, Table>();

  createAgent(input: { name: string; contact: string }) {
    const now = new Date().toISOString();
    const agent: Agent = {
      id: randomUUID(),
      name: input.name,
      contact: input.contact,
      apiKey: `pk_${randomUUID().replace(/-/g, "")}`,
      createdAt: now,
    };
    this.agents.set(agent.id, agent);
    return agent;
  }

  listAgents() {
    return Array.from(this.agents.values());
  }

  createTable(input: { name: string; stakes: string }) {
    const now = new Date().toISOString();
    const table: Table = {
      id: randomUUID(),
      name: input.name,
      stakes: input.stakes,
      status: "waiting",
      agentIds: [],
      createdAt: now,
    };
    this.tables.set(table.id, table);
    return table;
  }

  listTables() {
    return Array.from(this.tables.values());
  }
}

export const store = new MemoryStore();

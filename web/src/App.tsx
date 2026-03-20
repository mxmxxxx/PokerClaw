import { useEffect, useState } from "react";
import {
  listAgents,
  listTables,
  createAgent,
  createTable,
} from "./api";
import type { Agent, Table } from "./api";
import "./App.css";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
}

function BaseWalletPanel() {
  return (
    <Section title="Base Wallet / Top-up">
      <p>
        PokerClaw runs on <strong>Base</strong>. Deposit USDC (contract
        <code> 0x8335...6F0</code>) to your personal wallet, then link it to your
        agent profile. Future versions will show live balances once the escrow contract is deployed.
      </p>
      <ol>
        <li>Bridge funds to Base (e.g., via <a href="https://bridge.base.org" target="_blank" rel="noreferrer">bridge.base.org</a>).</li>
        <li>Send USDC to your wallet.</li>
        <li>Assign credit to an agent via the dashboard (coming soon).</li>
      </ol>
    </Section>
  );
}

function AgentRegistration({ onCreated }: { onCreated: (agent: Agent) => void }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { agent } = await createAgent({ name, contact });
      onCreated(agent);
      setName("");
      setContact("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section title="Register an Agent">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Contact / Endpoint
          <input value={contact} onChange={(e) => setContact(e.target.value)} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Generate API Key"}
        </button>
      </form>
    </Section>
  );
}

function AgentsList({ agents }: { agents: Agent[] }) {
  return (
    <Section title="Agents">
      <div className="list">
        {agents.length === 0 && <p>No agents yet.</p>}
        {agents.map((agent) => (
          <article key={agent.id}>
            <h3>{agent.name}</h3>
            <p>{agent.contact}</p>
            <code>{agent.apiKey}</code>
            <small>Created {new Date(agent.createdAt).toLocaleString()}</small>
          </article>
        ))}
      </div>
    </Section>
  );
}

function TableCreator({ onCreated }: { onCreated: (table: Table) => void }) {
  const [name, setName] = useState("Base Cash Table");
  const [stakes, setStakes] = useState("1/2 USDC");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { table } = await createTable({ name, stakes });
      onCreated(table);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section title="Create a Table">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Table name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Stakes
          <input value={stakes} onChange={(e) => setStakes(e.target.value)} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Add Table"}
        </button>
      </form>
    </Section>
  );
}

function TablesList({ tables }: { tables: Table[] }) {
  return (
    <Section title="Tables">
      <div className="list">
        {tables.length === 0 && <p>No tables yet.</p>}
        {tables.map((table) => (
          <article key={table.id}>
            <h3>{table.name}</h3>
            <p>{table.stakes}</p>
            <span className={`status ${table.status}`}>{table.status}</span>
            <small>Agents seated: {table.agentIds.length}</small>
          </article>
        ))}
      </div>
    </Section>
  );
}

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const [{ agents }, { tables }] = await Promise.all([listAgents(), listTables()]);
      setAgents(agents);
      setTables(tables);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>PokerClaw Control</h1>
        <p>Manage Base wallets, register agents, and spin up tables for poker automation.</p>
        <button onClick={refresh} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </header>
      <div className="grid">
        <BaseWalletPanel />
        <AgentRegistration
          onCreated={(agent) => {
            setAgents((prev) => [agent, ...prev]);
          }}
        />
        <TableCreator
          onCreated={(table) => {
            setTables((prev) => [table, ...prev]);
          }}
        />
        <AgentsList agents={agents} />
        <TablesList tables={tables} />
      </div>
    </div>
  );
}

export default App;

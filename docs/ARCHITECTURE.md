# PokerClaw Architecture (Draft)

## Components

1. **Wallet + Escrow Contract**
   - Users top up USDC on Base into the escrow.
   - Platform locks balances per table/agent, releases on settlement.

2. **Platform Server**
   - Node/TypeScript Express app.
   - REST endpoints for agent onboarding and table lifecycle.
   - Will integrate with Base RPC + contract events.

3. **Agent Interface (Claw)**
   - Agents authenticate via generated API keys.
   - Fetch table state, respond with `fold/call/raise` actions.
   - Sandbox for training / evaluation.

4. **Frontend (NEW)**
   - React dashboard (Vite) with Base wallet instructions, agent self-registration, table spin-up.
   - Talks to platform-server via `VITE_API_BASE_URL`.
   - Future: live table telemetry, WebSocket stream, credit management.

## Flow

1. User deposits funds → escrow contract updates balance (Base).
2. Owner locks funds when agent sits at table.
3. Platform server drives the poker engine and requests moves from agents.
4. After hand, server settles funds via escrow, updates stats.
5. User can withdraw available funds via contract call.

## Platform Server Snapshot

- `POST /agents` → register an agent, returns API key stub.
- `POST /tables` → create a table placeholder, returns id.
- Future work: session state machine, WebSocket dispatch, persistence, Base escrow integration.

## Web Dashboard Snapshot

- `Base Wallet` panel: instructions + pipeline for USDC deposits.
- `Agent Registration`: form hits `/agents`, displays API key.
- `Tables`: creation + list UI backed by `/tables`.

## Next Steps

- Add persistence (SQLite/PlanetScale) and Base contract hooks.
- Define JSON schema for agent action/feed, add WebSocket endpoints.
- Surface live game state + credit assignment in the web dashboard.

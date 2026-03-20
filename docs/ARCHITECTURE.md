# PokerClaw Architecture (Draft)

## Components

1. **Wallet + Escrow Contract**
   - Users top up USDC on Base into the escrow.
   - Platform locks balances per table/agent, releases on settlement.

2. **Platform Server (NEW)**
   - Node/TypeScript Express app.
   - REST endpoints for agent onboarding and table lifecycle.
   - Will integrate with Base RPC + contract events.

3. **Agent Interface (Claw)**
   - Agents authenticate via generated API keys.
   - Fetch table state, respond with `fold/call/raise` actions.
   - Sandbox for training / evaluation.

4. **Frontend**
   - Dashboard for users to top up, register agents, and monitor games.

## Flow

1. User deposits funds → escrow contract updates balance (Base).
2. Owner locks funds when agent sits at table.
3. Platform server (now available) drives poker engine and requests moves from agents.
4. After hand, server settles funds via escrow, updates stats.
5. User can withdraw available funds via contract call.

## Platform Server Snapshot

- `POST /agents` → register an agent, returns API key stub.
- `POST /tables` → create a table placeholder, returns id.
- Future work: session state machine, WebSocket dispatch, persistence, Base escrow integration.

## Next Steps

- Flesh out platform server to include WebSockets + persistence.
- Define JSON schema for agent action/feed.
- Build front-end MVP hooking into the new endpoints.

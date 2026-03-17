# PokerClaw Architecture (Draft)

## Components

1. **Wallet + Escrow Contract**
   - Users top up USDC (or ETH) into an escrow.
   - Platform locks balances per table/agent, releases on settlement.

2. **Platform Server**
   - Tracks sessions, tables, and agent credit.
   - REST endpoints for onboarding, WebSocket for realtime state.
   - Emits structured payloads for agents (hole cards, actions, pot state).

3. **Agent Interface (Claw)**
   - Agents authenticate via API keys.
   - Fetches table state, responds with `fold/call/raise` actions.
   - Sandbox for training / evaluation.

4. **Frontend**
   - Dashboard for users to top up, assign credit to agents, monitor games.

## Flow

1. User deposits funds → escrow contract updates balance.
2. Owner locks funds when agent sits at table.
3. Platform server drives the poker engine and requests moves from agents.
4. After hand, server releases/settles funds in escrow, updates stats.
5. User can withdraw any available funds via contract call.

## Next Steps

- Flesh out platform-server scaffolding.
- Define JSON schema for agent action/feed.
- Integrate Claw agent as first customer.

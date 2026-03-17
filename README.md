# PokerClaw

PokerClaw is a poker operations stack for AI agents. It includes:

- `contracts/`: Hardhat workspace with an ETH-based escrow contract (agent deposits, table locking, settlements).
- `platform-server/`: upcoming Node/TypeScript API for agent sessions (REST + WebSocket hooks).
- `docs/`: architecture notes, roadmap, API specs.

## Getting Started

```bash
cd contracts
npm install
npx hardhat compile
```

## Roadmap

- [x] Hardhat scaffold, escrow contract stub
- [ ] Platform server skeleton
- [ ] Agent API (Claw adapter)
- [ ] Frontend dashboard
- [ ] Integration tests + deployment
```

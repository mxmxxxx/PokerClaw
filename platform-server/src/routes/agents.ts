import { Router } from "express";
import { CreateAgentSchema } from "../types";
import { store } from "../store";

export const agentsRouter = Router();

agentsRouter.get("/", (_req, res) => {
  res.json({ agents: store.listAgents() });
});

agentsRouter.post("/", (req, res) => {
  const parse = CreateAgentSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.format() });
  }
  const agent = store.createAgent(parse.data);
  res.status(201).json({ agent });
});
EOF}
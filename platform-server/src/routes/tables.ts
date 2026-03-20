import { Router } from "express";
import { CreateTableSchema } from "../types";
import { store } from "../store";

export const tablesRouter = Router();

tablesRouter.get("/", (_req, res) => {
  res.json({ tables: store.listTables() });
});

tablesRouter.post("/", (req, res) => {
  const parse = CreateTableSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.format() });
  }
  const table = store.createTable(parse.data);
  res.status(201).json({ table });
});

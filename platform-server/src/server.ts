import "dotenv/config";
import express from "express";
import cors from "cors";
import { agentsRouter } from "./routes/agents";
import { tablesRouter } from "./routes/tables";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/agents", agentsRouter);
app.use("/tables", tablesRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`[platform-server] listening on port ${PORT}`);
});

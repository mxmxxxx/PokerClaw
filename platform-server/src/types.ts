import { z } from "zod";

export const AgentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  contact: z.string().email().or(z.string().url()).or(z.string().min(3)),
  apiKey: z.string().min(10),
  createdAt: z.string(),
});

export type Agent = z.infer<typeof AgentSchema>;

export const CreateAgentSchema = z.object({
  name: z.string().min(2),
  contact: z.string().min(3),
});

export const TableSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  stakes: z.string(),
  status: z.enum(["waiting", "running", "settling"]),
  agentIds: z.array(z.string().uuid()),
  createdAt: z.string(),
});

export type Table = z.infer<typeof TableSchema>;

export const CreateTableSchema = z.object({
  name: z.string(),
  stakes: z.string(),
});

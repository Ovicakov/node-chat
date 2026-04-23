import type { FastifyInstance } from "fastify";
import healthHandler from "./health.handler.ts";

export default async function (app: FastifyInstance) {
  app.get("/health", healthHandler);
}

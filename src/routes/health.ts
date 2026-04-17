import type { FastifyInstance } from "fastify";

// Une route GET sur /health
// Fastify enregistre les routes avec app.get(), app.post(), etc.
// Le handler reçoit (request, reply) — l'équivalent de (req, res) en Express
export default async function (app: FastifyInstance) {
  app.get("/health", async () => {
    return { status: "ok" };
  });
}

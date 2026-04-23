import ws from "@fastify/websocket";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async function websocketPlugin(app: FastifyInstance) {
  await app.register(ws);
});

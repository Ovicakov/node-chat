import type { FastifyInstance } from "fastify";
import chatHandler from "./chat.handler.ts";

export default async function (app: FastifyInstance) {
  app.get("/chat", { websocket: true }, chatHandler);
}

import type { FastifyInstance } from "fastify";

import chatHandler from "./chat.handler.js";

export default async function (app: FastifyInstance) {
  app.get("/chat", { websocket: true }, chatHandler);
}

import type { FastifyInstance } from "fastify";
import type { WebSocket } from "@fastify/websocket";

const clients = new Set<WebSocket>();

export default async function (app: FastifyInstance) {
  app.get("/chat", { websocket: true }, async (socket, request) => {
    clients.add(socket);

    socket.on("message", (message) => {
      clients.forEach((client) => client.send(message));
    });

    socket.on("close", () => {
      clients.delete(socket);
    });
  });
}

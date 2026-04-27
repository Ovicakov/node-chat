import type { WebSocket } from "@fastify/websocket";

const clients = new Set<WebSocket>();

export default function chatHandler() {
  return async (socket: WebSocket) => {
    clients.add(socket);

    socket.on("message", (message) => {
      clients.forEach((client) => client.send(message));
    });

    socket.on("close", () => {
      clients.delete(socket);
    });
  };
}

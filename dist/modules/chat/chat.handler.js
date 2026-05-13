const clients = new Set();
export default function chatHandler() {
    return async (socket) => {
        clients.add(socket);
        socket.on("message", (message) => {
            clients.forEach((client) => client.send(message));
        });
        socket.on("close", () => {
            clients.delete(socket);
        });
    };
}
//# sourceMappingURL=chat.handler.js.map
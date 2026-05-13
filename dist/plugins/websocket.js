import ws from "@fastify/websocket";
import fp from "fastify-plugin";
export default fp(async function websocketPlugin(app) {
    await app.register(ws);
});
//# sourceMappingURL=websocket.js.map
import chatHandler from "./chat.handler.js";
export default async function (app) {
    app.get("/chat", { websocket: true }, chatHandler);
}
//# sourceMappingURL=chat.routes.js.map
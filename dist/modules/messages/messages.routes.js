import authenticate from "@src/hooks/authenticate.js";
import { messagesSchema } from "./messages.schema.js";
import { messagesGetHandler, messagesPostHandler } from "./messages.handler.js";
export default async function (app) {
    app.get("/messages", messagesGetHandler(app));
    app.post("/messages", { preHandler: authenticate, schema: { body: messagesSchema } }, messagesPostHandler(app));
}
//# sourceMappingURL=messages.routes.js.map
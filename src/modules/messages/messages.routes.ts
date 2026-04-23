import type { FastifyInstance } from "fastify";
import { messagesSchema, type MessagesBody } from "./messages.schema.ts";
import authenticate from "../../hooks/authenticate.ts";
import { messagesGetHandler, messagesPostHandler } from "./messages.handler.ts";

export default async function (app: FastifyInstance) {
  app.get("/messages", messagesGetHandler(app));

  app.post<{ Body: MessagesBody }>(
    "/messages",
    { preHandler: authenticate, schema: { body: messagesSchema } },
    messagesPostHandler(app),
  );
}

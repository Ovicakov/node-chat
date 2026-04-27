import type { FastifyInstance } from "fastify";

import authenticate from "@src/hooks/authenticate.ts";

import { messagesSchema, type MessagesBody } from "./messages.schema.ts";
import { messagesGetHandler, messagesPostHandler } from "./messages.handler.ts";

export default async function (app: FastifyInstance) {
  app.get("/messages", messagesGetHandler(app));

  app.post<{ Body: MessagesBody }>(
    "/messages",
    { preHandler: authenticate, schema: { body: messagesSchema } },
    messagesPostHandler(app),
  );
}

import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { MessagesBody } from "./messages.schema.js";
declare function messagesGetHandler(app: FastifyInstance): (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
declare function messagesPostHandler(app: FastifyInstance): (request: FastifyRequest<{
    Body: MessagesBody;
}>, reply: FastifyReply) => Promise<void>;
export { messagesGetHandler, messagesPostHandler };
//# sourceMappingURL=messages.handler.d.ts.map
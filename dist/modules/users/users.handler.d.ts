import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { UsersBody } from "./users.schema.js";
export default function usersHandler(app: FastifyInstance): (request: FastifyRequest<{
    Body: UsersBody;
}>, reply: FastifyReply) => Promise<void>;
//# sourceMappingURL=users.handler.d.ts.map
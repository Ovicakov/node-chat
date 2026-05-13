import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { type LoginBody, type RefreshTokenBody, type SignupBody } from "./auth.schema.js";
declare function loginHandler(app: FastifyInstance): (request: FastifyRequest<{
    Body: LoginBody;
}>, reply: FastifyReply) => Promise<undefined>;
declare function refreshTokenHandler(app: FastifyInstance): (request: FastifyRequest<{
    Body: RefreshTokenBody;
}>, reply: FastifyReply) => Promise<undefined>;
declare function signupHandler(app: FastifyInstance): (request: FastifyRequest<{
    Body: SignupBody;
}>, reply: FastifyReply) => Promise<void>;
export { loginHandler, signupHandler, refreshTokenHandler };
//# sourceMappingURL=auth.handler.d.ts.map
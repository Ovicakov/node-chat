import jwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: string; username: string };
    user: { id: string; username: string };
  }
}

/* 
  - @fastify/jwt defines request.user as unknown by default
  - You say "no, in my project request.user is { id: string, username: string }"
  - TypeScript merges your declaration with the library's one
*/

export default fp(async function jwtPlugin(app: FastifyInstance) {
  await app.register(jwt, { secret: app.config.JWT_SECRET });
});

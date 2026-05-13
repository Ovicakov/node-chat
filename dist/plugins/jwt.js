import jwt from "@fastify/jwt";
import fp from "fastify-plugin";
/*
  - @fastify/jwt defines request.user as unknown by default
  - You say "no, in my project request.user is { id: string }"
  - TypeScript merges your declaration with the library's one
*/
export default fp(async function jwtPlugin(app) {
    await app.register(jwt, { secret: app.config.JWT_SECRET });
});
//# sourceMappingURL=jwt.js.map
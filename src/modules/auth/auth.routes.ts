import { type FastifyInstance } from "fastify";
import authHandler from "./auth.handler.ts";
import { type AuthBody, authSchema } from "./auth.schema.ts";

export default async function (app: FastifyInstance) {
  app.post<{ Body: AuthBody }>(
    "/login",
    { schema: { body: authSchema } },
    authHandler(app),
  );
}

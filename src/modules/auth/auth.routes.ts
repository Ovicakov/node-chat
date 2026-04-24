import { type FastifyInstance } from "fastify";
import { loginHandler, signupHandler } from "./auth.handler.ts";
import { type LoginBody, loginSchema, type SignupBody } from "./auth.schema.ts";

export default async function (app: FastifyInstance) {
  app.post<{ Body: LoginBody }>(
    "/login",
    { schema: { body: loginSchema } },
    loginHandler(app),
  );

  app.post<{ Body: SignupBody }>("/signup", signupHandler(app));
}

import { type FastifyInstance } from "fastify";

import {
  loginHandler,
  signupHandler,
  refreshTokenHandler,
} from "./auth.handler.ts";
import {
  loginSchema,
  refreshTokenSchema,
  signupSchema,
} from "./auth.schema.ts";

export default async function (app: FastifyInstance) {
  app.post("/login", { schema: { body: loginSchema } }, loginHandler(app));

  app.post(
    "/refresh",
    { schema: { body: refreshTokenSchema } },
    refreshTokenHandler(app),
  );

  app.post("/signup", { schema: { body: signupSchema } }, signupHandler(app));
}

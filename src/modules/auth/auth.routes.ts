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
  type LoginBody,
  type RefreshTokenBody,
  type SignupBody,
} from "./auth.schema.ts";
import authenticate from "../../hooks/authenticate.ts";

export default async function (app: FastifyInstance) {
  app.post<{ Body: LoginBody }>(
    "/login",
    { schema: { body: loginSchema } },
    loginHandler(app),
  );

  app.post<{ Body: RefreshTokenBody }>(
    "/refresh",
    { schema: { body: refreshTokenSchema } },
    refreshTokenHandler(app),
  );

  app.post<{ Body: SignupBody }>(
    "/signup",
    { schema: { body: signupSchema } },
    signupHandler(app),
  );
}

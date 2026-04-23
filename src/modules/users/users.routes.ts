import { type FastifyInstance } from "fastify";
import { usersSchema, type UsersBody } from "./users.schema.ts";
import usersHandler from "./users.handler.ts";

export default async function (app: FastifyInstance) {
  app.post<{ Body: UsersBody }>(
    "/users",
    { schema: { body: usersSchema } },
    usersHandler(app),
  );
}

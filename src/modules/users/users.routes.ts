import { type FastifyInstance } from "fastify";
import { usersSchema } from "./users.schema.ts";
import usersHandler from "./users.handler.ts";

export default async function (app: FastifyInstance) {
  app.post("/users", { schema: { body: usersSchema } }, usersHandler(app));
}

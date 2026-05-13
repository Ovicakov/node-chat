import { type FastifyInstance } from "fastify";

import { usersSchema } from "./users.schema.js";
import usersHandler from "./users.handler.js";

export default async function (app: FastifyInstance) {
  app.post("/users", { schema: { body: usersSchema } }, usersHandler(app));
}

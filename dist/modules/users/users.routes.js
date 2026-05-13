import {} from "fastify";
import { usersSchema } from "./users.schema.js";
import usersHandler from "./users.handler.js";
export default async function (app) {
    app.post("/users", { schema: { body: usersSchema } }, usersHandler(app));
}
//# sourceMappingURL=users.routes.js.map
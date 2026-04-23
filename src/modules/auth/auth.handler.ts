import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { type AuthBody } from "./auth.schema.ts";

export default function authHandler(app: FastifyInstance) {
  return async (
    request: FastifyRequest<{ Body: AuthBody }>,
    reply: FastifyReply,
  ) => {
    const client = await app.pg.connect();

    const body = request.body;

    try {
      const result = await client.query(
        "SELECT * FROM users WHERE username=$1",
        [body.username],
      );

      if (!result.rows[0]) {
        return reply.status(404).send({ error: "User not found" });
      }

      const token = app.jwt.sign({
        username: body.username,
        id: result.rows[0].id,
      });
      reply.send({ token });
    } catch (_) {
      reply.status(500).send({ error: "Error" });
    } finally {
      client.release();
    }
  };
}

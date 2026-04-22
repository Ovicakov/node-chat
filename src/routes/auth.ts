import { type FastifyInstance } from "fastify";
import { type FromSchema } from "json-schema-to-ts";

const schema = {
  type: "object",
  required: ["username"],
  properties: {
    username: { type: "string" },
  },
} as const;

type Body = FromSchema<typeof schema>;

export default async function (app: FastifyInstance) {
  app.post<{ Body: Body }>(
    "/login",
    { schema: { body: schema } },
    async (request, reply) => {
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
    },
  );
}

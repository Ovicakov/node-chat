import { type FastifyInstance } from "fastify";
import { type FromSchema } from "json-schema-to-ts";
import authenticate from "../hooks/authenticate.ts";

const schema = {
  type: "object",
  required: ["content"],
  properties: {
    content: { type: "string" },
  },
} as const;

type Body = FromSchema<typeof schema>;

export default async function (app: FastifyInstance) {
  app.get("/messages", async (_, reply) => {
    const client = await app.pg.connect();

    try {
      const result = await client.query("SELECT * FROM messages");
      reply.send(result.rows);
    } catch (_) {
      reply.status(500).send({ error: "Failed to fetch messages" });
    } finally {
      client.release();
    }
  });

  app.post<{ Body: Body }>(
    "/messages",
    { preHandler: authenticate, schema: { body: schema } },
    async (request, reply) => {
      const client = await app.pg.connect();
      const content = request.body.content; // from body
      const userId = request.user.id; // from jwt body

      try {
        const result = await client.query(
          "INSERT INTO messages (content, user_id) VALUES ($1, $2) RETURNING *",
          [content, userId],
        );

        reply.status(201).send(result.rows[0]);
      } catch (err) {
        console.error(err);
        reply.status(500).send({ error: "Failed to create user" });
      } finally {
        client.release();
      }
    },
  );
}

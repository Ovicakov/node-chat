import { type FastifyInstance } from "fastify";
import { type FromSchema } from "json-schema-to-ts";

const schema = {
  type: "object",
  required: ["content", "user_id"],
  properties: {
    content: { type: "string" },
    user_id: { type: "string", format: "uuid" },
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
    { schema: { body: schema } },
    async (request, reply) => {
      const client = await app.pg.connect();
      const body = request.body;

      try {
        const result = await client.query(
          "INSERT INTO messages (content, user_id) VALUES ($1, $2) RETURNING *",
          [body.content, body.user_id],
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

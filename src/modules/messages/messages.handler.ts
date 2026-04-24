import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { MessagesBody } from "./messages.schema.ts";

function messagesGetHandler(app: FastifyInstance) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const client = await app.pg.connect();

    try {
      const result = await client.query("SELECT * FROM messages");
      reply.send(result.rows);
    } catch (_) {
      reply.status(500).send({ error: "Failed to fetch messages" });
    } finally {
      client.release();
    }
  };
}

function messagesPostHandler(app: FastifyInstance) {
  return async (
    request: FastifyRequest<{ Body: MessagesBody }>,
    reply: FastifyReply,
  ) => {
    const client = await app.pg.connect();
    const content = request.body.content; // from body
    const userId = request.user.id; // from jwt body

    try {
      const result = await client.query(
        "INSERT INTO messages (content, user_id) VALUES ($1, $2) RETURNING *",
        [content, userId],
      );

      reply.status(201).send(result.rows[0]);
    } catch (error) {
      reply.status(500).send({ error: "Failed to create message" });
    } finally {
      client.release();
    }
  };
}

export { messagesGetHandler, messagesPostHandler };

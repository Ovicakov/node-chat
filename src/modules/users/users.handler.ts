import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { UsersBody } from "./users.schema.ts";

export default function usersHandler(app: FastifyInstance) {
  return async (
    request: FastifyRequest<{ Body: UsersBody }>,
    reply: FastifyReply,
  ) => {
    const client = await app.pg.connect();
    const body = request.body;

    try {
      const result = await client.query(
        "INSERT INTO users (username) VALUES ($1) RETURNING *",
        [body.username],
      );
      reply.status(201).send(result.rows[0]);
    } catch (error: any) {
      if (error.code === "23505") {
        // 23505 is the PostgreSQL error code for a unique constraint violation
        reply.status(409).send({ error: "Username already exists" });
      } else if (error.code === "23514") {
        // 23514 is the PostgreSQL error code for a check constraint violation
        reply.status(400).send({ error: "Invalid username" });
      } else if (error.code === "22P02") {
        // 22P02 is the PostgreSQL error code for invalid input syntax
        reply.status(400).send({ error: "Invalid input syntax" });
      } else {
        reply.status(500).send({ error: "Failed to create user" });
      }
    } finally {
      client.release();
    }
  };
}

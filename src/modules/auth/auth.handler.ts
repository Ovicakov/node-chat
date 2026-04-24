import bcrypt from "bcrypt";
import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

import { type LoginBody, type SignupBody } from "./auth.schema.ts";

function loginHandler(app: FastifyInstance) {
  return async (
    request: FastifyRequest<{ Body: LoginBody }>,
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

      const isValid = await bcrypt.compare(
        body.password,
        result.rows[0].password,
      );

      if (!isValid) {
        return reply.status(401).send({ error: "Invalid password" });
      }

      const token = app.jwt.sign({
        username: body.username,
        id: result.rows[0].id,
      });
      reply.send({ token });
    } catch {
      reply.status(500).send({ error: "Error" });
    } finally {
      client.release();
    }
  };
}

function signupHandler(app: FastifyInstance) {
  return async (
    request: FastifyRequest<{ Body: SignupBody }>,
    reply: FastifyReply,
  ) => {
    const client = await app.pg.connect();
    const body = request.body;
    const saltRounds = 5;

    try {
      const hash = await bcrypt.hash(body.password, saltRounds);
      await client.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [body.username, hash],
      );
    } catch {
      reply.send({ error: "Nope" });
    }
  };
}

export { loginHandler, signupHandler };

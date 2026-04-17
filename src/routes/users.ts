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
    "/users",
    { schema: { body: schema } },
    async (request, reply) => {
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
          // 23505 est le code d'erreur PostgreSQL pour une violation de contrainte d'unicité
          reply.status(409).send({ error: "Username already exists" });
        } else if (error.code === "23514") {
          // 23514 est le code d'erreur PostgreSQL pour une violation de contrainte de vérification
          reply.status(400).send({ error: "Invalid username" });
        } else if (error.code === "22P02") {
          // 22P02 est le code d'erreur PostgreSQL pour une erreur de syntaxe dans les données
          reply.status(400).send({ error: "Invalid input syntax" });
        } else {
          reply.status(500).send({ error: "Failed to create user" });
        }
      } finally {
        client.release();
      }
    },
  );
}

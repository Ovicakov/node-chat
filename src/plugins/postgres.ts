import ps from "@fastify/postgres";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async function postgresPlugin(app: FastifyInstance) {
  await app.register(ps, { connectionString: app.config.DATABASE_URL });
});

import ps from "@fastify/postgres";
import fp from "fastify-plugin";
export default fp(async function postgresPlugin(app) {
    await app.register(ps, { connectionString: app.config.DATABASE_URL });
});
//# sourceMappingURL=postgres.js.map
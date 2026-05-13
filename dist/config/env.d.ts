import type { FastifyInstance } from "fastify";
declare module "fastify" {
    interface FastifyInstance {
        config: {
            PORT: number;
            HOST: string;
            DATABASE_URL: string;
            JWT_SECRET: string;
            JWT_SECRET_EXPIRATION: string;
            REFRESH_TOKEN: string;
            REFRESH_TOKEN_EXPIRATION: string;
        };
    }
}
declare const _default: (app: FastifyInstance) => Promise<void>;
export default _default;
//# sourceMappingURL=env.d.ts.map
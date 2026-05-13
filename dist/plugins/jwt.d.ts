import type { FastifyInstance } from "fastify";
declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            id: string;
        };
        user: {
            id: string;
        };
    }
}
declare const _default: (app: FastifyInstance) => Promise<void>;
export default _default;
//# sourceMappingURL=jwt.d.ts.map
import type { FastifyInstance } from "fastify";

const generateAccessToken = (app: FastifyInstance, id: string) => {
  return app.jwt.sign(
    { id },
    { expiresIn: `${process.env.JWT_SECRET_EXPIRATION}` },
  );
};

export { generateAccessToken };

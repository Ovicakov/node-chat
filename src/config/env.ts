import env from "@fastify/env";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

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

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
      default: 3000,
    },
    HOST: {
      type: "string",
      default: "0.0.0.0",
    },
    DATABASE_URL: {
      type: "string",
      default: process.env.DATABASE_URL,
    },
    JWT_SECRET: {
      type: "string",
      default: process.env.JWT_SECRET,
    },
    JWT_SECRET_EXPIRATION: {
      type: "string",
      default: process.env.JWT_SECRET_EXPIRATION,
    },
    REFRESH_TOKEN: {
      type: "string",
      default: process.env.REFRESH_TOKEN,
    },
    REFRESH_TOKEN_EXPIRATION: {
      type: "string",
      default: process.env.REFRESH_TOKEN_EXPIRATION,
    },
  },
};

const options = {
  confKey: "config", // the allow configuration will be available with app.config
  schema,
};

export default fp(async function (app: FastifyInstance) {
  await app.register(env, options);
});

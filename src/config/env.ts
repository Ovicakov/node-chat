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
  },
};

const options = {
  confKey: "config", // the allow configuration will be available with app.config
  schema,
};

export default fp(async function (app: FastifyInstance) {
  await app.register(env, options);
});

import { type FromSchema } from "json-schema-to-ts";

const loginSchema = {
  type: "object",
  required: ["username", "password"],
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
} as const;

type LoginBody = FromSchema<typeof loginSchema>;

const signupSchema = {
  type: "object",
  required: ["password", "username"],
  properties: {
    password: { type: "string" },
    username: { type: "string" },
  },
} as const;

type SignupBody = FromSchema<typeof signupSchema>;

export { loginSchema, type LoginBody, type SignupBody, signupSchema };

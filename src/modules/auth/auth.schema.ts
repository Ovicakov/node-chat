import { type FromSchema } from "json-schema-to-ts";

const loginSchema = {
  type: "object",
  required: ["username", "password"],
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
} as const;

const signupSchema = {
  type: "object",
  required: ["password", "username"],
  properties: {
    password: { type: "string" },
    username: { type: "string" },
  },
} as const;

const refreshTokenSchema = {
  type: "object",
  required: ["refreshToken"],
  properties: {
    refreshToken: { type: "string" },
  },
} as const;

type LoginBody = FromSchema<typeof loginSchema>;
type RefreshTokenBody = FromSchema<typeof refreshTokenSchema>;
type SignupBody = FromSchema<typeof signupSchema>;

export {
  type LoginBody,
  type RefreshTokenBody,
  type SignupBody,
  loginSchema,
  refreshTokenSchema,
  signupSchema,
};

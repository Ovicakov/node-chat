import { type FromSchema } from "json-schema-to-ts";

const authSchema = {
  type: "object",
  required: ["username"],
  properties: {
    username: { type: "string" },
  },
} as const;

type AuthBody = FromSchema<typeof authSchema>;

export { authSchema, type AuthBody };

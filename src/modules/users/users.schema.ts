import { type FromSchema } from "json-schema-to-ts";

const usersSchema = {
  type: "object",
  required: ["username"],
  properties: {
    username: { type: "string" },
  },
} as const;

type UsersBody = FromSchema<typeof usersSchema>;

export { usersSchema, type UsersBody };

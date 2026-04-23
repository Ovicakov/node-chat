import type { FromSchema } from "json-schema-to-ts";

const messagesSchema = {
  type: "object",
  required: ["content"],
  properties: {
    content: { type: "string" },
  },
} as const;

type MessagesBody = FromSchema<typeof messagesSchema>;

export { messagesSchema, type MessagesBody };

import type { FromSchema } from "json-schema-to-ts";
declare const messagesSchema: {
    readonly type: "object";
    readonly required: readonly ["content"];
    readonly properties: {
        readonly content: {
            readonly type: "string";
        };
    };
};
type MessagesBody = FromSchema<typeof messagesSchema>;
export { messagesSchema, type MessagesBody };
//# sourceMappingURL=messages.schema.d.ts.map
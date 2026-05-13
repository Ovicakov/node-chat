import { type FromSchema } from "json-schema-to-ts";
declare const usersSchema: {
    readonly type: "object";
    readonly required: readonly ["username"];
    readonly properties: {
        readonly username: {
            readonly type: "string";
        };
    };
};
type UsersBody = FromSchema<typeof usersSchema>;
export { usersSchema, type UsersBody };
//# sourceMappingURL=users.schema.d.ts.map
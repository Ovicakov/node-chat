import {} from "json-schema-to-ts";
const usersSchema = {
    type: "object",
    required: ["username"],
    properties: {
        username: { type: "string" },
    },
};
export { usersSchema };
//# sourceMappingURL=users.schema.js.map
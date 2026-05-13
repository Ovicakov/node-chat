import {} from "json-schema-to-ts";
const loginSchema = {
    type: "object",
    required: ["username", "password"],
    properties: {
        username: { type: "string" },
        password: { type: "string" },
    },
};
const signupSchema = {
    type: "object",
    required: ["password", "username"],
    properties: {
        password: { type: "string" },
        username: { type: "string" },
    },
};
const refreshTokenSchema = {
    type: "object",
    required: ["refreshToken"],
    properties: {
        refreshToken: { type: "string" },
    },
};
export { loginSchema, refreshTokenSchema, signupSchema, };
//# sourceMappingURL=auth.schema.js.map
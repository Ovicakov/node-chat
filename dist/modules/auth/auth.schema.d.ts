import { type FromSchema } from "json-schema-to-ts";
declare const loginSchema: {
    readonly type: "object";
    readonly required: readonly ["username", "password"];
    readonly properties: {
        readonly username: {
            readonly type: "string";
        };
        readonly password: {
            readonly type: "string";
        };
    };
};
declare const signupSchema: {
    readonly type: "object";
    readonly required: readonly ["password", "username"];
    readonly properties: {
        readonly password: {
            readonly type: "string";
        };
        readonly username: {
            readonly type: "string";
        };
    };
};
declare const refreshTokenSchema: {
    readonly type: "object";
    readonly required: readonly ["refreshToken"];
    readonly properties: {
        readonly refreshToken: {
            readonly type: "string";
        };
    };
};
type LoginBody = FromSchema<typeof loginSchema>;
type RefreshTokenBody = FromSchema<typeof refreshTokenSchema>;
type SignupBody = FromSchema<typeof signupSchema>;
export { type LoginBody, type RefreshTokenBody, type SignupBody, loginSchema, refreshTokenSchema, signupSchema, };
//# sourceMappingURL=auth.schema.d.ts.map
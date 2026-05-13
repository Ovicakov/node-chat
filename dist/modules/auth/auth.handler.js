import bcrypt from "bcrypt";
import {} from "./auth.schema.js";
import { generateAccessToken } from "./auth.utils.js";
function loginHandler(app) {
    return async (request, reply) => {
        let client;
        const body = request.body;
        try {
            client = await app.pg.connect();
            const result = await client.query("SELECT * FROM users WHERE username=$1", [body.username]);
            if (!result.rows[0]) {
                return reply.status(404).send({ error: "User not found" });
            }
            const userId = result.rows[0].id;
            const isValid = await bcrypt.compare(body.password, result.rows[0].password);
            if (!isValid) {
                return reply.status(401).send({ error: "Invalid password" });
            }
            const token = generateAccessToken(app, userId);
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + Number(process.env.REFRESH_TOKEN_EXPIRATION));
            const refreshToken = crypto.randomUUID();
            await client.query("INSERT INTO refresh_tokens (refresh_token, expiration_date, user_id) VALUES ($1, $2, $3)", [refreshToken, expirationDate, userId]);
            reply.send({ token, refreshToken });
        }
        finally {
            client.release();
        }
    };
}
function refreshTokenHandler(app) {
    return async (request, reply) => {
        let client;
        const { refreshToken } = request.body;
        try {
            client = await app.pg.connect();
            const result = await client.query("SELECT * FROM refresh_tokens WHERE refresh_token=$1", [refreshToken]);
            if (!result.rows[0]) {
                return reply.status(404).send({ error: "User not found" });
            }
            const userId = result.rows[0].user_id;
            const isExpired = new Date() > new Date(result.rows[0].expiration_date);
            if (isExpired) {
                return reply.status(403).send({ error: "Invalid refresh token" });
            }
            const accessToken = generateAccessToken(app, userId);
            reply.send({ accessToken });
        }
        finally {
            client.release();
        }
    };
}
function signupHandler(app) {
    return async (request, reply) => {
        let client;
        const body = request.body;
        const saltRounds = 5; // 10-12 in production
        try {
            client = await app.pg.connect();
            const hash = await bcrypt.hash(body.password, saltRounds);
            await client.query("INSERT INTO users (username, password) VALUES ($1, $2)", [body.username, hash]);
            reply.status(201).send({ message: "User created" });
        }
        finally {
            client.release();
        }
    };
}
export { loginHandler, signupHandler, refreshTokenHandler };
//# sourceMappingURL=auth.handler.js.map
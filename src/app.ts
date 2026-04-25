import Fastify from "fastify";
// Plugins
import envPlugin from "./config/env.js";
import postgresPlugin from "./plugins/postgres.js";
import jwtPlugin from "./plugins/jwt.ts";
import websocket from "./plugins/websocket.ts";
// Routes
import healthRoute from "./modules/health/health.routes.ts";
import chatRoute from "./modules/chat/chat.routes.ts";
import usersRoute from "./modules/users/users.routes.ts";
import messagesRoute from "./modules/messages/messages.routes.ts";
import authRoute from "./modules/auth/auth.routes.ts";

// Create a Fastify instance with logger enabled
// Pino (the built-in logger) outputs JSON logs in production,
// and human-readable format in development via `transport`
const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

// Plugins
app.register(envPlugin);
app.after(() => {
  app.register(postgresPlugin);
});
app.register(jwtPlugin);
app.register(websocket);

// Routes
app.register(healthRoute);
app.register(usersRoute);
app.register(messagesRoute);
app.register(authRoute);
app.register(chatRoute);

export { app };

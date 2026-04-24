import Fastify from "fastify";
// Routes
import healthRoute from "./modules/health/health.routes.ts";
import chatRoute from "./modules/chat/chat.routes.ts";
import usersRoute from "./modules/users/users.routes.ts";
import messagesRoute from "./modules/messages/messages.routes.ts";
import authRoute from "./modules/auth/auth.routes.ts";
// Plugins
import envPlugin from "./config/env.js";
import postgresPlugin from "./plugins/postgres.js";
import jwtPlugin from "./plugins/jwt.ts";
import websocket from "./plugins/websocket.ts";

// On crée une instance Fastify avec le logger activé
// Pino (le logger intégré) affiche les logs en JSON en production,
// et en format lisible en développement grâce à `transport`
const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

// PLUGINS
app.register(envPlugin);
app.after(() => {
  app.register(postgresPlugin);
});
app.register(jwtPlugin);
app.register(websocket);

// ROUTES
app.register(healthRoute);
app.register(usersRoute);
app.register(messagesRoute);
app.register(authRoute);
app.register(chatRoute);

// On exporte l'instance de l'app pour pouvoir l'utiliser dans d'autres fichiers (ex: tests)
export { app };

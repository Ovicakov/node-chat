import Fastify from "fastify";
import envPlugin from "./config/env.js";
import healthRoute from "./routes/health.js";
import postgresPlugin from "./plugins/postgres.js";
import usersRoute from "./routes/users.ts";
import messagesRoute from "./routes/messages.ts";

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

app.register(envPlugin);
app.after(() => {
  app.register(postgresPlugin);
});
app.register(healthRoute);
app.register(usersRoute);
app.register(messagesRoute);

// On exporte l'instance de l'app pour pouvoir l'utiliser dans d'autres fichiers (ex: tests)

export { app };

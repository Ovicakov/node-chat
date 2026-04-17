import "dotenv/config";
import { app } from "./app.js";

try {
  await app.ready();
  await app.listen({ port: app.config.PORT, host: app.config.HOST });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}

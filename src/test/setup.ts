import { beforeAll } from "vitest";

import { app } from "@src/app.js";

beforeAll(async () => {
  await app.ready();
});

import { beforeAll } from "vitest";

import { app } from "@src/app.ts";

beforeAll(async () => {
  await app.ready();
});

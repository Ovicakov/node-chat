import { defineConfig } from "vitest/config";
import { resolve } from "path";
export default defineConfig({
    resolve: {
        alias: {
            "@src": resolve(__dirname, "./src"),
        },
    },
    test: {
        environment: "node",
        globals: true,
        include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        setupFiles: ["src/test/env.ts", "src/test/setup.ts"],
    },
});
//# sourceMappingURL=vitest.config.js.map
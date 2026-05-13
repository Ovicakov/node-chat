import healthHandler from "./health.handler.js";
export default async function (app) {
    app.get("/health", healthHandler);
}
//# sourceMappingURL=health.routes.js.map
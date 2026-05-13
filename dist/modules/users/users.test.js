import { describe, it, expect, vi } from "vitest";
import { app } from "@src/app.js";
describe("Users", () => {
    it("should create a user when it not exists", async () => {
        vi.spyOn(app.pg, "connect").mockResolvedValue({
            query: vi.fn().mockResolvedValue({ rows: [{ username: "Zidane" }] }),
            release: vi.fn(),
        });
        const response = await app.inject({
            method: "POST",
            url: "/users",
            body: {
                username: "Zidane",
            },
        });
        expect(response.json()).toEqual({ username: "Zidane" });
    });
    it.each([
        { errorCode: "23505", statusCode: 409 },
        { errorCode: "23514", statusCode: 400 },
        { errorCode: "22P02", statusCode: 400 },
        { errorCode: "23454", statusCode: 500 },
    ])("should return $statusCode for error code $errorCode", async ({ errorCode, statusCode }) => {
        vi.spyOn(app.pg, "connect").mockRejectedValue({ code: errorCode });
        const response = await app.inject({
            method: "POST",
            url: "/users",
            body: {
                username: "azer",
            },
        });
        expect(response.statusCode).toEqual(statusCode);
    });
});
//# sourceMappingURL=users.test.js.map
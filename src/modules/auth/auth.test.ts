import { describe, it, expect, vi, afterEach } from "vitest";
import bcrypt from "bcrypt";

import { app } from "@src/app.js";

const jwt = "azer-1234";
const refreshToken = "mocked-uuid";

describe("Auth", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /login", () => {
    const responsePayload = {
      method: "POST",
      url: "/login",
      body: {
        id: "1234",
        password: "pwd",
        username: "Franck",
      },
    } as const;

    it("should return jwt and refresh token when the user is on /login route", async () => {
      vi.spyOn(bcrypt, "compare").mockResolvedValue(true as never);
      vi.spyOn(app.jwt, "sign").mockReturnValue(jwt as never);
      vi.spyOn(crypto, "randomUUID").mockReturnValue(refreshToken as never);

      vi.spyOn(app.pg, "connect").mockResolvedValue({
        query: vi.fn().mockResolvedValue({
          rows: [{ username: "Franck", password: "pwd" }],
        }),
        release: vi.fn(),
      });

      const response = await app.inject(responsePayload);

      expect(response.json()).toEqual({ token: jwt, refreshToken });
    });

    it("should return an error 404 when the user is not found in database", async () => {
      vi.spyOn(app.pg, "connect").mockResolvedValue({
        query: vi.fn().mockResolvedValue({
          rows: [],
        }),
        release: vi.fn(),
      });

      const response = await app.inject(responsePayload);

      expect(response.statusCode).toEqual(404);
      expect(response.json()).toEqual({ error: "User not found" });
    });

    it("should return an error 401 if the password is not valide on connection", async () => {
      vi.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

      vi.spyOn(app.pg, "connect").mockResolvedValue({
        query: vi.fn().mockResolvedValue({
          rows: [{ username: "Franck", password: "pwd" }],
        }),
        release: vi.fn(),
      });

      const response = await app.inject(responsePayload);

      expect(response.statusCode).toEqual(401);
      expect(response.json()).toEqual({ error: "Invalid password" });
    });
  });

  describe("POST /refresh", () => {
    it("should return an error 404 when the user is not found in database", async () => {
      const date = new Date();
      date.setDate(date.getDate() + 30);

      vi.spyOn(app.pg, "connect").mockResolvedValue({
        query: vi.fn().mockResolvedValue({
          rows: [],
        }),
        release: vi.fn(),
      });

      const response = await app.inject({
        method: "POST",
        url: "/refresh",
        body: {
          id: "1234",
          user_id: "4567",
          refreshToken: "azer-1234",
          expirationDate: date,
          createdAt: date.getDate(),
        },
      });

      expect(response.statusCode).toEqual(404);
      expect(response.json()).toEqual({ error: "User not found" });
    });

    it("should return an error 403 if the refresh token is expired", async () => {
      const date = new Date();
      date.setDate(date.getDate() - 30);

      vi.spyOn(app.pg, "connect").mockResolvedValue({
        query: vi.fn().mockResolvedValue({
          rows: [
            {
              id: "1234",
              user_id: "4567",
              refresh_token: "azer-1234",
              expiration_date: date,
              created_at: date.getDate(),
            },
          ],
        }),
        release: vi.fn(),
      });

      const response = await app.inject({
        method: "POST",
        url: "/refresh",
        body: {
          id: "1234",
          user_id: "4567",
          refreshToken: "AZER-1234",
          expirationDate: date,
          createdAt: date.getDate(),
        },
      });

      expect(response.statusCode).toEqual(403);
      expect(response.json()).toEqual({ error: "Invalid refresh token" });
    });

    it("should return the access token when the refresh is not expired", async () => {
      const date = new Date();
      date.setDate(date.getDate() + 30);

      vi.spyOn(app.jwt, "sign").mockReturnValue(jwt as never);
      vi.spyOn(app.pg, "connect").mockResolvedValue({
        query: vi.fn().mockResolvedValue({
          rows: [
            {
              id: "1234",
              user_id: "4567",
              refresh_token: "azer-1234",
              expiration_date: date,
              created_at: date.getDate(),
            },
          ],
        }),
        release: vi.fn(),
      });

      const response = await app.inject({
        method: "POST",
        url: "/refresh",
        body: {
          id: "1234",
          user_id: "4567",
          refreshToken: "azer-1234",
          expirationDate: date,
          createdAt: date.getDate(),
        },
      });

      expect(response.json()).toEqual({ accessToken: "azer-1234" });
    });
  });
});

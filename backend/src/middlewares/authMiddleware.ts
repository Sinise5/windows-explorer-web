import { Elysia } from "elysia";

export const authMiddleware = new Elysia().onRequest(({ headers }) => {
  if (!headers.authorization) throw new Error("Unauthorized");
});

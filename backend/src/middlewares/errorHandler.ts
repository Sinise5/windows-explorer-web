import { Elysia } from "elysia";

export const errorHandler = new Elysia().onError(({ error }) => {
  return { error: error.message };
});

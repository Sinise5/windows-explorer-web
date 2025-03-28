import request from "supertest";
import { rawServer, server } from "../../../src/app";
import { afterAll, describe, it, expect } from "vitest";

describe("Folder API", () => {
  afterAll(() => {
    server.stop(); // Matikan server setelah testing selesai
  });

  it("should create a new folder", async () => {
    const response = await request(rawServer)
      .post("/folders")
      .send({ name: "Documents" });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Documents");
  });

  it("should get all folders", async () => {
    const response = await request(rawServer).get("/folders");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

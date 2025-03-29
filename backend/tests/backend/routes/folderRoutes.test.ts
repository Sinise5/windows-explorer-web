import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { folderRoutes } from "../../../src/routes/folderRoutes";

const app = new Elysia().use(folderRoutes);

describe("Folder Routes", () => {
    it("should return all folders", async () => {
        const response = await app.handle(new Request("http://localhost:3000/folders"));
        expect(response.status).toBe(200);
    });

    it("should return subfolders by ID", async () => {
        const response = await app.handle(new Request("http://localhost:3000/folders/1"));
        expect(response.status).toBe(200);
    });

    it("should create a new folder", async () => {
        const response = await app.handle(new Request("http://localhost:3000/folders", {
            method: "POST",
            body: JSON.stringify({ name: "New Folder", parentId: 1 }),
            headers: { "Content-Type": "application/json" },
        }));
        expect(response.status).toBe(201);
    });

    it("should search folders", async () => {
        const response = await app.handle(new Request("http://localhost:3000/folders/search?q=test"));
        expect(response.status).toBe(200);
    });

    it("should delete a folder", async () => {
        const response = await app.handle(new Request("http://localhost:3000/folders/1", {
            method: "DELETE",
        }));
        expect(response.status).toBe(200);
    });

    it("should return paginated folders", async () => {
        const response = await app.handle(new Request("http://localhost:3000/foldersPage?page=1&limit=10"));
        expect(response.status).toBe(200);
    });
});

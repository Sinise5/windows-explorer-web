import { Elysia } from "elysia";
import { folderRoutes } from "./src/routes/folderRoutes";
import  db  from "./src/config/database";

const app = new Elysia()
  .use(folderRoutes)
  .listen(3000);

console.log("Hello via Bun!");

console.log("🚀 Server running on http://localhost:3000");

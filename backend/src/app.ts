import { Elysia } from "elysia";
import { folderRoutes } from "./routes/folderRoutes";
import { fileRoutes } from "./routes/fileRoutes";
import { cors } from "@elysiajs/cors";
import { errorHandler } from "./middlewares/errorHandler";


export const app = new Elysia()
  .use(cors({ origin: "http://localhost:5173" }))
  .use(folderRoutes)
  .use(fileRoutes)
  .use(errorHandler)
 // .listen(3000);

 export const server = app.listen(3000);
 export const rawServer = server.server;


console.log(`Server running at http://localhost:3000`);

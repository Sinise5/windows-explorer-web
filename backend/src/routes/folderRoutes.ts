import { Elysia } from "elysia";
import { FolderController } from "../controllers/FolderController";

export const folderRoutes = new Elysia()
  .get("/folders", FolderController.getAllFolders)
  .get("/folders/:id", FolderController.getSubfolders)
  .post("/folders", FolderController.createFolder)
  .get("/folders/search", FolderController.searchFolders)
  .delete("/folders/:id", FolderController.deleteFolder)
  .get("/foldersPage", FolderController.getFolders);

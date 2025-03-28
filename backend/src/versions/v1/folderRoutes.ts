import { Elysia } from "elysia";
import { FolderControllerV1 } from "./folderController";

export const folderRoutesV1 = new Elysia({ prefix: "/v1" })
  .get("/folders", FolderControllerV1.getAllFolders)
  .get("/folders/:id", FolderControllerV1.getSubfolders)
  .post("/folders", FolderControllerV1.createFolder)
  .get("/folders/search", FolderControllerV1.searchFolders)
  .delete("/folders/:id", FolderControllerV1.deleteFolder)
  .get("/foldersPage", FolderControllerV1.getFolders);

import { Elysia, t } from "elysia";
import { Type } from "@sinclair/typebox";
import { staticPlugin } from "@elysiajs/static";
import path from "path";
import { FileController } from "../controllers/FileController";

export const fileRoutes = new Elysia()
.use(staticPlugin({ 
  prefix: "/uploads", 
  assets: path.resolve(__dirname, "../../../frontend/uploads/") 
}))
  .onRequest(({ request }) => {
    console.log("📥 Incoming Request:", request.method, request.url);
  })
  .onError(({ code, error }) => {
    const errorMessage = error instanceof Error 
        ? error.message 
        : JSON.stringify(error);

    console.error(`❌ Error ${code}:`, errorMessage);
})


  .get("/files/:folderId", FileController.getFilesByFolder)
  .put(
    "/files/:id/move",
    FileController.moveFile,
    {
      params: Type.Object({
        id: Type.String(), 
      }),
      body: Type.Object({
        newFolderId: Type.Number(),
      }),
    }
  )
  .post("/files/upload", async (context: any) =>
    FileController.uploadFile(context),
  {
    body: Type.Object({
      folderId: Type.String(),
      url: Type.String(),
      file: Type.Any(), 
    }),
  })
  .delete("/files/:id", FileController.deleteFile)
  .get("/files/search", FileController.searchFiles)
  ;

import { FileService } from "../services/fileService";

export class FileController {
  static async getFilesByFolder({ params }: any) {
    return await FileService.getFilesByFolder(Number(params.folderId));
  }

  static async uploadFile({
    body,
  }: {
    body: { folderId: string; url: string; file: File };
  }) {
    try {
      const folderId = parseInt(body.folderId);
      const url = body.url;
      const file = body.file;

      if (!file) throw new Error("File tidak ditemukan.");
      if (!folderId) throw new Error("Folder ID harus diberikan.");

      const savedFile = await FileService.uploadFile(file, url, folderId);
      return { success: true, file: savedFile };
    } catch (error) {
      const err = error as Error; 
      return { success: false, message: err.message };
    }
  }

  static async moveFile({ params, body }: { params: { id: string }; body: { newFolderId: number } }) {
    const fileId = Number(params.id);
    const newFolderId = Number(body.newFolderId);

    if (isNaN(fileId) || isNaN(newFolderId)) {
      return { error: "Invalid fileId or newFolderId" };
    }

    return await FileService.moveFile(fileId, newFolderId);
  }

  static async getFileUrl(req: any) {
    const fileId = parseInt(req.params.id);
    const url = await FileService.getFileUrl(fileId);

    return url ? { url } : { error: "File not found" };
  }

  static async deleteFile({ params }: any) {
    const fileId = parseInt(params.id);
    if (isNaN(fileId)) throw new Error("ID tidak valid.");

    return await FileService.deleteFile(fileId);
  }

  static async searchFiles({ query }: any) {
      return await FileService.searchFiles(query.q);
    }

}

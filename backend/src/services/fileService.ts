import { FileRepository } from "../repositories/fileRepository";

export class FileService {
  static async getFilesByFolder(folderId: number) {
    return await FileRepository.getFilesByFolder(folderId);
  }

  static async moveFile(fileId: number, newFolderId: number) {
    return await FileRepository.moveFile(fileId, newFolderId);
  }

  static async getFileUrl(fileId: number) {
    const file = await FileRepository.getFileById(fileId);
    return file;
  }

  static async uploadFile( file: File, url: string, folderId: number): Promise<string> {
    if (!file) throw new Error("File tidak ditemukan.");
    if (!folderId) throw new Error("Folder ID harus diberikan.");

    return await FileRepository.createFile(folderId, url, file);
  }

  static async deleteFile(id: number) {
    try {
      return await FileRepository.deleteFile(id);
    } catch (error) {
      throw new Error("Gagal menghapus file, pastikan file ada.");
    }
  }

   static async searchFiles(keyword: string) {
      return await FileRepository.searchFiles(keyword);
    }

}

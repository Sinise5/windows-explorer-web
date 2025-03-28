
import { FolderRepository } from "../repositories/folderRepository";



export class FolderService {
  static async fetchAllFolders() {
    return FolderRepository.getAllFolders();
  }

  static async fetchFolderById(id: string) {
    return FolderRepository.getFolderById(id);
  }

  static async addFolder(name: string, parentId?: string) {
    return FolderRepository.createFolder(name, parentId);
  }
  
  static async getSubfolders(parentId: number) {
    return await FolderRepository.getSubfolders(parentId);
  }

  static async searchFolders(keyword: string) {
    return await FolderRepository.searchFolders(keyword);
  }

  static async deleteFolder(id: number) {
    try {
      return await FolderRepository.deleteFolder(id);
    } catch (error) {
      throw new Error("Gagal menghapus folder, pastikan folder ada.");
    }
  }
  static async getFolders(page: number = 1, perPage: number = 10) {
    return await FolderRepository.getFolders(page, perPage);
  }
}

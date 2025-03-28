import { FolderService } from "../../services/folderService";

export class FolderControllerV1 {
  static async getAllFolders() {
    return FolderService.fetchAllFolders();
  }

  static async getFolderById({ params }: { params: { id: string } }) {
    return FolderService.fetchFolderById(params.id);
  }

  static async createFolder({ body }: { body: { name: string; parentId?: string } }) {
    return FolderService.addFolder(body.name, body.parentId);
  }

  static async getSubfolders({ params }: any) {
    return await FolderService.getSubfolders(Number(params.id));
  }

  static async searchFolders({ query }: any) {
    return await FolderService.searchFolders(query.q);
  }

  static async deleteFolder({ params }: any) {
    const folderId = parseInt(params.id);
    if (isNaN(folderId)) throw new Error("ID tidak valid.");

    return await FolderService.deleteFolder(folderId);
  }

  static async getFolders(req: any) {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    return await FolderService.getFolders(page, perPage);
  }
}

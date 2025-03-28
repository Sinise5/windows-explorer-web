import prisma from "../config/database";


export class FolderRepository {

  static async getAllFolders() {
    return prisma.folder.findMany({
      where: { parentId: null },
      include: { children: true },
    });
  }

  static async getFolders(page: number = 1, perPage: number = 10) {
    return prisma.folder.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        files: true,
        children: true,
      },
    });
  }

  static async getFolderById(id: string) {
    return prisma.folder.findUnique({
      where: { id: id ? parseInt(id, 10) : undefined },
      include: {files: true, children: true },
    });
  }

  static async createFolder(name: string, parentId?: string) {
    return prisma.folder.create({
      data: { name, parentId: parentId ? parseInt(parentId, 10) : undefined },
    });
  }

  static async searchFolders(keyword: string) {
    return await prisma.folder.findMany({
      where: {
        name: { contains: keyword, mode: "insensitive" },
      },
    });
  }

  static async getSubfolders(parentId: number) {
    return await prisma.folder.findMany({
      where: { parentId },
    });
  }

  static async deleteFolder(id: number) {
    return prisma.folder.delete({
      where: { id },
    });
  }


}

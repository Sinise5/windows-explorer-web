import prisma from "../config/database";
import { writeFile } from "fs/promises";
import { join, resolve } from "path";

export class FileRepository {

  private static readonly uploadPath = resolve(__dirname, "../../../frontend/uploads/");


  static async getFilesByFolder(folderId: number) {
    return await prisma.file.findMany({
      where: { folderId },
    });
  }

  static async getFiles(folderId: number, page: number = 1, perPage: number = 10) {
    return prisma.file.findMany({
      where: { folderId },
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  static async moveFile(fileId: number, newFolderId: number) {
    return await prisma.file.update({
      where: { id: fileId },
      data: { folderId: newFolderId },
    });
  }

  static async searchFiles(keyword: string) {
    return await prisma.file.findMany({
      where: {
        name: { contains: keyword, mode: "insensitive" },
      },
    });
  }

  static async getFileById(fileId: number) {
    return await prisma.file.findUnique({
      where: { id: fileId },
    });
  }

  static async createFile(folderId: number, url: string, file: File): Promise<string> {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = join(this.uploadPath, fileName); 
      const buffer = await file.arrayBuffer();

      await writeFile(filePath, Buffer.from(buffer));

      console.log(`📂 File disimpan: ${filePath}, URL: ${url}`);
      const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

    // Buat URL file yang dapat diakses berdasarkan server
    const fileUrl = `${BASE_URL}/uploads/${fileName}`;

      const savedFile = await prisma.file.create({
        data: {
          name: file.name,
          url: fileUrl,
          folderId,
        },
      });

      return savedFile.url ?? ''; 
    } catch (error) {
      console.error("❌ Error saat menyimpan file:", error);
      throw new Error("Gagal menyimpan file.");
    }
  }

  static async deleteFile(id: number) {
    return prisma.file.delete({
      where: { id },
    });
  }
  
}
import { describe, expect, it, vi, beforeEach } from "vitest";
import prisma from "../../../src/config/database";
import { FolderRepository } from "../../../src/repositories/folderRepository";

vi.spyOn(prisma.folder, "findMany");
vi.spyOn(prisma.folder, "findUnique");
vi.spyOn(prisma.folder, "create");
vi.spyOn(prisma.folder, "delete");

describe("FolderRepository", () => {

  beforeEach(() => {
    vi.clearAllMocks(); // Bersihkan mock sebelum setiap test
  });

  it("should return all folders", async () => {
    prisma.folder.findMany.mockResolvedValue([
      { id: 1, name: "Root Folder", parentId: null, children: [] },
    ]);
  
    const folders = await FolderRepository.getAllFolders();
  
    expect(prisma.folder.findMany).toHaveBeenCalledWith({
      where: { parentId: null },
      include: { children: true },
    });
  
    expect(folders).toEqual([
      { id: 1, name: "Root Folder", parentId: null, children: [] },
    ]);
  });
  

  it("should return a folder by ID", async () => {
    prisma.folder.findUnique.mockResolvedValue({
      id: 1,
      name: "Test Folder",
      files: [],
      children: [],
    });
  
    const folder = await FolderRepository.getFolderById("1");
  
    expect(prisma.folder.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { files: true, children: true },
    });
  
    expect(folder).toEqual({
      id: 1,
      name: "Test Folder",
      files: [],
      children: [],
    });
  });
  

  it("should create a new folder", async () => {
    prisma.folder.create.mockResolvedValue({
      id: 2,
      name: "New Folder",
      parentId: null, // Pastikan struktur data sesuai dengan return asli dari Prisma
    });
  
    const newFolder = await FolderRepository.createFolder("New Folder");
  
    expect(prisma.folder.create).toHaveBeenCalledWith({
      data: { name: "New Folder", parentId: undefined }, // Sesuai dengan fungsi aslinya
    });
  
    expect(newFolder).toEqual({ id: 2, name: "New Folder", parentId: null });
  });
  
  it("should delete a folder", async () => {
    prisma.folder.delete.mockResolvedValue({ id: 1, name: "Deleted Folder" });
  
    const deletedFolder = await FolderRepository.deleteFolder(1);
  
    expect(prisma.folder.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  
    expect(deletedFolder).toEqual({ id: 1, name: "Deleted Folder" });
  });
  
});

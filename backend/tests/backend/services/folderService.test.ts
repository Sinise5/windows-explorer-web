import { describe, expect, it, vi, beforeEach } from "vitest";
import { FolderService } from "../../../src/services/folderService";
import { FolderRepository } from "../../../src/repositories/folderRepository";

vi.spyOn(FolderRepository, "getAllFolders");
vi.spyOn(FolderRepository, "getFolderById");
vi.spyOn(FolderRepository, "createFolder");
vi.spyOn(FolderRepository, "deleteFolder");

describe("FolderService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch all folders", async () => {
    FolderRepository.getAllFolders.mockResolvedValue([{ id: 1, name: "Root Folder" }]);

    const folders = await FolderService.fetchAllFolders();
    expect(folders).toEqual([{ id: 1, name: "Root Folder" }]);
    expect(FolderRepository.getAllFolders).toHaveBeenCalled();
  });

  it("should add a new folder", async () => {
    FolderRepository.createFolder.mockResolvedValue({ id: 2, name: "New Folder" });

    const newFolder = await FolderService.addFolder("New Folder");
    expect(newFolder).toEqual({ id: 2, name: "New Folder" });
    expect(FolderRepository.createFolder).toHaveBeenCalled();
  });

  it("should throw an error if folder deletion fails", async () => {
    FolderRepository.deleteFolder.mockRejectedValue(new Error("Gagal menghapus folder"));

    await expect(FolderService.deleteFolder(99)).rejects.toThrow("Gagal menghapus folder");
  });
});

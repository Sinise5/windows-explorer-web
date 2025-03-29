import { FolderService } from "../services/folderService";

export class FolderController {
  static async getAllFolders(req: Request) {
    try {
      const folders = await FolderService.fetchAllFolders();
      return new Response(JSON.stringify(folders), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
    
  }

  static async getFolderById(req: Request) {
    try {
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();
      if (!id) throw new Error("ID tidak ditemukan.");

      const folder = await FolderService.fetchFolderById(id);
      return new Response(JSON.stringify(folder), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
    
    
  }

  static async createFolder({ body }: { body: unknown }) {
    try {
      const data = body as { name: string; parentId?: string };
  
      if (!data.name) throw new Error("Nama folder wajib diisi.");
  
      const newFolder = await FolderService.addFolder(data.name, data.parentId);
  
      return new Response(JSON.stringify(newFolder), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
  
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  

  static async getSubfolders(req: Request) {
    try {
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();
      if (!id || isNaN(Number(id))) throw new Error("ID tidak valid.");

      const subfolders = await FolderService.getSubfolders(Number(id));
      return new Response(JSON.stringify(subfolders), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
    
  }

  static async searchFolders(req: Request) {
    try {
      const url = new URL(req.url);
      const query = url.searchParams.get("q");
      if (!query) throw new Error("Query pencarian diperlukan.");

      const results = await FolderService.searchFolders(query);
      return new Response(JSON.stringify(results), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
    
  }

  static async deleteFolder(req: Request) {
    try {
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();
      if (!id || isNaN(Number(id))) throw new Error("ID tidak valid.");

      await FolderService.deleteFolder(Number(id));
      return new Response(JSON.stringify({ message: "Folder berhasil dihapus." }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
    
  }

  static async getFolders(req: Request) {
    try {
      const url = new URL(req.url);
      const page = parseInt(url.searchParams.get("page") || "1");
      const perPage = parseInt(url.searchParams.get("perPage") || "10");

      const folders = await FolderService.getFolders(page, perPage);
      return new Response(JSON.stringify(folders), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
    
  }
}

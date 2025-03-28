import axios from "axios";

const API_URL = "http://localhost:3000";

export const folderApi = {
  getRootFolders: async () => {
    const res = await axios.get(`${API_URL}/folders`, {
      headers: { "Cache-Control": "no-cache" } 
    });
    return res.data;
  },

  getSubfolders: async (id: number) => {
    if (!id) throw new Error("Folder ID tidak boleh kosong"); 
    const res = await axios.get(`${API_URL}/folders/${id}`, {
      headers: { "Cache-Control": "no-cache" }
    });
    return res.data;
  },

  createFolder: async (name: string, parentId?: number) => {
    const payload: any = { name };
    if (parentId !== undefined && parentId !== null) {
      payload.parentId = parentId;
    }
  
    const res = await axios.post(`${API_URL}/folders`, payload);
    return res.data;
  },
  deleteFolder: async (folderId: number) => {
    const res = await axios.delete(`${API_URL}/folders/${folderId}`);
    return res.data;
  },
  loadFolders: async (page: number = 1, perPage: number = 5) => {
    try {
      const response = await axios.get(`${API_URL}/folders`, {
        params: { page, perPage },
        headers: { "Cache-Control": "no-cache" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error;
    }
  },
  searchFolders: async (query) => {
    const res = await axios.delete(`${API_URL}/foldersPage/search?q=${query}`);
    return res.data;
  },
  
  
};

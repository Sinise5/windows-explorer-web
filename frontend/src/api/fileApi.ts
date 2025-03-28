import axios from "axios";

const API_URL = "http://localhost:3000";

export const fileApi = {
  getFilesByFolder: async (folderId: number) => {
    const res = await axios.get(`${API_URL}/files/${folderId}`);
    return res.data;
  },
  createFile: async (name: string, folderId: number) => {
    const res = await axios.post(`${API_URL}/files/`, { name, folderId });
    return res.data;
  },
  deleteFile: async (fileId: number) => {
    const res = await axios.delete(`${API_URL}/files/${fileId}`);
    return res.data;
  },
  moveFile: async (fileId: number, newFolderId: number) => {
    await axios.put(`${API_URL}/files/${fileId}/move`, { newFolderId: newFolderId });
  },
  uploadFile: async (file: File, folderId: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", folderId);
    formData.append("url", 'ssss');
    try {
    const res = await axios.post(`${API_URL}/files/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },});
    return res.data;
    } catch (error) {
      console.error("Upload Error:", error);
      throw new Error(error.response?.data?.message || "Upload gagal.");
    }
  }

};

import axios from "axios";

export const uploadService = {
  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    // We go to our Next.js API route, which does the secure GCP upload
    const response = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.url;
  },
};

import axios from "axios";

export const uploadService = {
  async uploadFile(file: File, onProgress?: (pct: number) => void): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });

    return response.data.url;
  },
};

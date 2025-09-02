import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_AZURE_LICENSE_BLOCK_FUNCTION_URL,
  method: "POST",
  params: {
    code: import.meta.env.VITE_AZURE_LICENSE_BLOCK_FUNCTION_API_CODE,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchLicenseBlocks = async (newOriginURL) => {
  try {
    const response = await api.post("", { originURL: newOriginURL });
    if (response.data) {
      return response.data;
    }
    throw new Error("Failed to fetch license blocks");
  } catch (error) {
    console.error("Error fetching license blocks:", error);
    throw error;
  }
};

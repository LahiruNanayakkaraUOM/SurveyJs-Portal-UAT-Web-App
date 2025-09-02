import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_AZURE_SURVEYINFO_FUNCTION_URL,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    code: import.meta.env.VITE_AZURE_SURVEYINFO_FUNCTION_API_CODE,
  },
});

export const fetchSurveyInfo = async (newOrigin) => {
  try {
    const response = await api.post("", { newOrigin });
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch survey info");
    }
  } catch (error) {
    console.error("Error fetching survey info:", error);
    throw error;
  }
};

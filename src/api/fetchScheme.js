import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_AZURE_SURVEYJSON_FUNCTION_URL,
  method: "GET",
  params: {
    code: import.meta.env.VITE_AZURE_SURVEYJSON_FUNCTION_API_CODE,
  },
});

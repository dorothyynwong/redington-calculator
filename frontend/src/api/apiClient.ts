import axios, { AxiosInstance } from "axios";

export const client: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
    timeout: Number(import.meta.env.VITE_APP_BACKEND_TIMEOUT),
});
import axios from "axios";
import { getCredentialsFromCookie } from "@/service/auth-service";

const IS_DEV = process.env.NODE_ENV === "development";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API ?? "http://localhost:4000",
});
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const credentials = await getCredentialsFromCookie();
            if (credentials && credentials.idToken) {
                config.headers.Authorization = `Bearer ${IS_DEV ? "test-access-token" : credentials.idToken}`;
            }
        } catch (error) {
            console.error("Failed to fetch credentials:", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

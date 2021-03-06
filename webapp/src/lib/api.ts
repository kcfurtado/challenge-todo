import { LOCALSTORAGE } from "./auth";

interface ApiFetchResponse<T> {
    data: T | null;
    error: string[] | null;
    status: "SUCCESS" | "ERROR" | "UNAUTHORIZED" | "NOT_FOUND";
}

interface ApiFetchProps {
    method: "GET" | "DELETE" | "POST" | "PUT";
    url: string;
    data?: any;
    token?: string;
}
const API_URL = 'http://localhost:5000/'

export const fetchJson = async <T>({
    url,
    method,
    data,
    token,
}: ApiFetchProps): Promise<ApiFetchResponse<T>> => {

    try {
        const storeData = localStorage.getItem(LOCALSTORAGE)
        const userData = JSON.parse(storeData as string)
    
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData?.token}`,
        };
        /*
            const response = await API.request<T>({
                url,
                method,
                headers,
                data,
            });
        */

        const response = await fetch(`${API_URL}${url}`, { body: JSON.stringify(data), headers, method })

        if (response.status >= 500) {
            return {
                data: null,
                error: ["Server error"],
                status: "ERROR",
            };
        }

        if (response.status === 401 || response.status === 403) {
            return {
                data: null,
                error: ["User Unauthorized"],
                status: "UNAUTHORIZED",
            };
        }

        if (response.status === 404) {
            return {
                data: null,
                error: ["Not found"],
                status: "NOT_FOUND",
            };
        }

        if (response.status >= 200 && response.status < 300) {

            const data = (await response.json()) as T

            return {
                data,
                error: null,
                status: "SUCCESS",
            };
        }

        return {
            data: null,
            error: ["Unknown error"],
            status: "ERROR",
        };
    } catch (error: any) {
        if (error.code === "ECONNABORTED") {
            return {
                data: null,
                error: ["Connection error"],
                status: "ERROR",
            };
        }

        return {
            data: null,
            error: ["Server request error!"],
            status: "ERROR",
        };
    }
};

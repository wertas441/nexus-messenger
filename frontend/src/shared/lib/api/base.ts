import axios from "axios";
import {BackendApiResponse} from "@/shared/types";

export const showErrorMessage:boolean = true;

export const clientApi = axios.create({
    baseURL: '/api',
    withCredentials: true,
    timeout: 9000,
});

export const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3002/api',
    withCredentials: true,
    timeout: 9000,
});

export function getServerErrorMessage(err: unknown){
    let message:string = 'Не удалось связаться с сервером. Пожалуйста, проверьте ваше интернет-соединение или попробуйте позже.';

    if (axios.isAxiosError<BackendApiResponse>(err)) {
        const respData = err.response?.data;
        message = respData?.error || respData?.message || message;
    }

    return message;
}
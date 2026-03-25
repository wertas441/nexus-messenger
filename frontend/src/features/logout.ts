import {clientApi, getServerErrorMessage} from "@/shared/lib/api/base";
import {BackendApiResponse} from "@/shared/types";

export default async function logout(): Promise<void> {
    try {
        const { data } = await clientApi.post<BackendApiResponse>(`/auth/logout`);

        if (!data.success) return;

        return;
    } catch (err) {
        console.error(getServerErrorMessage(err) || "Ошибка выхода");

        return;
    }
}
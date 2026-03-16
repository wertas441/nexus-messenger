import type { Metadata } from 'next';
import Login from "@/app/auth/login/Login";

export const metadata: Metadata = {
    title: "Авторизация | Nexus",
}

export default function LoginPage() {

    return <Login />
}
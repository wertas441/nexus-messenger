import type { Metadata } from 'next';
import Registration from "@/app/auth/registration/Registration";

export const metadata: Metadata = {
    title: 'Регистрация | Nexus'
}

export default function RegistrationPage() {

    return <Registration />
}
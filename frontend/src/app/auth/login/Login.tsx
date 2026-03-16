'use client'

import {useForm} from "react-hook-form";
import IndigoSubmitBtn from "@/shared/UI/buttons/indigoBtn/IndigoSubmitBtn";

interface LoginForm {
    login: string;
    password: string;
    rememberMe: boolean;
}

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

    const onSubmit = (data: LoginForm) => {

    }

    return (
        <main className="min-h-screen">
            <section className="flex items-center justify-center bg-[#0f172a]">
                <h1>Авторизация в Nuxt</h1>

                <form onSubmit={handleSubmit(onSubmit)}>



                    <IndigoSubmitBtn />
                </form>
            </section>
        </main>
    )
}
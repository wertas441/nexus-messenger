'use client'

import {useForm} from "react-hook-form";
import MainInput from "@/shared/UI/inputs/MainInput";
import {validateUserEmail, validateUserLogin, validateUserPassword} from "@/entities/User/validation";
import Link from "next/link";
import IndigoBtn from "@/shared/UI/buttons/IndigoBtn";
import usePageUtils from "@/shared/lib/hooks/usePageUtils";
import {getServerErrorMessage, serverApi, showErrorMessage} from "@/shared/lib/api/base";
import ServerError from "@/shared/UI/errors/ServerError";

interface LoginForm {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface LoginResponse {
    user: {
        id: number;
        publicId: string;
        userName: string;
        email: string;
        createdAt: string;
    };
}

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (data: LoginForm) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
        }

        try {
            await serverApi.post<LoginResponse>('/auth/login', payload);

            router.replace("/");
        } catch (err) {
            const message:string = getServerErrorMessage(err);

            setServerError(message);
            if (showErrorMessage) console.error('Login error:', err);

            setIsSubmitting(false);
        }
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8">
            <section className="relative z-10 w-full max-w-md rounded-2xl p-6 ">
                <div className="mb-6 text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-100">Nexus Messenger</h1>
                    <p className="text-sm text-slate-400">Авторизируйтесь, чтобы продолжить работу</p>
                </div>

                <ServerError message={serverError} />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <MainInput
                        id={'email'}
                        placeholder={`Введите вашу почту...`}
                        type={`email`}
                        error={errors.email?.message}
                        {...register('email', {validate: (value) => validateUserEmail(value) || true})}
                    />

                    <MainInput
                        id={'password'}
                        type="password"
                        placeholder={`Введите ваш пароль...`}
                        error={errors.password?.message}
                        {...register('password', {validate: (value) => validateUserPassword(value) || true})}
                    />

                    <div className="flex items-center justify-between gap-3">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="h-4 w-4 cursor-pointer rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/50"
                                {...register('rememberMe')}
                            />
                            <span className="block cursor-pointer text-xs text-slate-400 sm:text-sm">
                                Запомнить меня
                            </span>
                        </label>

                        <div className="text-sm">
                            <Link
                                href="/auth/forgot-password"
                                className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300 sm:text-sm"
                            >
                                Забыли пароль?
                            </Link>
                        </div>
                    </div>

                    <IndigoBtn
                        type={`submit`}
                        label={!isSubmitting ? `Войти` : 'Процесс...'}
                        disabled={isSubmitting}
                        className="mt-5"
                    />
                </form>

                <div className="mt-5 text-center text-sm text-slate-400 ">
                    Нет аккаунта?{" "}
                    <Link href="/auth/registration" className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300 sm:text-sm">
                        Зарегистрироваться
                    </Link>
                </div>
            </section>
        </main>
    )
}
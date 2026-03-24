'use client'

import ServerError from "@/shared/UI/errors/ServerError";
import MainInput from "@/shared/UI/inputs/MainInput";
import {
    validateUserConfirmPassword,
    validateUserEmail,
    validateUserLogin,
    validateUserPassword
} from "@/entities/User/validation";
import Link from "next/link";
import IndigoBtn from "@/shared/UI/buttons/IndigoBtn";
import {useForm} from "react-hook-form";
import usePageUtils from "@/shared/lib/hooks/usePageUtils";
import {clientApi, getServerErrorMessage, showErrorMessage} from "@/shared/lib/api/base";
import {BackendApiResponse} from "@/shared/types";

interface RegistrationForm {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Registration() {

    const { register, handleSubmit, getValues, formState: { errors } } = useForm<RegistrationForm>()

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (data: RegistrationForm) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            userName: data.userName,
            email: data.email,
            password: data.password,
        }

        try {
            await clientApi.post<BackendApiResponse>('/auth/registration', payload)

            router.push("/auth/login");
        } catch (err) {
            const message:string = getServerErrorMessage(err);

            setServerError(message);
            if (showErrorMessage) console.error('Registration error:', err);

            setIsSubmitting(false);
        }
    }
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8">
            <section className="relative z-10 w-full max-w-md rounded-2xl p-6 ">
                <div className="mb-6 text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-100">Nexus Messenger</h1>
                    <p className="text-sm text-slate-400">Создание нового аккаунта</p>
                </div>

                <ServerError message={serverError} />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <MainInput
                        id={'login'}
                        placeholder={`Придумайте имя пользователя...`}
                        error={errors.userName?.message}
                        {...register('userName', {validate: (value) => validateUserLogin(value) || true})}
                    />

                    <MainInput
                        id={'email'}
                        type="email"
                        placeholder={`Введите вашу почту...`}
                        error={errors.email?.message}
                        {...register('email', {validate: (value) => validateUserEmail(value) || true})}
                    />

                    <MainInput
                        id={'password'}
                        type="password"
                        placeholder={`Придумайте пароль...`}
                        error={errors.password?.message}
                        {...register('password', {validate: (value) => validateUserPassword(value) || true})}
                    />

                    <MainInput
                        id={'confirmPassword'}
                        type="password"
                        placeholder={`Подтвердите ваш пароль...`}
                        error={errors.confirmPassword?.message}
                        {...register('confirmPassword', {validate: (value) => validateUserConfirmPassword(getValues('password'), value) || true})}
                    />

                    <IndigoBtn
                        type={`submit`}
                        label={!isSubmitting ? `Зарегистрироваться` : 'Процесс...'}
                        disabled={isSubmitting}
                        className="mt-1"
                    />
                </form>

                <div className="mt-5 text-center text-sm text-slate-400 ">
                    Уже есть аккаунт?{" "}
                    <Link href="/auth/login" className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300 sm:text-sm">
                        Авторизироваться
                    </Link>
                </div>
            </section>
        </main>
    )
}
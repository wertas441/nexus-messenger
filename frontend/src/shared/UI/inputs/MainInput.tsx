import InputError from "@/shared/UI/errors/InputError";
import {InputHTMLAttributes, ReactNode} from "react";

interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    icon?: ReactNode;
    label?: string;
    error?: string;
    className?: string;
}

export default function MainInput(
    {
        label,
        id,
        type = 'text',
        icon,
        required = false,
        placeholder,
        error,
        className = '',
        ...rest
    }: MainInputProps) {

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="mb-2 block text-sm font-medium text-slate-200"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                        {icon}
                    </div>
                )}

                <input
                    id={id}
                    name={id}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    className={`h-11 w-full rounded-xl border bg-slate-900/70 text-sm text-slate-100 placeholder:text-slate-500 
                    transition focus:outline-none focus:ring-2 hover:border-slate-500 ease-in-out duration-200 ${
                        error
                            ? 'border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/30'
                            : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
                    } ${icon ? 'pl-10 pr-4' : 'px-4'} ${className}`}
                    {...rest}
                />
            </div>

            <InputError error={error} />
        </div>
    )
}
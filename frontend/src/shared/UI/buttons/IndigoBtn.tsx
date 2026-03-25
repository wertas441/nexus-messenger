import {memo} from "react";

interface IProps {
    label: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

function IndigoBtn(
    {
        label,
        onClick,
        type=`button`,
        disabled = false,
        className = '',
    }: IProps) {

    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex h-11 w-full items-center justify-center rounded-xl bg-indigo-600 px-4 
            text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 
            focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:bg-indigo-700/50 disabled:text-slate-300 
            cursor-pointer ${className}`}
            disabled={disabled}
        >
            {label}
        </button>
    )
}

export default memo(IndigoBtn);
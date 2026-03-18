import {ElementType, memo} from "react";

interface IProps {
    label: string;
    IconComponent: ElementType;
    isActive: boolean;
    onClick: () => void;
}

function MenuSideBarIcon({label, IconComponent, isActive, onClick} : IProps) {

    const getItemClasses = (isActive: boolean) =>
        `group relative inline-flex h-12 w-12 items-center justify-center rounded-xl transition cursor-pointer
        hover:border-slate-500 hover:bg-slate-800/90 hover:text-indigo-300 ${isActive ? 'text-indigo-600' : 'text-slate-300'}`;

    return (
        <button
            onClick={onClick}
            aria-label={label}
            className={getItemClasses(isActive)}
        >
            <IconComponent size={20} strokeWidth={2.1}/>

            <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-50 -translate-y-1/2
                    whitespace-nowrap rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs
                    text-slate-100 opacity-0 shadow-lg transition group-hover:opacity-100">
                {label}
            </span>
        </button>
    )
}

export default memo(MenuSideBarIcon);
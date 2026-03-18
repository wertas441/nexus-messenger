import {ElementType, memo} from "react";

interface IProps {
    IconComponent: ElementType;
    onClick: () => void;
    isActive: boolean;
    label: string;
}

function MobileSideBarRow({IconComponent, onClick, isActive, label} : IProps) {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                isActive
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "text-slate-200 hover:bg-slate-800/70"
            }`}
        >
            <IconComponent size={20}/>

            <span className="text-sm font-medium">{label}</span>
        </button>
    )
}

export default memo(MobileSideBarRow);
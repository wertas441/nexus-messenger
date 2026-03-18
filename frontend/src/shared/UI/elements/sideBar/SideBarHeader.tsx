'use client'

import {Menu} from "lucide-react";
import {useAppDispatch} from "@/shared/store/hooks";
import {toggleMobileMenu} from "@/shared/store/slices/sideBarContextSlice";

export default function SideBarHeader({label}:{label: string}) {

    const dispatch = useAppDispatch();

    return (
        <div className={`flex justify-between items-center border-b border-slate-800 px-3`}>
            <h2 className="mb-3 text-xl font-semibold text-slate-100">
                {label}
            </h2>

            <button
                type="button"
                aria-label="Открыть меню разделов"
                onClick={() => dispatch(toggleMobileMenu())}
                className="flex h-10 w-10 pb-3 items-center justify-center rounded-lg text-slate-200 transition md:hidden"
            >
                <Menu size={30} />
            </button>
        </div>
    );
}

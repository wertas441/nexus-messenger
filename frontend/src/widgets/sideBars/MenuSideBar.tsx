'use client'

import {
    LogOut,
} from 'lucide-react';
import MenuSideBarIcon from "@/shared/UI/elements/sideBar/MenuSideBarIcon";
import {useAppDispatch, useAppSelector} from "@/shared/store/hooks";
import {setActiveSideBarContext} from "@/shared/store/slices/sideBarContextSlice";
import {sideBarMenuItems} from "@/shared/config/sideBarMenuItems";

export default function MenuSideBar() {

    const dispatch = useAppDispatch();
    const activeContext = useAppSelector((state) => state.sideBarContext.activeContext);

    return (
        <aside className="sticky hidden bg-[#0f172a] top-0 md:flex h-screen w-20 shrink-0 flex-col justify-between border-r border-slate-800 ">

            <div className=" flex items-center justify-center  ">
                <h1 className={`text-4xl py-3 font-bold text-slate-100`}>
                    N
                </h1>
            </div>

            <nav className="flex flex-col items-center gap-3 py-6">
                {sideBarMenuItems.map((item) => (
                    <MenuSideBarIcon
                        key={item.id}
                        label={item.label}
                        IconComponent={item.icon}
                        isActive={activeContext === item.context}
                        onClick={() => dispatch(setActiveSideBarContext(item.context))}
                    />
                ))}
            </nav>

            <button
                type="button"
                aria-label="Выйти из аккаунта"
                className="group cursor-pointer pb-5 relative mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl text-slate-300
                transition hover:border-rose-500/70 hover:bg-rose-500/10 hover:text-rose-300"
            >
                <LogOut size={20} strokeWidth={2.1}/>

                <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-10 -translate-y-1/2
                whitespace-nowrap rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100
                opacity-0 shadow-lg transition group-hover:opacity-100"
                >
                    Выйти
                </span>
            </button>
        </aside>
    )
}
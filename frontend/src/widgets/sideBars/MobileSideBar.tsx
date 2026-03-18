'use client'

import {LogOut, X} from "lucide-react";
import {sideBarMenuItems} from "@/shared/config/sideBarMenuItems";
import {useAppDispatch, useAppSelector} from "@/shared/store/hooks";
import {setActiveSideBarContext, toggleMobileMenu} from "@/shared/store/slices/sideBarContextSlice";
import MobileSideBarRow from "@/shared/UI/elements/sideBar/MobileSIdeBarRow";

export default function MobileSideBar() {

    const dispatch = useAppDispatch();
    const { activeContext, isMobileMenuOpen } = useAppSelector((state) => state.sideBarContext);

    if (!isMobileMenuOpen) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden">
            <button
                aria-label="Закрыть меню"
                className="absolute inset-0 bg-slate-950/80"
                onClick={() => dispatch(toggleMobileMenu())}
            />

            <aside className="absolute inset-0 flex flex-col bg-[#0f172a] py-2">
                <div className="mb-6 flex items-center justify-between border-b border-slate-800 px-4 pb-3">
                    <h2 className="text-3xl font-semibold text-slate-100">Nexus</h2>

                    <button
                        type="button"
                        aria-label="Закрыть меню разделов"
                        onClick={() => dispatch(toggleMobileMenu())}
                        className="inline-flex mt-1  items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800/80 hover:text-white"
                    >
                        <X size={30}/>
                    </button>
                </div>


                <nav className="flex flex-1 flex-col gap-2 px-4 overflow-y-auto">
                    {sideBarMenuItems.map((item) => (
                        <MobileSideBarRow
                            key={item.id}
                            IconComponent={item.icon}
                            onClick={() => dispatch(setActiveSideBarContext(item.context))}
                            isActive={activeContext === item.context}
                            label={item.label}
                        />
                    ))}
                </nav>

                <button
                    type="button"
                    className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-rose-300 transition hover:bg-rose-500/10"
                >
                    <LogOut size={20}/>
                    <span className="text-sm font-medium">Выйти</span>
                </button>
            </aside>
        </div>
    );
}

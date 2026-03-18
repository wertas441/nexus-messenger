'use client'

import SideBarHeader from "@/shared/UI/elements/sideBar/SideBarHeader";

export default function SettingsSideBar() {

    return (
        <aside className="sticky top-0 z-10 flex h-screen w-full shrink-0 flex-col space-y-3 border-r border-slate-800 bg-[#0f172a] py-4 backdrop-blur-sm md:w-140" >
            <SideBarHeader label={`Настройки`} />

        </aside>
    )
}
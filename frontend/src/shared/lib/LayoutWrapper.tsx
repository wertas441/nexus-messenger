'use client'

import {ReactNode} from "react";
import MenuSideBar from "@/widgets/sideBars/MenuSideBar";
import {usePathname} from "next/navigation";
import MessagesSideBar from "@/widgets/sideBars/MessagesSideBar";
import {useAppSelector} from "@/shared/store/hooks";
import {SideBarContext} from "@/shared/store/slices/sideBarContextSlice";
import ContactsSideBar from "@/widgets/sideBars/ContactsSideBar";
import SettingsSideBar from "@/widgets/sideBars/SettingsSideBar";
import ArchiveSideBar from "@/widgets/sideBars/ArchiveSideBar";
import SavedSideBar from "@/widgets/sideBars/SavedSideBar";
import MobileSideBar from "@/widgets/sideBars/MobileSideBar";

function renderContext(activeContext: SideBarContext) {
    const context = {
        messages: <MessagesSideBar/>,
        savedMessages: <SavedSideBar/>,
        archiveChats: <ArchiveSideBar/>,
        contacts: <ContactsSideBar/>,
        settings: <SettingsSideBar/>,
    }

    return context[activeContext];
}

export default function LayoutWrapper({children}: {children: ReactNode}) {

    const pathname = usePathname();
    const isAuthPages = pathname.startsWith("/auth");

    const activeContext = useAppSelector((state) => state.sideBarContext.activeContext);

    return (
        <div className={`flex w-full`}>

            {!isAuthPages && (
                <>
                    <MenuSideBar />
                    {renderContext(activeContext)}
                    <MobileSideBar/>
                </>
            )}

            <div className="min-w-0 flex-1">{children}</div>
        </div>
    )
}
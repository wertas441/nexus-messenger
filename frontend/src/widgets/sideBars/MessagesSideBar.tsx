'use client'

import {useMemo, useState} from "react";
import MessageSideBarRow from "@/shared/UI/elements/sideBar/MessageSideBarRow";
import SideBarHeader from "@/shared/UI/elements/sideBar/SideBarHeader";
import SideBarSearch from "@/shared/UI/elements/sideBar/SideBarSearch";

interface ChatPreview {
    id: number;
    userName: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    isOnline: boolean;
}

const mockChats: ChatPreview[] = [
    {
        id: 1,
        userName: "Алексей Смирнов",
        lastMessage: "Скинь, пожалуйста, последние правки по интерфейсу",
        time: "12:47",
        unreadCount: 3,
        isOnline: true,
    },
    {
        id: 2,
        userName: "Марина QA",
        lastMessage: "Проверила форму логина, все ок",
        time: "11:12",
        unreadCount: 0,
        isOnline: false,
    },
    {
        id: 3,
        userName: "Nexus Team",
        lastMessage: "Созвон в 16:30, не опаздываем",
        time: "09:05",
        unreadCount: 8,
        isOnline: false,
    },
    {
        id: 4,
        userName: "Игорь Петров",
        lastMessage: "Ок, принимаю задачу на бэкенд",
        time: "Вчера",
        unreadCount: 1,
        isOnline: true,
    },
    {
        id: 5,
        userName: "Дизайн отдел",
        lastMessage: "Новый набор иконок уже в Figma",
        time: "Пн",
        unreadCount: 0,
        isOnline: false,
    },
];

export default function MessagesSideBar() {

    const [searchValue, setSearchValue] = useState('');
    const [activeChatId, setActiveChatId] = useState<number>(mockChats[0].id);

    const filteredChats = useMemo(() => {
        const normalized = searchValue.trim().toLowerCase();

        if (!normalized) return mockChats;

        return mockChats.filter((chat) => chat.userName.toLowerCase().includes(normalized));
    }, [searchValue]);

    return (
        <aside className="sticky top-0 z-10 flex h-screen w-full shrink-0 flex-col space-y-3 border-r border-slate-800 bg-[#0f172a] py-4 backdrop-blur-sm md:w-140">

            <SideBarHeader label={`Сообщения`} />

            <SideBarSearch searchValue={searchValue} setSearchValue={setSearchValue} />

            <div className="scrollbar-thin px-3 flex-1 space-y-1 overflow-y-auto pr-1">
                {!(filteredChats.length === 0) ? (
                    filteredChats.map((chat) => (
                        <MessageSideBarRow
                            key={chat.id}
                            userName={chat.userName}
                            isOnline={chat.isOnline}
                            onClick={() => setActiveChatId(chat.id)}
                            isActive={activeChatId === chat.id}
                            time={chat.time}
                            lastMessage={chat.lastMessage}
                            unreadCount={chat.unreadCount}
                        />
                    ))
                ) : (
                    <div className="rounded-xl border text-center border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-400">
                        По вашему запросу ничего не найдено
                    </div>
                )}
            </div>
        </aside>
    )
}

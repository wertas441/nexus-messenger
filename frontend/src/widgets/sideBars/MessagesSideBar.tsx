'use client'

import {Search} from "lucide-react";
import {useMemo, useState} from "react";
import MessageSideBarRow from "@/shared/UI/elements/MessageSideBarRow";

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
        <aside className="sticky space-y-3 top-0 z-10 flex h-screen w-140 shrink-0 flex-col border-r border-slate-800 bg-[#0f172a] py-4 backdrop-blur-sm">

            <div className={`border-b border-slate-800`}>
                <h2 className="mb-3 px-3 text-xl font-semibold text-slate-100">Сообщения</h2>
            </div>

            <div className="mb-3 px-3 pb-3">

                <label className="relative block">
                    <Search
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Найти..."
                        className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900/70 pl-10 pr-3 text-sm text-slate-100 placeholder:text-slate-500 transition hover:border-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                </label>
            </div>

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

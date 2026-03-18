'use client'

import {Search} from "lucide-react";
import {useMemo, useState} from "react";

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

        if (!normalized) {
            return mockChats;
        }

        return mockChats.filter((chat) =>
            chat.userName.toLowerCase().includes(normalized) ||
            chat.lastMessage.toLowerCase().includes(normalized)
        );
    }, [searchValue]);

    return (
        <aside className="sticky space-y-3 top-0 z-10 flex h-screen w-140 shrink-0 flex-col border-r border-slate-800 bg-[#0f172a] py-4 backdrop-blur-sm"
        >

            <div className={`border-b border-slate-800`}>
                <h2 className="mb-3 px-3 text-xl font-semibold text-slate-100">Сообщения</h2>
            </div>

            {/* Header этого сайд бара в нем будет поиск по пользователям */}
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
                        placeholder="Поиск по чатам..."
                        className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900/70 pl-10 pr-3 text-sm text-slate-100 placeholder:text-slate-500 transition hover:border-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                </label>
            </div>

            {/* Основной список сообщений, автарка человека, его ник, полсденее сообщение, время последнего сообщения и сколько от него сообщений не прочитано
                пока можно мокнуть данные прям в этом файле чтобы видеть визуал
             */}
            <div className="scrollbar-thin px-3 flex-1 space-y-1 overflow-y-auto pr-1">
                {filteredChats.length === 0 ? (
                    <div className="rounded-xl border text-center border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-400">
                        По вашему запросу ничего не найдено
                    </div>
                ) : (
                    filteredChats.map((chat) => {
                        const isActive = activeChatId === chat.id;

                        return (
                            <button
                                key={chat.id}
                                type="button"
                                onClick={() => setActiveChatId(chat.id)}
                                className={`w-full cursor-pointer rounded-xl border px-3 py-2 text-left transition ${
                                    isActive
                                        ? "border-indigo-500/60 bg-indigo-500/10"
                                        : "border-transparent bg-transparent hover:border-slate-700 hover:bg-slate-900/60"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative grid h-11 w-11 shrink-0 place-content-center rounded-full bg-slate-800 text-sm font-semibold text-slate-200">
                                        {chat.userName.slice(0, 1)}
                                        {chat.isOnline && (
                                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0f172a] bg-emerald-400"/>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="mb-0.5 flex items-center justify-between gap-2">
                                            <p className="truncate text-sm font-medium text-slate-100">{chat.userName}</p>
                                            <span className="shrink-0 text-xs text-slate-400">{chat.time}</span>
                                        </div>

                                        <div className="flex items-center justify-between gap-2">
                                            <p className="truncate text-xs text-slate-400">{chat.lastMessage}</p>

                                            {chat.unreadCount > 0 && (
                                                <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                                                    {chat.unreadCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </aside>
    )
}

'use client'

import {
    Bell,
    ChevronRight,
    HelpCircle,
    Palette,
    Shield,
    Smartphone,
} from 'lucide-react';
import SideBarHeader from "@/shared/UI/elements/sideBar/SideBarHeader";

function getInitials(displayName: string): string {
    const trimmed = displayName.trim();
    if (!trimmed) return '?';
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
        return (parts[0]![0] + parts[1]![0]).toUpperCase();
    }
    return trimmed.slice(0, 2).toUpperCase();
}

const mockProfile = {
    userName: 'Алексей Смирнов',
    description: 'Фронтенд и интерфейсы Nexus Messenger.',
    birthday: '14 марта',
    phone: '+7 900 123-45-67',
};

const settingsItems = [
    { id: 'notifications', label: 'Уведомления и звуки', icon: Bell },
    { id: 'privacy', label: 'Конфиденциальность', icon: Shield },
    { id: 'appearance', label: 'Оформление', icon: Palette },
    { id: 'devices', label: 'Устройства', icon: Smartphone },
    { id: 'help', label: 'Помощь', icon: HelpCircle },
] as const;

export default function SettingsSideBar() {

    const initials = getInitials(mockProfile.userName);

    return (
        <aside
            className="sticky top-0 z-10 flex h-screen w-full min-h-0 shrink-0 flex-col border-r border-slate-800 bg-[#0f172a] py-4 backdrop-blur-sm md:w-140"
        >
            <SideBarHeader label="Настройки" />

            <div className="scrollbar-thin flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
                <section className="border-b border-slate-800 px-3 pb-5">
                    <div className="flex flex-col items-center gap-4 pt-5 text-center">
                        <div
                            className="grid h-20 w-20 shrink-0 place-content-center rounded-full bg-slate-800 text-xl font-semibold tracking-tight text-slate-100 ring-2 ring-slate-700/80"
                            aria-hidden
                        >
                            {initials}
                        </div>

                        <dl className="w-full space-y-5 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-left">
                            <div>
                                <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                                    Имя пользователя
                                </dt>
                                <dd className="mt-0.5 text-sm text-slate-200">{mockProfile.userName}</dd>
                            </div>
                            <div>
                                <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                                    Описание
                                </dt>
                                <dd className="mt-0.5 text-sm text-slate-200">{mockProfile.description}</dd>
                            </div>
                            <div>
                                <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                                    День рождения
                                </dt>
                                <dd className="mt-0.5 text-sm text-slate-200">{mockProfile.birthday}</dd>
                            </div>
                            <div>
                                <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                                    Телефон
                                </dt>
                                <dd className="mt-0.5 text-sm text-slate-200 tabular-nums">{mockProfile.phone}</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <nav className="flex flex-col gap-1 px-3 pt-4 pb-2" aria-label="Разделы настроек">
                    {settingsItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                className="group flex w-full cursor-pointer items-center gap-3 rounded-xl border border-transparent bg-transparent px-3 py-2.5 text-left transition hover:border-slate-700 hover:bg-slate-900/60"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 text-slate-300 transition group-hover:bg-slate-800 group-hover:text-indigo-300">
                                    <Icon size={20} strokeWidth={2} />
                                </span>

                                <span className="min-w-0 flex-1 text-sm font-medium text-slate-100">
                                    {item.label}
                                </span>

                                <ChevronRight
                                    className="h-5 w-5 shrink-0 text-slate-500 transition group-hover:text-slate-400"
                                    aria-hidden
                                />
                            </button>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}

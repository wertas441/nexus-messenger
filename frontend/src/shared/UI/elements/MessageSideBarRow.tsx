
interface IProps {
    userName: string;
    isOnline: boolean;
    onClick: () => void;
    isActive: boolean;
    time: string;
    lastMessage: string;
    unreadCount: number;
}

export default function MessageSideBarRow({userName, isOnline, onClick, isActive, time, lastMessage, unreadCount} : IProps) {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full cursor-pointer rounded-xl border px-3 py-2 text-left transition ${
                isActive
                    ? "border-indigo-500/60 bg-indigo-500/10"
                    : "border-transparent bg-transparent hover:border-slate-700 hover:bg-slate-900/60"
            }`}
        >
            <div className="flex items-center gap-3">
                <div className="relative grid h-11 w-11 shrink-0 place-content-center rounded-full bg-slate-800 text-sm font-semibold text-slate-200">
                    {userName.slice(0, 1)}
                    {isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0f172a] bg-emerald-400"/>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-slate-100">{userName}</p>

                        <span className="shrink-0 text-xs text-slate-400">{time}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-xs text-slate-400">{lastMessage}</p>

                        {unreadCount > 0 && (
                            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-indigo-600
                             px-1.5 py-0.5 text-[10px] font-semibold text-white"
                            >
                                {unreadCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </button>
    )
}
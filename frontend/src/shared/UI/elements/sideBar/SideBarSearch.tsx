import {Search} from "lucide-react";

interface IProps {
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
}

export default function SideBarSearch({searchValue, setSearchValue} : IProps) {

    return (
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
                    className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900/70 pl-10 pr-3 text-sm
                    text-slate-100 placeholder:text-slate-500 transition hover:border-slate-500 focus:border-indigo-500
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
            </label>
        </div>
    )
}

export default function SavedSideBar() {

    return (
        <aside className="sticky space-y-3 top-0 z-10 flex h-screen w-140 shrink-0 flex-col border-r border-slate-800 bg-[#0f172a] py-4 backdrop-blur-sm" >

            <div className={`border-b border-slate-800`}>
                <h2 className="mb-3 px-3 text-xl font-semibold text-slate-100">Сохраненные сообщения</h2>
            </div>

        </aside>
    )
}
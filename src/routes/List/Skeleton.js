
export function Skeleton() {
    const items = [...Array(6)].map((_, index) => (
        <div key={index} className="flex justify-between items-center gap-2">
            <div className="bg-slate-200 rounded-full w-6 h-6"></div>
            <div className="bg-slate-200 flex-grow h-[50px] rounded-lg"></div>
        </div>
    ));

    return (
        <div className="flex flex-col gap-2 animate-pulse">
            <div className="bg-slate-200 w-1/5 h-10 rounded-lg"></div>
            <div className="bg-slate-200 w-full h-[50px] rounded-lg"></div>
            {items}
        </div>
    )
}
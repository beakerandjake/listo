/**
 * Loading Skeleton for the List route.
 */
export function LoadingSkeleton() {
  const items = [...Array(6)].map((_, index) => (
    <div key={index} className="flex justify-between items-center gap-2">
      {/* Checkbox */}
      <div className="bg-slate-200 rounded-full w-6 h-6"></div>
      {/* Item */}
      <div className="bg-slate-200 flex-grow h-14 rounded-lg"></div>
    </div>
  ));

  return (
    <div className="flex flex-col gap-2 animate-pulse">
      {/* Header */}
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="bg-slate-200 w-1/4 h-10 rounded-lg"></div>
          <div className="bg-slate-200 w-6 h-6 rounded-full"></div>
        </div>
        <div className="bg-slate-200 w-1/4 h-10 rounded-lg"></div>
      </div>
      {/* Add Item */}
      <div className="bg-slate-200 w-full h-14 rounded-lg"></div>
      {/* Items */}
      {items}
    </div>
  );
}

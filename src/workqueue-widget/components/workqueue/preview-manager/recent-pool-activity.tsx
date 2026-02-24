const ACTIVITY = [
  { action: "claimed", user: "Sarah Chen", item: "CLM-2024003", time: "12m ago" },
  { action: "released", user: "Marcus Johnson", item: "CLM-2024008", time: "28m ago" },
  { action: "claimed", user: "Ahmed Hassan", item: "CLM-2024005", time: "1h ago" },
  { action: "force-assigned", user: "Diana Patel (Manager)", item: "CLM-2024010", time: "2h ago" },
]

export function RecentPoolActivity() {
  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">Recent Pool Activity</p>
      <div className="flex flex-col gap-1.5">
        {ACTIVITY.map((entry) => (
          <div key={`${entry.user}-${entry.item}-${entry.time}`} className="flex items-center gap-2 text-xs">
            <span className={`h-2 w-2 shrink-0 rounded-full ${entry.action === "claimed" ? "bg-green-500" : entry.action === "released" ? "bg-orange-500" : "bg-primary"}`} />
            <span className="font-semibold text-slate-900">{entry.user}</span>
            <span className="text-slate-700">{entry.action}</span>
            <span className="font-mono font-semibold text-slate-900">{entry.item}</span>
            <span className="ml-auto text-slate-600">{entry.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

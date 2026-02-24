import type { QueueItemRow } from "./types"

interface SummaryCardsProps {
  myItems: QueueItemRow[]
  poolItemsCount: number
  selfAssignEnabled: boolean
  capacityMax: number
  queueSlaEnabled: boolean
  statusColumnId?: string
}

function countByStatus(rows: QueueItemRow[], statusColumnId: string | undefined, status: string) {
  if (!statusColumnId) return 0
  return rows.filter((row) => row[statusColumnId] === status).length
}

export function SummaryCards(props: SummaryCardsProps) {
  const { myItems, poolItemsCount, selfAssignEnabled, capacityMax, queueSlaEnabled, statusColumnId } = props

  return (
    <div className={`grid gap-3 ${selfAssignEnabled ? "grid-cols-2 lg:grid-cols-5" : "grid-cols-2 lg:grid-cols-4"}`}>
      <Card title="My Items" value={myItems.length} />
      <Card title="New" value={countByStatus(myItems, statusColumnId, "New")} valueClassName="text-blue-700" />
      <Card title="In Progress" value={countByStatus(myItems, statusColumnId, "In Progress")} valueClassName="text-green-700" />
      <Card title="SLA At Risk" value={queueSlaEnabled ? myItems.filter((row) => Number(row._slaHoursRemaining) < 4).length : "N/A"} className="border-orange-200 bg-orange-50" titleClassName="text-orange-800" valueClassName="text-orange-800" />
      {selfAssignEnabled && (
        <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Pool Available</p>
          <p className="mt-1 text-2xl font-bold text-primary">{poolItemsCount}</p>
          {capacityMax > 0 && <p className="mt-0.5 text-xs font-semibold text-slate-700">{myItems.length}/{capacityMax} capacity</p>}
        </div>
      )}
    </div>
  )
}

function Card({ title, value, className = "border-slate-200 bg-white", titleClassName = "text-slate-700", valueClassName = "text-slate-900" }: { title: string; value: string | number; className?: string; titleClassName?: string; valueClassName?: string }) {
  return (
    <div className={`rounded-lg border p-4 shadow-xs ${className}`}>
      <p className={`text-xs font-bold uppercase tracking-wider ${titleClassName}`}>{title}</p>
      <p className={`mt-1 text-2xl font-bold ${valueClassName}`}>{value}</p>
    </div>
  )
}

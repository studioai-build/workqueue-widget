import { Badge } from "../../ui/badge"
import type { QueueColumn } from "../../../lib/workqueue-types"

import { PRIORITY_STYLES, STATUS_STYLES } from "./constants"
import type { ManagerRow } from "./types"

export function renderCellValue(col: QueueColumn, row: ManagerRow) {
  const value = row[col.id]

  if (col.type === "currency") return <span className="font-mono text-sm font-semibold text-slate-900">${Number(value).toLocaleString()}</span>
  if (col.type === "status") return <Badge className={`border font-medium ${STATUS_STYLES[String(value)] || "bg-slate-100 text-slate-800 border-slate-200"}`}>{String(value)}</Badge>
  if (col.type === "priority") return <Badge className={`border font-medium ${PRIORITY_STYLES[String(value)] || "bg-slate-100 text-slate-800 border-slate-200"}`}>{String(value)}</Badge>

  if (col.type === "user") {
    const name = String(value)
    const initials = String(row[`${col.id}_initials`] || "--")
    const isUnassigned = name === "Unassigned"
    return (
      <span className="flex items-center gap-1.5 text-sm">
        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${isUnassigned ? "bg-slate-200 text-slate-600" : "bg-primary/20 text-primary"}`}>{initials}</span>
        <span className={`font-medium ${isUnassigned ? "text-slate-600" : "text-slate-900"}`}>{name}</span>
      </span>
    )
  }

  if (col.type === "link") return <span className="cursor-pointer text-sm font-medium text-primary underline-offset-2 hover:underline">{String(value)}</span>
  return <span className="text-sm font-medium text-slate-900">{String(value)}</span>
}

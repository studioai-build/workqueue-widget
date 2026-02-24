import { Badge } from "@/workqueue-widget/components/ui/badge"
import type { QueueColumn } from "@/workqueue-widget/lib/workqueue-types"

import { PRIORITY_STYLES, STATUS_STYLES } from "./constants"
import type { ItemValue } from "./types"

export function renderCellValue(col: QueueColumn, value: ItemValue) {
  if (col.type === "currency") {
    return <span className="font-mono text-sm font-semibold text-slate-900">${Number(value).toLocaleString()}</span>
  }

  if (col.type === "status") {
    const classes = STATUS_STYLES[String(value)] || "bg-slate-100 text-slate-800 border-slate-200"
    return <Badge className={`border font-medium ${classes}`}>{String(value)}</Badge>
  }

  if (col.type === "priority") {
    const classes = PRIORITY_STYLES[String(value)] || "bg-slate-100 text-slate-800 border-slate-200"
    return <Badge className={`border font-medium ${classes}`}>{String(value)}</Badge>
  }

  if (col.type === "user") {
    return value === "Me" ? (
      <span className="flex items-center gap-1.5 text-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">SC</span>
        <span className="font-semibold text-slate-900">Me</span>
      </span>
    ) : (
      <span className="text-sm font-medium text-slate-600">Pool</span>
    )
  }

  if (col.type === "link") {
    return <span className="cursor-pointer text-sm font-medium text-primary underline-offset-2 hover:underline">{String(value)}</span>
  }

  return <span className="text-sm font-medium text-slate-900">{String(value)}</span>
}

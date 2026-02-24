import { ArrowUpRight, Eye, UserCog } from "lucide-react"

import { Button } from "@/workqueue-widget/components/ui/button"
import { Checkbox } from "@/workqueue-widget/components/ui/checkbox"
import { TableCell, TableRow } from "@/workqueue-widget/components/ui/table"
import type { QueueColumn } from "@/workqueue-widget/lib/workqueue-types"

import { renderCellValue } from "./render-cell-value"
import { SLAIndicator } from "./sla-indicator"
import type { ManagerRow } from "./types"

interface ManagerTableRowProps {
  row: ManagerRow
  columns: QueueColumn[]
  selected: boolean
  userColumnId?: string
  slaEnabled: boolean
  selfAssignEnabled: boolean
  onToggle: (rowId: string) => void
  onOpenDetail: (row: ManagerRow) => void
  onOpenReassign: () => void
}

export function ManagerTableRow(props: ManagerTableRowProps) {
  const { row, columns, selected, userColumnId, slaEnabled, selfAssignEnabled, onToggle, onOpenDetail, onOpenReassign } = props
  const rowId = String(row._id)
  const slaHrs = Number(row._slaHoursRemaining)
  const rowClassName = selected ? "bg-primary/5" : slaEnabled && slaHrs < 0 ? "bg-red-50" : ""
  const forceAssign = Boolean(selfAssignEnabled && userColumnId && row[userColumnId] === "Unassigned")

  return (
    <TableRow className={`cursor-pointer border-b border-slate-100 hover:bg-slate-50 ${rowClassName}`} onClick={() => onOpenDetail(row)}>
      <TableCell onClick={(event) => event.stopPropagation()}><Checkbox checked={selected} onCheckedChange={() => onToggle(rowId)} /></TableCell>
      {columns.map((col) => <TableCell key={col.id} className="py-3">{renderCellValue(col, row)}</TableCell>)}
      {slaEnabled && <TableCell className="py-3"><SLAIndicator hoursRemaining={slaHrs} enabled /></TableCell>}
      <TableCell className="py-3 text-right" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-end gap-1"><Button size="sm" variant="ghost" className="h-8 gap-1.5 px-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"><Eye className="h-3.5 w-3.5" />View</Button><Button size="sm" variant="ghost" className="h-8 gap-1.5 px-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900" onClick={onOpenReassign}><UserCog className="h-3.5 w-3.5" />{forceAssign ? "Force Assign" : "Reassign"}</Button><Button size="sm" variant="ghost" className="h-8 gap-1.5 px-2 text-xs font-semibold text-red-700 hover:bg-red-50 hover:text-red-800"><ArrowUpRight className="h-3.5 w-3.5" />Escalate</Button></div></TableCell>
    </TableRow>
  )
}

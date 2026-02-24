import { CheckCircle2, Hand, Play, Undo2 } from "lucide-react"

import { Button } from "@/workqueue-widget/components/ui/button"
import { Checkbox } from "@/workqueue-widget/components/ui/checkbox"
import { TableCell, TableRow } from "@/workqueue-widget/components/ui/table"
import type { QueueColumn } from "@/workqueue-widget/lib/workqueue-types"

import { renderCellValue } from "./render-cell-value"
import { SLAIndicator } from "./sla-indicator"
import type { QueueItemRow } from "./types"

interface WorkItemRowProps {
  row: QueueItemRow
  columns: QueueColumn[]
  rowSelected: boolean
  activeSection: "my-items" | "pool"
  showSla: boolean
  allowRelease: boolean
  selfAssignEnabled: boolean
  isAtCapacity: boolean
  onToggleRow: (rowId: string) => void
  onOpenDetail: (row: QueueItemRow) => void
  onClaim: (row: QueueItemRow) => void
  onRelease: (row: QueueItemRow) => void
}

export function WorkItemRow(props: WorkItemRowProps) {
  const { row, columns, rowSelected, activeSection, showSla, allowRelease, selfAssignEnabled, isAtCapacity, onToggleRow, onOpenDetail, onClaim, onRelease } = props
  const rowId = String(row._id)

  return (
    <TableRow className={`cursor-pointer border-b border-slate-100 hover:bg-slate-50 ${rowSelected ? "bg-primary/5" : ""}`} onClick={() => onOpenDetail(row)}>
      {activeSection === "my-items" && <TableCell onClick={(event) => event.stopPropagation()}><Checkbox checked={rowSelected} onCheckedChange={() => onToggleRow(rowId)} /></TableCell>}
      {columns.map((col) => <TableCell key={col.id} className="py-3">{renderCellValue(col, row[col.id])}</TableCell>)}
      {showSla && <TableCell className="py-3"><SLAIndicator hoursRemaining={Number(row._slaHoursRemaining)} enabled /></TableCell>}
      <TableCell className="py-3 text-right" onClick={(event) => event.stopPropagation()}>{activeSection === "pool" ? <ClaimAction disabled={isAtCapacity} onClick={() => onClaim(row)} /> : <RowActions allowRelease={selfAssignEnabled && allowRelease} onRelease={() => onRelease(row)} />}</TableCell>
    </TableRow>
  )
}

function ClaimAction({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return <Button size="sm" className="h-8 gap-1.5 px-3 text-xs font-semibold" disabled={disabled} onClick={onClick}><Hand className="h-3.5 w-3.5" />Claim</Button>
}

function RowActions({ allowRelease, onRelease }: { allowRelease: boolean; onRelease: () => void }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button size="sm" variant="ghost" className="h-8 gap-1.5 px-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"><Play className="h-3.5 w-3.5" />Start</Button>
      <Button size="sm" variant="ghost" className="h-8 gap-1.5 px-2 text-xs font-semibold text-green-700 hover:bg-green-50 hover:text-green-800"><CheckCircle2 className="h-3.5 w-3.5" />Done</Button>
      {allowRelease && <Button size="sm" variant="ghost" className="h-8 gap-1.5 px-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-800" onClick={onRelease}><Undo2 className="h-3.5 w-3.5" />Release</Button>}
    </div>
  )
}

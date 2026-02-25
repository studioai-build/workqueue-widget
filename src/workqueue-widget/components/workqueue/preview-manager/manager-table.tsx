import { Checkbox } from "../../ui/checkbox"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../ui/table"
import type { QueueColumn } from "../../../lib/workqueue-types"

import { ManagerTableRow } from "./manager-table-row"
import { TableEmptyState } from "./table-empty-state"
import type { ManagerRow } from "./types"
import { cn } from "../../../lib/utils"

interface ManagerTableProps {
  rows: ManagerRow[]
  columns: QueueColumn[]
  selectedRows: Set<string>
  userColumnId?: string
  slaEnabled: boolean
  selfAssignEnabled: boolean
  onToggleAll: (checked: boolean) => void
  onToggleRow: (rowId: string) => void
  onOpenDetail: (row: ManagerRow) => void
  onOpenReassign: () => void
}

export function ManagerTable(props: ManagerTableProps) {
  const { rows, columns, selectedRows, userColumnId, slaEnabled, selfAssignEnabled, onToggleAll, onToggleRow, onOpenDetail, onOpenReassign } = props
  const allSelected = rows.length > 0 && selectedRows.size === rows.length
  const colSpan = columns.length + (slaEnabled ? 3 : 2)

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-xs">
      <Table className="table-fixed min-w-full"><TableHeader><TableRow className="border-b border-slate-200 bg-slate-50 hover:bg-transparent"><TableHead className="w-10"><Checkbox checked={allSelected} onCheckedChange={(value) => onToggleAll(Boolean(value))} /></TableHead>{columns.map((col) => <TableHead key={col.id} className={cn("w-36 text-xs font-bold uppercase tracking-wider text-slate-900", {
        "w-44": ["Assigned To"].includes(col.name)
      })}>{col.name}</TableHead>)}{slaEnabled && <TableHead className="w-52 text-xs font-bold uppercase tracking-wider text-slate-900">SLA</TableHead>}<TableHead className="w-52 text-right text-xs font-bold uppercase tracking-wider text-slate-900">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{rows.length === 0 ? <TableEmptyState colSpan={colSpan} /> : rows.map((row) => <ManagerTableRow key={String(row._id)} row={row} columns={columns} selected={selectedRows.has(String(row._id))} userColumnId={userColumnId} slaEnabled={slaEnabled} selfAssignEnabled={selfAssignEnabled} onToggle={onToggleRow} onOpenDetail={onOpenDetail} onOpenReassign={onOpenReassign} />)}</TableBody>
      </Table>
    </div>
  )
}

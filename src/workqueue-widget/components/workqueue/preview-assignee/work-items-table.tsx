import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/workqueue-widget/components/ui/table"
import type { QueueColumn } from "@/workqueue-widget/lib/workqueue-types"

import { TableEmptyState } from "./table-empty-state"
import type { QueueItemRow } from "./types"
import { WorkItemRow } from "./work-item-row"

interface WorkItemsTableProps {
  rows: QueueItemRow[]
  selectedRows: Set<string>
  activeSection: "my-items" | "pool"
  columns: QueueColumn[]
  showSla: boolean
  allowRelease: boolean
  selfAssignEnabled: boolean
  isAtCapacity: boolean
  onToggleRow: (rowId: string) => void
  onOpenDetail: (row: QueueItemRow) => void
  onClaim: (row: QueueItemRow) => void
  onRelease: (row: QueueItemRow) => void
}

export function WorkItemsTable(props: WorkItemsTableProps) {
  const { rows, selectedRows, activeSection, columns, showSla, allowRelease, selfAssignEnabled, isAtCapacity, onToggleRow, onOpenDetail, onClaim, onRelease } = props
  const visibleColumns = columns.filter((col) => !(activeSection === "pool" && col.type === "user"))
  const colSpan = visibleColumns.length + (activeSection === "my-items" ? 3 : 2)

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-xs">
      <Table className="table-fixed min-w-full">
        <TableHeader><TableRow className="border-b border-slate-200 bg-slate-50 hover:bg-transparent">{activeSection === "my-items" && <TableHead className="w-12"><span className="sr-only">Select</span></TableHead>}{visibleColumns.map((col) => <TableHead key={col.id} className="w-36 text-xs font-bold uppercase tracking-wider text-slate-900">{col.name}</TableHead>)}{showSla && <TableHead className="w-44 text-xs font-bold uppercase tracking-wider text-slate-900">SLA</TableHead>}<TableHead className="w-44 text-right text-xs font-bold uppercase tracking-wider text-slate-900">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{rows.length === 0 ? <TableEmptyState colSpan={colSpan} section={activeSection} /> : rows.map((row) => <WorkItemRow key={String(row._id)} row={row} columns={visibleColumns} rowSelected={selectedRows.has(String(row._id))} activeSection={activeSection} showSla={showSla} allowRelease={allowRelease} selfAssignEnabled={selfAssignEnabled} isAtCapacity={isAtCapacity} onToggleRow={onToggleRow} onOpenDetail={onOpenDetail} onClaim={onClaim} onRelease={onRelease} />)}</TableBody>
      </Table>
    </div>
  )
}

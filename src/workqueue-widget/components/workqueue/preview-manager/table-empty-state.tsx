import { Inbox } from "lucide-react"

import { TableCell, TableRow } from "@/workqueue-widget/components/ui/table"

interface TableEmptyStateProps {
  colSpan: number
}

export function TableEmptyState({ colSpan }: TableEmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="py-10 text-center">
        <div className="flex flex-col items-center gap-2"><Inbox className="h-8 w-8 text-slate-400" /><p className="text-sm font-medium text-slate-600">No items match your current filters</p></div>
      </TableCell>
    </TableRow>
  )
}

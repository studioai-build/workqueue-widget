import { Inbox } from "lucide-react"

import { TableCell, TableRow } from "../../ui/table"

interface TableEmptyStateProps {
  colSpan: number
  section: "my-items" | "pool"
}

export function TableEmptyState({ colSpan, section }: TableEmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="py-10 text-center">
        <div className="flex flex-col items-center gap-2">
          <Inbox className="h-8 w-8 text-slate-400" />
          <p className="text-sm font-medium text-slate-600">
            {section === "pool" ? "No items available in the pool right now" : "No items match your filter"}
          </p>
        </div>
      </TableCell>
    </TableRow>
  )
}

import { Badge } from "@/workqueue-widget/components/ui/badge"
import { Button } from "@/workqueue-widget/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/workqueue-widget/components/ui/select"
import { ArrowUpRight, Filter, Play } from "lucide-react"

import { STATUS_OPTIONS } from "./constants"

interface HeaderBarProps {
  myItemsCount: number
  poolItemsCount: number
  selfAssignEnabled: boolean
  hasStatusColumn: boolean
  selectedRowsCount: number
  activeSection: "my-items" | "pool"
  statusFilter: string
  onStatusFilterChange: (value: string) => void
}

export function HeaderBar(props: HeaderBarProps) {
  const { myItemsCount, poolItemsCount, selfAssignEnabled, hasStatusColumn, selectedRowsCount, activeSection, statusFilter, onStatusFilterChange } = props

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h3 className="text-lg font-bold text-slate-900">My Work Queue</h3>
        <p className="text-sm font-medium text-slate-700">
          {myItemsCount} item{myItemsCount !== 1 ? "s" : ""} assigned to you{selfAssignEnabled && ` / ${poolItemsCount} available in pool`}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {hasStatusColumn && (
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="h-9 w-40 border-slate-300 bg-white text-sm font-medium"><Filter className="mr-1.5 h-4 w-4 text-slate-600" /><SelectValue placeholder="Filter status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_OPTIONS.map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}
            </SelectContent>
          </Select>
        )}

        {selectedRowsCount > 0 && activeSection === "my-items" && (
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary" className="bg-slate-100 text-xs font-semibold text-slate-800">{selectedRowsCount} selected</Badge>
            <Button size="sm" variant="outline" className="h-9 gap-1.5 text-xs font-semibold"><Play className="h-3.5 w-3.5" />Start</Button>
            <Button size="sm" variant="outline" className="h-9 gap-1.5 text-xs font-semibold"><ArrowUpRight className="h-3.5 w-3.5" />Escalate</Button>
          </div>
        )}
      </div>
    </div>
  )
}

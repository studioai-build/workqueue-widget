import { BarChart3, RefreshCw } from "lucide-react"

import { Button } from "@/workqueue-widget/components/ui/button"

interface HeaderBarProps {
  totalItems: number
  teamMemberCount: number
}

export function HeaderBar({ totalItems, teamMemberCount }: HeaderBarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Queue Management Dashboard</h3>
        <p className="text-sm font-medium text-slate-700">{totalItems} total item{totalItems !== 1 ? "s" : ""} across {teamMemberCount} team members</p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="h-9 gap-1.5 text-xs font-semibold"><RefreshCw className="h-3.5 w-3.5" />Refresh</Button>
        <Button size="sm" variant="outline" className="h-9 gap-1.5 text-xs font-semibold"><BarChart3 className="h-3.5 w-3.5" />Reports</Button>
      </div>
    </div>
  )
}

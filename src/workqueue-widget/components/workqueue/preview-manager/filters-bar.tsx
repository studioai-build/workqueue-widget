import { Filter, ShieldAlert, UserCog } from "lucide-react"

import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "./constants"

interface FiltersBarProps {
  statusFilter: string
  assigneeFilter: string
  priorityFilter: string
  assigneeNames: string[]
  selectedCount: number
  onStatusFilterChange: (value: string) => void
  onAssigneeFilterChange: (value: string) => void
  onPriorityFilterChange: (value: string) => void
  onOpenReassign: () => void
}

export function FiltersBar(props: FiltersBarProps) {
  const { statusFilter, assigneeFilter, priorityFilter, assigneeNames, selectedCount, onStatusFilterChange, onAssigneeFilterChange, onPriorityFilterChange, onOpenReassign } = props

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Filter className="h-4 w-4 text-slate-600" />
      <Dropdown value={statusFilter} placeholder="Status" allLabel="All Statuses" options={["all", ...STATUS_OPTIONS]} widthClassName="w-36" onChange={onStatusFilterChange} />
      <Dropdown value={assigneeFilter} placeholder="Assignee" allLabel="All Assignees" options={["all", ...assigneeNames]} widthClassName="w-40" onChange={onAssigneeFilterChange} />
      <Dropdown value={priorityFilter} placeholder="Priority" allLabel="All Priorities" options={["all", ...PRIORITY_OPTIONS]} widthClassName="w-32" onChange={onPriorityFilterChange} />

      {selectedCount > 0 && (
        <div className="ml-auto flex items-center gap-1.5">
          <Badge variant="secondary" className="bg-slate-100 text-xs font-semibold text-slate-800">{selectedCount} selected</Badge>
          <Button size="sm" variant="outline" className="h-9 gap-1.5 text-xs font-semibold" onClick={onOpenReassign}><UserCog className="h-3.5 w-3.5" />Reassign</Button>
          <Button size="sm" variant="outline" className="h-9 gap-1.5 border-red-200 text-xs font-semibold text-red-700 hover:bg-red-50"><ShieldAlert className="h-3.5 w-3.5" />Escalate</Button>
        </div>
      )}
    </div>
  )
}

function Dropdown({ value, placeholder, allLabel, options, widthClassName, onChange }: { value: string; placeholder: string; allLabel: string; options: string[]; widthClassName: string; onChange: (value: string) => void }) {
  return <Select value={value} onValueChange={onChange}><SelectTrigger className={`h-9 ${widthClassName} border-slate-300 bg-white text-xs font-medium`}><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option} value={option}>{option === "all" ? allLabel : option}</SelectItem>)}</SelectContent></Select>
}

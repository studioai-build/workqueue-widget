import type { TeamAssignee } from "./types"

export const ASSIGNEES: TeamAssignee[] = [
  { name: "Sarah Chen", initials: "SC" },
  { name: "Marcus Johnson", initials: "MJ" },
  { name: "Ahmed Hassan", initials: "AH" },
  { name: "Priya Sharma", initials: "PS" },
  { name: "Unassigned", initials: "--" },
]

export const STATUS_OPTIONS = ["New", "In Progress", "Pending Info", "Under Review", "Escalated"]
export const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Critical"]

export const PRIORITY_STYLES: Record<string, string> = {
  Low: "bg-slate-100 text-slate-800 border-slate-200",
  Medium: "bg-blue-100 text-blue-800 border-blue-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Critical: "bg-red-100 text-red-800 border-red-200",
}

export const STATUS_STYLES: Record<string, string> = {
  New: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-green-100 text-green-800 border-green-200",
  "Pending Info": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Under Review": "bg-purple-100 text-purple-800 border-purple-200",
  Escalated: "bg-red-100 text-red-800 border-red-200",
}

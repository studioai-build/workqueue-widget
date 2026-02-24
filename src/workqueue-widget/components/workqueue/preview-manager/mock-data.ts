import type { QueueColumn } from "@/workqueue-widget/lib/workqueue-types"

import { ASSIGNEES, PRIORITY_OPTIONS, STATUS_OPTIONS } from "./constants"
import type { ManagerRow } from "./types"

const NAMES = [
  "John Rivera",
  "Maria Santos",
  "David Lee",
  "Angela Morrison",
  "Thomas Wu",
  "Rachel Green",
  "Kevin Park",
  "Laura Chen",
  "Michael Ford",
  "Jessica Adams",
  "Ryan Mitchell",
  "Karen Wright",
]

export function generateManagerMockRows(columns: QueueColumn[], count: number) {
  return Array.from({ length: count }, (_, i) => {
    const row: ManagerRow = { _id: `mgr-item-${i}`, _slaHoursRemaining: Math.round(Math.random() * 28 - 6), _assigneeIndex: i % ASSIGNEES.length }

    for (const col of columns) {
      if (col.type === "text") row[col.id] = getTextValue(col.name, i)
      if (col.type === "currency") row[col.id] = Math.round(5000 + Math.random() * 95000)
      if (col.type === "date") row[col.id] = new Date(Date.now() - Math.random() * 10 * 86400000).toLocaleDateString()
      if (col.type === "status") row[col.id] = STATUS_OPTIONS[i % STATUS_OPTIONS.length]
      if (col.type === "priority") row[col.id] = PRIORITY_OPTIONS[i % PRIORITY_OPTIONS.length]
      if (col.type === "user") assignUser(row, col.id, i)
      if (col.type === "number") row[col.id] = Math.round(Math.random() * 100)
      if (col.type === "link") row[col.id] = `#ref-${1000 + i}`
    }

    return row
  })
}

function assignUser(row: ManagerRow, columnId: string, index: number) {
  const assignee = ASSIGNEES[index % ASSIGNEES.length]
  row[columnId] = assignee.name
  row[`${columnId}_initials`] = assignee.initials
}

function getTextValue(columnName: string, index: number) {
  const lower = columnName.toLowerCase()
  if (lower.includes("id")) return `CLM-${2024000 + index + 1}`
  if (lower.includes("name") || lower.includes("claimant")) return NAMES[index % NAMES.length]
  return `Item ${index + 1}`
}

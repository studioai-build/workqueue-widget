import type { QueueColumn } from "@/workqueue-widget/lib/workqueue-types"

import type { QueueItemRow } from "./types"
import { STATUS_OPTIONS } from "./constants"

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
]

const PRIORITIES = ["Low", "Medium", "High", "Critical"]

export function generateMockRows(columns: QueueColumn[], count: number, selfAssignEnabled: boolean) {
  return Array.from({ length: count }, (_, i) => {
    const row: QueueItemRow = { _id: `item-${i}`, _slaHoursRemaining: Math.round(Math.random() * 24 - 4) }

    for (const col of columns) {
      if (col.type === "text") row[col.id] = getTextValue(col.name, i)
      if (col.type === "currency") row[col.id] = Math.round(5000 + Math.random() * 85000)
      if (col.type === "date") row[col.id] = new Date(Date.now() - Math.random() * 7 * 86400000).toLocaleDateString()
      if (col.type === "status") row[col.id] = STATUS_OPTIONS[i % STATUS_OPTIONS.length]
      if (col.type === "priority") row[col.id] = PRIORITIES[i % PRIORITIES.length]
      if (col.type === "user") row[col.id] = selfAssignEnabled ? (i < 3 ? "Me" : "Unassigned") : i < 5 ? "Me" : "Unassigned"
      if (col.type === "number") row[col.id] = Math.round(Math.random() * 100)
      if (col.type === "link") row[col.id] = `#ref-${1000 + i}`
    }

    return row
  })
}

function getTextValue(columnName: string, index: number) {
  const lower = columnName.toLowerCase()
  if (lower.includes("id")) return `CLM-${2024000 + index + 1}`
  if (lower.includes("name") || lower.includes("claimant")) return NAMES[index % NAMES.length]
  return `Item ${index + 1}`
}

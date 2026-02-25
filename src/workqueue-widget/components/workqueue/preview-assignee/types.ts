import type { QueueColumn, WorkqueueDefinition } from "../../../lib/workqueue-types"

export type ItemValue = string | number

export type QueueItemRow = Record<string, ItemValue> & {
  _id: string
  _slaHoursRemaining: number
}

export type AssigneeSection = "my-items" | "pool"

export interface PreviewAssigneeProps {
  queue: WorkqueueDefinition
}

export interface AssigneeCellContext {
  row: QueueItemRow
  column: QueueColumn
}

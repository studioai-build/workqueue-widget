import type { WorkqueueDefinition } from "../../../lib/workqueue-types"

export type ManagerCellValue = string | number

export type ManagerRow = Record<string, ManagerCellValue> & {
  _id: string
  _slaHoursRemaining: number
  _assigneeIndex: number
}

export interface TeamAssignee {
  name: string
  initials: string
}

export interface PreviewManagerProps {
  queue: WorkqueueDefinition
}

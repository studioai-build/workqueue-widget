import { useMemo, useState } from "react"

import { iamRoles, iamUsers, type WorkqueueDefinition } from "../../../lib/workqueue-types"

import { ASSIGNEES } from "./constants"
import { generateManagerMockRows } from "./mock-data"
import type { ManagerRow } from "./types"

export function usePreviewManagerState(queue: WorkqueueDefinition) {
  const [mockRows] = useState<ManagerRow[]>(() => generateManagerMockRows(queue.columns, 12))
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [statusFilter, setStatusFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [detailItem, setDetailItem] = useState<ManagerRow | null>(null)
  const [reassignDialogOpen, setReassignDialogOpen] = useState(false)

  const statusCol = useMemo(() => queue.columns.find((col) => col.type === "status"), [queue.columns])
  const userCol = useMemo(() => queue.columns.find((col) => col.type === "user"), [queue.columns])
  const priorityCol = useMemo(() => queue.columns.find((col) => col.type === "priority"), [queue.columns])

  const filteredRows = useMemo(() => mockRows.filter((row) => {
    if (statusFilter !== "all" && statusCol && row[statusCol.id] !== statusFilter) return false
    if (assigneeFilter !== "all" && userCol && row[userCol.id] !== assigneeFilter) return false
    if (priorityFilter !== "all" && priorityCol && row[priorityCol.id] !== priorityFilter) return false
    return true
  }), [assigneeFilter, mockRows, priorityFilter, priorityCol, statusCol, statusFilter, userCol])

  const workloadByAssignee = useMemo(() => ASSIGNEES.filter((assignee) => assignee.name !== "Unassigned").map((assignee) => ({ ...assignee, count: userCol ? mockRows.filter((row) => row[userCol.id] === assignee.name).length : 0 })), [mockRows, userCol])
  const accessRoles = useMemo(() => iamRoles.filter((role) => queue.accessRoleIds.includes(role.id)), [queue.accessRoleIds])
  const eligibleUsers = useMemo(() => iamUsers.filter((user) => user.roles.some((roleId) => queue.accessRoleIds.includes(roleId))), [queue.accessRoleIds])

  const totalItems = mockRows.length
  const slaAtRisk = queue.sla.enabled ? mockRows.filter((row) => Number(row._slaHoursRemaining) >= 0 && Number(row._slaHoursRemaining) < 4).length : 0
  const slaBreached = queue.sla.enabled ? mockRows.filter((row) => Number(row._slaHoursRemaining) < 0).length : 0
  const unassigned = userCol ? mockRows.filter((row) => row[userCol.id] === "Unassigned").length : 0
  const escalated = statusCol ? mockRows.filter((row) => row[statusCol.id] === "Escalated").length : 0

  return {
    filters: { statusFilter, assigneeFilter, priorityFilter },
    selectedRows,
    detailItem,
    reassignDialogOpen,
    filteredRows,
    workloadByAssignee,
    totalItems,
    slaAtRisk,
    slaBreached,
    unassigned,
    escalated,
    userColumnId: userCol?.id,
    accessRoles,
    eligibleUsers,
    setStatusFilter,
    setAssigneeFilter,
    setPriorityFilter,
    setSelectedRows,
    setDetailItem,
    setReassignDialogOpen,
  }
}

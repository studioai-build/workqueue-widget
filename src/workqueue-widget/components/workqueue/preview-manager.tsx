"use client"

import { ASSIGNEES } from "./preview-manager/constants"
import { DetailDialog } from "./preview-manager/detail-dialog"
import { FiltersBar } from "./preview-manager/filters-bar"
import { HeaderBar } from "./preview-manager/header-bar"
import { KpiCards } from "./preview-manager/kpi-cards"
import { ManagerTable } from "./preview-manager/manager-table"
import { ReassignDialog } from "./preview-manager/reassign-dialog"
import { SelfAssignInsights } from "./preview-manager/self-assign-insights"
import { TeamWorkload } from "./preview-manager/team-workload"
import type { PreviewManagerProps } from "./preview-manager/types"
import { usePreviewManagerState } from "./preview-manager/use-preview-manager-state"

export function PreviewManager({ queue }: PreviewManagerProps) {
  const state = usePreviewManagerState(queue)
  const { statusFilter, assigneeFilter, priorityFilter } = state.filters

  function toggleRow(rowId: string) {
    const next = new Set(state.selectedRows)
    if (next.has(rowId)) next.delete(rowId)
    else next.add(rowId)
    state.setSelectedRows(next)
  }

  function toggleAll(checked: boolean) {
    if (!checked) state.setSelectedRows(new Set())
    else state.setSelectedRows(new Set(state.filteredRows.map((row) => String(row._id))))
  }

  function openReassignFromDetail() {
    state.setDetailItem(null)
    state.setReassignDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <HeaderBar totalItems={state.totalItems} teamMemberCount={state.workloadByAssignee.length} />
      <KpiCards totalItems={state.totalItems} unassigned={state.unassigned} escalated={state.escalated} slaAtRisk={state.slaAtRisk} slaBreached={state.slaBreached} selfAssignEnabled={queue.selfAssign.enabled} slaEnabled={queue.sla.enabled} />
      <TeamWorkload members={state.workloadByAssignee} />
      <SelfAssignInsights enabled={queue.selfAssign.enabled} unassigned={state.unassigned} config={queue.selfAssign} members={state.workloadByAssignee} />
      <FiltersBar statusFilter={statusFilter} assigneeFilter={assigneeFilter} priorityFilter={priorityFilter} assigneeNames={ASSIGNEES.map((assignee) => assignee.name)} selectedCount={state.selectedRows.size} onStatusFilterChange={state.setStatusFilter} onAssigneeFilterChange={state.setAssigneeFilter} onPriorityFilterChange={state.setPriorityFilter} onOpenReassign={() => state.setReassignDialogOpen(true)} />
      <ManagerTable rows={state.filteredRows} columns={queue.columns} selectedRows={state.selectedRows} userColumnId={state.userColumnId} slaEnabled={queue.sla.enabled} selfAssignEnabled={queue.selfAssign.enabled} onToggleAll={toggleAll} onToggleRow={toggleRow} onOpenDetail={state.setDetailItem} onOpenReassign={() => state.setReassignDialogOpen(true)} />
      <p className="text-xs font-medium text-slate-700">Showing {state.filteredRows.length} of {state.totalItems} items</p>

      <DetailDialog open={state.detailItem !== null && !state.reassignDialogOpen} item={state.detailItem} columns={queue.columns} slaEnabled={queue.sla.enabled} onClose={() => state.setDetailItem(null)} onOpenReassign={openReassignFromDetail} />
      <ReassignDialog open={state.reassignDialogOpen} selectedCount={state.selectedRows.size} eligibleUsers={state.eligibleUsers} accessRoles={state.accessRoles} onClose={() => state.setReassignDialogOpen(false)} />
    </div>
  )
}

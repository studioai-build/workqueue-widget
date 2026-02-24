"use client"

import { useMemo, useState } from "react"

import { CapacityBar } from "./preview-assignee/capacity-bar"
import { ClaimDialog } from "./preview-assignee/claim-dialog"
import { DetailDialog } from "./preview-assignee/detail-dialog"
import { HeaderBar } from "./preview-assignee/header-bar"
import { generateMockRows } from "./preview-assignee/mock-data"
import { PoolBanner } from "./preview-assignee/pool-banner"
import { SectionToggle } from "./preview-assignee/section-toggle"
import { SummaryCards } from "./preview-assignee/summary-cards"
import type { AssigneeSection, PreviewAssigneeProps, QueueItemRow } from "./preview-assignee/types"
import { WorkItemsTable } from "./preview-assignee/work-items-table"

export function PreviewAssignee({ queue }: PreviewAssigneeProps) {
  const selfAssign = queue.selfAssign
  const [mockRows, setMockRows] = useState<QueueItemRow[]>(() => generateMockRows(queue.columns, selfAssign.enabled ? 10 : 7, selfAssign.enabled))
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [statusFilter, setStatusFilter] = useState("all")
  const [detailItem, setDetailItem] = useState<QueueItemRow | null>(null)
  const [claimDialog, setClaimDialog] = useState<QueueItemRow | null>(null)
  const [activeSection, setActiveSection] = useState<AssigneeSection>("my-items")

  const userCol = useMemo(() => queue.columns.find((col) => col.type === "user"), [queue.columns])
  const statusCol = useMemo(() => queue.columns.find((col) => col.type === "status"), [queue.columns])
  const myItems = useMemo(() => mockRows.filter((row) => !userCol || row[userCol.id] === "Me"), [mockRows, userCol])
  const poolItems = useMemo(() => mockRows.filter((row) => userCol && row[userCol.id] === "Unassigned"), [mockRows, userCol])
  const activeRows = activeSection === "pool" ? poolItems : myItems
  const filteredRows = useMemo(() => activeRows.filter((row) => statusFilter === "all" || !statusCol || row[statusCol.id] === statusFilter), [activeRows, statusFilter, statusCol])

  const capacityUsed = myItems.length
  const capacityMax = selfAssign.maxItemsPerUser
  const isAtCapacity = capacityMax > 0 && capacityUsed >= capacityMax

  function toggleRow(id: string) {
    const next = new Set(selectedRows)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedRows(next)
  }

  function handleSectionChange(section: AssigneeSection) {
    setActiveSection(section)
    setSelectedRows(new Set())
  }

  function performClaim(row: QueueItemRow) {
    if (!userCol) return
    setMockRows((prev) => prev.map((item) => (item._id === row._id ? { ...item, [userCol.id]: "Me" } : item)))
    setClaimDialog(null)
  }

  function claimItem(row: QueueItemRow) {
    if (selfAssign.requireJustification) setClaimDialog(row)
    else performClaim(row)
  }

  function releaseItem(row: QueueItemRow) {
    if (!userCol) return
    setMockRows((prev) => prev.map((item) => (item._id === row._id ? { ...item, [userCol.id]: "Unassigned" } : item)))
  }

  return (
    <div className="flex flex-col gap-4">
      <HeaderBar myItemsCount={myItems.length} poolItemsCount={poolItems.length} selfAssignEnabled={selfAssign.enabled} hasStatusColumn={Boolean(statusCol)} selectedRowsCount={selectedRows.size} activeSection={activeSection} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />
      <SummaryCards myItems={myItems} poolItemsCount={poolItems.length} selfAssignEnabled={selfAssign.enabled} capacityMax={capacityMax} queueSlaEnabled={queue.sla.enabled} statusColumnId={statusCol?.id} />
      <CapacityBar enabled={selfAssign.enabled} capacityUsed={capacityUsed} capacityMax={capacityMax} isAtCapacity={isAtCapacity} />
      <SectionToggle enabled={selfAssign.enabled} activeSection={activeSection} myItemsCount={myItems.length} poolItemsCount={poolItems.length} onChange={handleSectionChange} />
      <PoolBanner selfAssignEnabled={selfAssign.enabled} activeSection={activeSection} isAtCapacity={isAtCapacity} />

      <WorkItemsTable
        rows={filteredRows}
        selectedRows={selectedRows}
        activeSection={activeSection}
        columns={queue.columns}
        showSla={queue.sla.enabled}
        allowRelease={selfAssign.allowRelease}
        selfAssignEnabled={selfAssign.enabled}
        isAtCapacity={isAtCapacity}
        onToggleRow={toggleRow}
        onOpenDetail={setDetailItem}
        onClaim={claimItem}
        onRelease={releaseItem}
      />

      <ClaimDialog queueColumns={queue.columns} claimDialog={claimDialog} onClose={() => setClaimDialog(null)} onConfirm={performClaim} />
      <DetailDialog detailItem={detailItem} queueColumns={queue.columns} userColumnId={userCol?.id} queueSlaEnabled={queue.sla.enabled} selfAssignEnabled={selfAssign.enabled} allowRelease={selfAssign.allowRelease} requireJustification={selfAssign.requireJustification} isAtCapacity={isAtCapacity} onClose={() => setDetailItem(null)} onClaim={claimItem} onRelease={releaseItem} />
    </div>
  )
}

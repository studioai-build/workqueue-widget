import { ArrowUpRight, CheckCircle2, FileText, Hand, MessageSquare, Play, Undo2 } from "lucide-react"

import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog"
import type { QueueColumn } from "../../../lib/workqueue-types"

import { SLAIndicator } from "./sla-indicator"
import type { QueueItemRow } from "./types"

interface DetailDialogProps {
  detailItem: QueueItemRow | null
  queueColumns: QueueColumn[]
  userColumnId?: string
  queueSlaEnabled: boolean
  selfAssignEnabled: boolean
  allowRelease: boolean
  requireJustification: boolean
  isAtCapacity: boolean
  onClose: () => void
  onClaim: (row: QueueItemRow) => void
  onRelease: (row: QueueItemRow) => void
}

export function DetailDialog(props: DetailDialogProps) {
  const { detailItem, queueColumns, userColumnId, queueSlaEnabled, selfAssignEnabled, allowRelease, requireJustification, isAtCapacity, onClose, onClaim, onRelease } = props

  return (
    <Dialog open={detailItem !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle className="flex items-center gap-2 text-slate-900"><FileText className="h-5 w-5 text-primary" />Work Item Detail</DialogTitle></DialogHeader>
        {detailItem && <div className="flex flex-col gap-3 py-2"><div className="flex flex-col gap-2">{queueColumns.map((col) => <DetailLine key={col.id} label={col.name} value={col.type === "currency" ? `$${Number(detailItem[col.id]).toLocaleString()}` : String(detailItem[col.id])} />)}</div>{queueSlaEnabled && <DetailLine label="SLA Status" valueNode={<SLAIndicator hoursRemaining={Number(detailItem._slaHoursRemaining)} enabled />} />}
          <div className="mt-2 flex flex-col gap-2"><p className="text-xs font-bold uppercase tracking-wider text-slate-700">Actions</p>{userColumnId && detailItem[userColumnId] === "Me" ? <OwnedActions allowRelease={selfAssignEnabled && allowRelease} onRelease={() => { onRelease(detailItem); onClose() }} /> : <Button size="sm" className="gap-1.5 font-semibold" disabled={isAtCapacity} onClick={() => { onClaim(detailItem); if (!requireJustification) onClose() }}><Hand className="h-4 w-4" />{isAtCapacity ? "At Capacity" : "Claim This Item"}</Button>}</div></div>}
        <DialogFooter><Button variant="outline" onClick={onClose} className="font-semibold">Close</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DetailLine({ label, value, valueNode }: { label: string; value?: string; valueNode?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 last:border-0">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">{label}</span>
      <span className="text-right text-sm font-semibold text-slate-900">{valueNode ?? value}</span>
    </div>
  )
}

function OwnedActions({ allowRelease, onRelease }: { allowRelease: boolean; onRelease: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button size="sm" className="gap-1.5 font-semibold"><Play className="h-4 w-4" />Start Working</Button>
      <Button size="sm" variant="outline" className="gap-1.5 font-semibold"><CheckCircle2 className="h-4 w-4" />Mark Complete</Button>
      <Button size="sm" variant="outline" className="gap-1.5 font-semibold"><ArrowUpRight className="h-4 w-4" />Escalate</Button>
      <Button size="sm" variant="outline" className="gap-1.5 font-semibold"><MessageSquare className="h-4 w-4" />Add Note</Button>
      {allowRelease && <Button size="sm" variant="outline" className="col-span-2 gap-1.5 font-semibold text-slate-700" onClick={onRelease}><Undo2 className="h-4 w-4" />Release Back to Pool</Button>}
    </div>
  )
}

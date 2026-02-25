import { Hand } from "lucide-react"

import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import type { QueueColumn } from "../../../lib/workqueue-types"

import type { QueueItemRow } from "./types"

interface ClaimDialogProps {
  queueColumns: QueueColumn[]
  claimDialog: QueueItemRow | null
  onClose: () => void
  onConfirm: (row: QueueItemRow) => void
}

export function ClaimDialog({ queueColumns, claimDialog, onClose, onConfirm }: ClaimDialogProps) {
  return (
    <Dialog open={claimDialog !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900"><Hand className="h-5 w-5 text-primary" />Claim Work Item</DialogTitle>
          <DialogDescription className="text-slate-700">A justification is required to claim this item.</DialogDescription>
        </DialogHeader>

        {claimDialog && (
          <div className="flex flex-col gap-4 py-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">{queueColumns.slice(0, 3).map((col) => <ClaimSummaryItem key={col.id} label={col.name} value={col.type === "currency" ? `$${Number(claimDialog[col.id]).toLocaleString()}` : String(claimDialog[col.id])} />)}</div>
            <div className="flex flex-col gap-2"><Label htmlFor="claim-reason" className="text-sm font-bold text-slate-900">Justification</Label><Textarea id="claim-reason" placeholder="Why are you claiming this item?" rows={3} className="resize-none border-slate-300 text-slate-900" /></div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="font-semibold">Cancel</Button>
          <Button onClick={() => claimDialog && onConfirm(claimDialog)} className="gap-1.5 font-semibold"><Hand className="h-4 w-4" />Claim Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ClaimSummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  )
}

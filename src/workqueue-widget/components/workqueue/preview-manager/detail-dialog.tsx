import { ArrowUpRight, FileText, MessageSquare, ShieldAlert, UserCog } from "lucide-react"

import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog"
import type { QueueColumn } from "../../../lib/workqueue-types"

import { SLAIndicator } from "./sla-indicator"
import type { ManagerRow } from "./types"

const ACTIVITY = [
  { time: "2h ago", text: "Status changed to In Progress", by: "Sarah Chen" },
  { time: "5h ago", text: "Assigned to Sarah Chen via round-robin", by: "System" },
  { time: "5h ago", text: "Item created from Claim Intake Pipeline", by: "System" },
]

interface DetailDialogProps {
  open: boolean
  item: ManagerRow | null
  columns: QueueColumn[]
  slaEnabled: boolean
  onClose: () => void
  onOpenReassign: () => void
}

export function DetailDialog({ open, item, columns, slaEnabled, onClose, onOpenReassign }: DetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle className="flex items-center gap-2 text-slate-900"><FileText className="h-5 w-5 text-primary" />Item Detail (Manager View)</DialogTitle></DialogHeader>
        {item && <div className="flex flex-col gap-3 py-2"><div className="flex flex-col gap-2">{columns.map((col) => <DetailLine key={col.id} label={col.name} value={col.type === "currency" ? `$${Number(item[col.id]).toLocaleString()}` : String(item[col.id])} />)}</div>{slaEnabled && <DetailLine label="SLA Status" valueNode={<SLAIndicator hoursRemaining={Number(item._slaHoursRemaining)} enabled />} />}
          <ActivityLog />
          <div className="mt-1 flex flex-col gap-2"><p className="text-xs font-bold uppercase tracking-wider text-slate-700">Manager Actions</p><div className="grid grid-cols-2 gap-2"><Button size="sm" variant="outline" className="gap-1.5 font-semibold" onClick={onOpenReassign}><UserCog className="h-4 w-4" />Reassign</Button><Button size="sm" variant="outline" className="gap-1.5 border-red-200 font-semibold text-red-700 hover:bg-red-50"><ArrowUpRight className="h-4 w-4" />Escalate</Button><Button size="sm" variant="outline" className="gap-1.5 font-semibold"><MessageSquare className="h-4 w-4" />Add Note</Button><Button size="sm" variant="outline" className="gap-1.5 font-semibold"><ShieldAlert className="h-4 w-4" />Flag for Audit</Button></div></div>
        </div>}
        <DialogFooter><Button variant="outline" onClick={onClose} className="font-semibold">Close</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DetailLine({ label, value, valueNode }: { label: string; value?: string; valueNode?: React.ReactNode }) {
  return <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 last:border-0"><span className="text-xs font-bold uppercase tracking-wider text-slate-700">{label}</span><span className="text-right text-sm font-semibold text-slate-900">{valueNode ?? value}</span></div>
}

function ActivityLog() {
  return <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">Activity Log</p><div className="flex flex-col gap-2">{ACTIVITY.map((entry) => <div key={`${entry.by}-${entry.time}-${entry.text}`} className="flex items-start gap-2"><span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary/60" /><div className="flex-1"><p className="text-xs font-medium text-slate-900">{entry.text}</p><p className="text-[10px] font-medium text-slate-600">{entry.by} - {entry.time}</p></div></div>)}</div></div>
}

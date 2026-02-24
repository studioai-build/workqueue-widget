import { UserCog } from "lucide-react"

import { Button } from "@/workqueue-widget/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/workqueue-widget/components/ui/dialog"
import { Label } from "@/workqueue-widget/components/ui/label"
import { Textarea } from "@/workqueue-widget/components/ui/textarea"
import type { IAMRole, IAMUser } from "@/workqueue-widget/lib/workqueue-types"

interface ReassignDialogProps {
  open: boolean
  selectedCount: number
  eligibleUsers: IAMUser[]
  accessRoles: IAMRole[]
  onClose: () => void
}

export function ReassignDialog({ open, selectedCount, eligibleUsers, accessRoles, onClose }: ReassignDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle className="flex items-center gap-2 text-slate-900"><UserCog className="h-5 w-5 text-primary" />Reassign Work Item{selectedCount > 1 ? "s" : ""}</DialogTitle></DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-2"><Label className="text-sm font-bold text-slate-900">Assign to</Label><p className="text-xs font-medium text-slate-700">Eligible users based on queue access roles: {accessRoles.map((role) => role.name).join(", ")}</p><div className="flex max-h-48 flex-col gap-1 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">{eligibleUsers.map((user) => <UserOption key={user.id} user={user} accessRoles={accessRoles} />)}</div></div>
          <div className="flex flex-col gap-2"><Label htmlFor="reassign-note" className="text-sm font-bold text-slate-900">Note (optional)</Label><Textarea id="reassign-note" placeholder="Add a reason for reassignment..." rows={2} className="resize-none border-slate-300 text-slate-900" /></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose} className="font-semibold">Cancel</Button><Button onClick={onClose} className="font-semibold">Reassign</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function UserOption({ user, accessRoles }: { user: IAMUser; accessRoles: IAMRole[] }) {
  const userRoles = accessRoles.filter((role) => user.roles.includes(role.id))
  return <label className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-white"><input type="radio" name="reassign-to" className="accent-primary" /><span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{user.initials}</span><div className="flex-1"><p className="text-sm font-semibold text-slate-900">{user.name}</p><p className="text-xs font-medium text-slate-700">{userRoles.map((role) => role.name).join(", ")}</p></div></label>
}

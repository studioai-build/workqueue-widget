import { Users } from "lucide-react"

interface MemberLoad {
  name: string
  initials: string
  count: number
}

interface TeamWorkloadProps {
  members: MemberLoad[]
}

export function TeamWorkload({ members }: TeamWorkloadProps) {
  const maxCount = Math.max(...members.map((member) => member.count), 1)

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
      <div className="mb-3 flex items-center gap-2"><Users className="h-5 w-5 text-slate-600" /><h4 className="text-sm font-bold text-slate-900">Team Workload</h4></div>
      <div className="flex flex-wrap gap-4">
        {members.map((member) => {
          const pct = Math.round((member.count / maxCount) * 100)
          return (
            <div key={member.name} className="flex min-w-[140px] flex-1 flex-col gap-1.5">
              <div className="flex items-center justify-between"><span className="flex items-center gap-1.5 text-xs"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{member.initials}</span><span className="font-semibold text-slate-900">{member.name}</span></span><span className="text-xs font-bold text-slate-900">{member.count}</span></div>
              <div className="h-2 w-full rounded-full bg-slate-200"><div className={`h-full rounded-full transition-all ${pct > 80 ? "bg-orange-500" : "bg-primary"}`} style={{ width: `${pct}%` }} /></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

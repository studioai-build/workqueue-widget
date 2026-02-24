interface MemberLoad {
  name: string
  initials: string
  count: number
}

interface CapacityByUserProps {
  members: MemberLoad[]
  maxItemsPerUser: number
}

export function CapacityByUser({ members, maxItemsPerUser }: CapacityByUserProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-xs lg:col-span-2">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">Claim Capacity by User</p>
      <div className="flex flex-col gap-2">
        {members.map((member) => {
          const pct = maxItemsPerUser > 0 ? Math.round((member.count / maxItemsPerUser) * 100) : 50
          const atCap = maxItemsPerUser > 0 && member.count >= maxItemsPerUser
          return (
            <div key={member.name} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{member.initials}</span>
              <div className="flex-1"><div className="mb-1 flex items-center justify-between"><span className="text-xs font-semibold text-slate-900">{member.name}</span><span className={`text-xs font-semibold ${atCap ? "text-red-700" : "text-slate-700"}`}>{member.count}{maxItemsPerUser > 0 ? `/${maxItemsPerUser}` : ""}{atCap && " (at capacity)"}</span></div><div className="h-2 w-full rounded-full bg-slate-200"><div className={`h-full rounded-full transition-all ${atCap ? "bg-red-600" : pct > 75 ? "bg-orange-500" : "bg-primary"}`} style={{ width: `${Math.min(pct, 100)}%` }} /></div></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

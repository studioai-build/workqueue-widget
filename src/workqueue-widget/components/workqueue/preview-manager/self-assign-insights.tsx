import { Hand, Inbox } from "lucide-react"

import { Badge } from "../../ui/badge"
import type { SelfAssignConfig } from "../../../lib/workqueue-types"

import { CapacityByUser } from "./capacity-by-user"
import { RecentPoolActivity } from "./recent-pool-activity"

interface MemberLoad {
  name: string
  initials: string
  count: number
}

interface SelfAssignInsightsProps {
  enabled: boolean
  unassigned: number
  config: SelfAssignConfig
  members: MemberLoad[]
}

export function SelfAssignInsights({ enabled, unassigned, config, members }: SelfAssignInsightsProps) {
  if (!enabled) return null

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 shadow-xs">
      <div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2"><Hand className="h-5 w-5 text-primary" /><h4 className="text-sm font-bold text-slate-900">Self-Assign Pool Insights</h4></div><Badge variant="secondary" className="gap-1 border-slate-200 bg-white text-xs font-semibold text-slate-800"><Inbox className="h-3 w-3" />{unassigned} items in pool</Badge></div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3"><PoolConfigCard config={config} /><CapacityByUser members={members} maxItemsPerUser={config.maxItemsPerUser} /></div>
      <RecentPoolActivity />
    </div>
  )
}

function PoolConfigCard({ config }: { config: SelfAssignConfig }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">Pool Configuration</p>
      <div className="flex flex-col gap-1.5 text-xs"><ConfigLine label="Max per user" value={config.maxItemsPerUser === 0 ? "Unlimited" : config.maxItemsPerUser} /><ConfigLine label="Allow release" value={config.allowRelease ? "Yes" : "No"} /><ConfigLine label="Justification" value={config.requireJustification ? "Required" : "Optional"} /><ConfigLine label="Visibility" value={config.poolVisibility === "all-eligible" ? "All eligible" : "Role filtered"} /></div>
    </div>
  )
}

function ConfigLine({ label, value }: { label: string; value: string | number }) {
  return <div className="flex items-center justify-between"><span className="text-slate-600">{label}</span><span className="font-semibold text-slate-900">{value}</span></div>
}

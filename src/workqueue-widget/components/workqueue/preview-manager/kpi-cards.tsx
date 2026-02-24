import { Hand, TrendingDown, TrendingUp } from "lucide-react"

interface KpiCardsProps {
  totalItems: number
  unassigned: number
  escalated: number
  slaAtRisk: number
  slaBreached: number
  selfAssignEnabled: boolean
  slaEnabled: boolean
}

export function KpiCards({ totalItems, unassigned, escalated, slaAtRisk, slaBreached, selfAssignEnabled, slaEnabled }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      <Card title="Total Items" value={totalItems} subtitle="12% vs last week" subtitleIcon={<TrendingDown className="h-3 w-3" />} subtitleClassName="text-green-700" />
      <PoolCard enabled={selfAssignEnabled} value={unassigned} />
      <Card title="Escalated" value={escalated} subtitle="requires review" subtitleIcon={<TrendingUp className="h-3 w-3" />} valueClassName="text-red-700" subtitleClassName="text-red-700" />
      {slaEnabled && <Card title="SLA At Risk" value={slaAtRisk} subtitle="< 4h remaining" className="border-orange-200 bg-orange-50" titleClassName="text-orange-800" valueClassName="text-orange-800" subtitleClassName="text-orange-700" />}
      {slaEnabled && <Card title="SLA Breached" value={slaBreached} subtitle="immediate action" className="border-red-200 bg-red-50" titleClassName="text-red-800" valueClassName="text-red-800" subtitleClassName="text-red-700" />}
    </div>
  )
}

function PoolCard({ enabled, value }: { enabled: boolean; value: number }) {
  const cardClass = enabled ? "border-primary/30 bg-primary/10" : "border-slate-200 bg-white"
  const titleClass = enabled ? "text-primary" : "text-slate-700"
  const valueClass = enabled ? "text-primary" : "text-slate-900"
  return <Card title={enabled ? "In Pool" : "Unassigned"} value={value} subtitle={enabled ? "self-assign pool" : "need attention"} subtitleIcon={enabled ? <Hand className="h-3 w-3" /> : undefined} className={cardClass} titleClassName={titleClass} valueClassName={valueClass} subtitleClassName="text-slate-700" />
}

function Card({ title, value, subtitle, subtitleIcon, className = "border-slate-200 bg-white", titleClassName = "text-slate-700", valueClassName = "text-slate-900", subtitleClassName = "text-slate-700" }: { title: string; value: number; subtitle: string; subtitleIcon?: React.ReactNode; className?: string; titleClassName?: string; valueClassName?: string; subtitleClassName?: string }) {
  return <div className={`rounded-lg border p-4 shadow-xs ${className}`}><p className={`text-xs font-bold uppercase tracking-wider ${titleClassName}`}>{title}</p><p className={`mt-1 text-2xl font-bold ${valueClassName}`}>{value}</p><p className={`mt-0.5 flex items-center gap-1 text-xs ${subtitleClassName}`}>{subtitleIcon}{subtitle}</p></div>
}

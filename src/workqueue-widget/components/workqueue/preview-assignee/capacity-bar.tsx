import { Hand } from "lucide-react"

interface CapacityBarProps {
  enabled: boolean
  capacityUsed: number
  capacityMax: number
  isAtCapacity: boolean
}

export function CapacityBar({ enabled, capacityUsed, capacityMax, isAtCapacity }: CapacityBarProps) {
  if (!enabled || capacityMax <= 0) return null

  const ratio = capacityUsed / capacityMax
  const barColor = isAtCapacity ? "bg-red-600" : ratio > 0.75 ? "bg-orange-500" : "bg-primary"

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-xs">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-bold text-slate-900"><Hand className="h-4 w-4 text-primary" />Self-Assign Capacity</span>
        <span className="text-sm font-semibold text-slate-700">{capacityUsed} of {capacityMax} slots used</span>
      </div>

      <div className="h-2 w-full rounded-full bg-slate-200">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${Math.min(ratio * 100, 100)}%` }} />
      </div>

      {isAtCapacity && <p className="mt-1.5 text-sm font-semibold text-red-700">You have reached your capacity limit. Complete or release items to claim more.</p>}
    </div>
  )
}

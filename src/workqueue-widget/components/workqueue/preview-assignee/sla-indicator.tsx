import { AlertTriangle, Clock } from "lucide-react"

interface SLAIndicatorProps {
  hoursRemaining: number
  enabled: boolean
}

export function SLAIndicator({ hoursRemaining, enabled }: SLAIndicatorProps) {
  if (!enabled) return null

  if (hoursRemaining < 0) {
    return (
      <span className="flex items-center gap-1 text-sm font-semibold text-red-700">
        <AlertTriangle className="h-4 w-4" />
        Breached
      </span>
    )
  }

  if (hoursRemaining < 4) {
    return (
      <span className="flex items-center gap-1 text-sm font-semibold text-orange-700">
        <Clock className="h-4 w-4" />
        {hoursRemaining}h left
      </span>
    )
  }

  return (
    <span className="flex items-center gap-1 text-sm text-slate-700">
      <Clock className="h-4 w-4" />
      {hoursRemaining}h left
    </span>
  )
}

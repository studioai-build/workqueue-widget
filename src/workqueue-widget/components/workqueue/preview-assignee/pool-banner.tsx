import { Hand } from "lucide-react"

import type { AssigneeSection } from "./types"

interface PoolBannerProps {
  selfAssignEnabled: boolean
  activeSection: AssigneeSection
  isAtCapacity: boolean
}

export function PoolBanner({ selfAssignEnabled, activeSection, isAtCapacity }: PoolBannerProps) {
  if (!selfAssignEnabled || activeSection !== "pool") return null

  return (
    <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 shadow-xs">
      <Hand className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <p className="text-sm font-semibold text-primary">
        These items are available for you to claim. Click &quot;Claim&quot; to add an item to your work queue.
        {isAtCapacity && " You are at capacity -- complete or release an item first."}
      </p>
    </div>
  )
}

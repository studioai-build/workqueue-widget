import { CheckCircle2, Inbox } from "lucide-react"

import type { AssigneeSection } from "./types"

interface SectionToggleProps {
  enabled: boolean
  activeSection: AssigneeSection
  myItemsCount: number
  poolItemsCount: number
  onChange: (section: AssigneeSection) => void
}

export function SectionToggle({ enabled, activeSection, myItemsCount, poolItemsCount, onChange }: SectionToggleProps) {
  if (!enabled) return null

  return (
    <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-xs">
      <ToggleButton active={activeSection === "my-items"} onClick={() => onChange("my-items")}>
        <CheckCircle2 className="h-4 w-4" />
        My Items ({myItemsCount})
      </ToggleButton>
      <ToggleButton active={activeSection === "pool"} onClick={() => onChange("pool")}>
        <Inbox className="h-4 w-4" />
        Available Pool ({poolItemsCount})
      </ToggleButton>
    </div>
  )
}

function ToggleButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-bold transition-colors ${active ? "bg-primary text-white shadow-xs" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"}`}>
      {children}
    </button>
  )
}

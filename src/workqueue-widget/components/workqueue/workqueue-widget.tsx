"use client"

import type { WorkqueueDefinition } from "@/workqueue-widget/lib/workqueue-types"
import { sampleQueue } from "@/workqueue-widget/lib/workqueue-types"
import {
  User,
  UserCog
} from "lucide-react"
import { useState } from "react"
import { PreviewAssignee } from "./preview-assignee"
import { PreviewManager } from "./preview-manager"

export function WorkqueueWidget() {
  const [queue,] = useState<WorkqueueDefinition>(sampleQueue)
  const [previewMode, setPreviewMode] = useState<"assignee" | "manager">("assignee")


  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col animate-fade-in">
      <div className="flex flex-1 flex-col space-y-6">
        {/* Enhanced Preview perspective toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1.5 shadow-xs">
          <button
            onClick={() => setPreviewMode("assignee")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${previewMode === "assignee"
              ? "bg-primary text-white shadow-xs"
              : "text-muted-foreground hover:text-card-foreground hover:bg-accent/50"
              }`}
            data-name="assignee-view-toggle"
            data-description="Switch to assignee preview perspective"
          >
            <User className="h-4 w-4" />
            Assignee View
          </button>
          <button
            onClick={() => setPreviewMode("manager")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${previewMode === "manager"
              ? "bg-primary text-white shadow-xs"
              : "text-muted-foreground hover:text-card-foreground hover:bg-accent/50"
              }`}
            data-name="manager-view-toggle"
            data-description="Switch to manager preview perspective"
          >
            <UserCog className="h-4 w-4" />
            Manager View
          </button>
        </div>

        {/* Enhanced Preview description */}
        <div className="rounded-xl border border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-4 shadow-xs">
          <p className="text-sm text-primary leading-relaxed">
            {previewMode === "assignee"
              ? `Showing the queue as seen by an individual assignee (e.g., Claims Processor). They see their assigned items and can Start, Complete, and Escalate.${queue.selfAssign.enabled ? " Self-assignment is enabled -- they also see a shared pool of unclaimed items they can pick up, with a capacity limit and optional release." : ""}`
              : `Showing the queue as seen by a manager (e.g., Claims Manager). They see all items across the team with oversight controls including reassignment, bulk escalation, workload distribution, and audit trails.${queue.selfAssign.enabled ? " Self-assignment pool insights show per-user capacity utilization, pool configuration, and recent claim activity. Managers can force-assign pool items." : ""}`}
          </p>
        </div>

        {/* Enhanced Preview content */}
        <div className="flex-1 overflow-y-auto rounded-xl border border-border bg-card shadow-xs">
          <div className="p-8">
            {previewMode === "assignee" ? (
              <PreviewAssignee queue={queue} />
            ) : (
              <PreviewManager queue={queue} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
import { User, Users } from "lucide-react";
import { useViewToggle } from "./hooks/useViewToggle";
import { ManagerWorkqueue } from "./components/workqueue/ManagerWorkqueue";
import { AssigneeWorkqueue } from "./components/workqueue/AssigneeWorkqueue";

export function WorkqueueWidget() {
  const { toggleView, isManagerView, isAssigneeView } = useViewToggle('assignee');
  return (
    <>
      <div className="bg-white border-b">
        <div className="mx-auto px-6 py-4">
          <div className="text-sm text-primary mb-4">
            Showing the queue as seen by a {isManagerView ? 'manager' : 'individual assignee'} (e.g., Claims {isManagerView ? 'Manager' : 'Processor'}).
            They see {isManagerView ? 'all items across the team with oversight controls including reassignment, bulk escalation, workload distribution, and audit trails. Self-assignment pool insights show per-user capacity utilization, pool configuration, and recent claim activity. Managers can force-assign pool items.' : 'their assigned items and can Start, Complete, and Escalate. Self-assignment is enabled --- they also see a shared pool of unclaimed items they can pick up, with a capacity limit and optional release.'}
          </div>

          <div className="flex w-full">
            <button
              onClick={() => toggleView('assignee')}
              className={`flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-l-lg border transition-colors w-full ${isAssigneeView
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              data-name="assignee-view-toggle"
              data-description="Switch to assignee view to see individual work queue"
            >
              <User className="w-4 h-4" />
              Assignee View
            </button>
            <button
              onClick={() => toggleView('manager')}
              className={`flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-r-lg border-t border-r border-b transition-colors w-full ${isManagerView
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              data-name="manager-view-toggle"
              data-description="Switch to manager view to see team dashboard and oversight controls"
            >
              <Users className="w-4 h-4" />
              Manager View
            </button>
          </div>
        </div>
      </div>

      {isManagerView ? <ManagerWorkqueue /> : <AssigneeWorkqueue />}
    </>
  )
}
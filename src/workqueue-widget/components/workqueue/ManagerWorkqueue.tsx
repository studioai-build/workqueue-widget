import { ChevronDown } from 'lucide-react';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { MetricsCards } from '../dashboard/MetricsCards';
import { TeamWorkload } from '../dashboard/TeamWorkload';
import { SelfAssignPoolInsights } from '../dashboard/SelfAssignPoolInsights';
import { WorkqueueTable } from './WorkqueueTable';
import { useWorkqueueData } from '../../hooks/useWorkqueueData';
import { dashboardMetrics, teamMembers, poolActivity } from '../../constants/workqueueData';

export const ManagerWorkqueue = () => {
  const { 
    items, 
    selectedItems, 
    toggleItemSelection, 
    selectAllItems, 
    clearSelection, 
    reassignItem 
  } = useWorkqueueData(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardHeader 
        title="Queue Management Dashboard"
        subtitle="12 total items across 4 team members"
      />
      
      <MetricsCards metrics={dashboardMetrics} />
      
      <TeamWorkload teamMembers={teamMembers} />
      
      <SelfAssignPoolInsights 
        poolActivity={poolActivity}
        poolCount={dashboardMetrics.inPool}
      />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button 
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            data-name="filter-statuses-button"
            data-description="Filter work items by status"
          >
            All Statuses
            <ChevronDown className="w-4 h-4" />
          </button>
          <button 
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            data-name="filter-assignees-button"
            data-description="Filter work items by assignee"
          >
            All Assignees
            <ChevronDown className="w-4 h-4" />
          </button>
          <button 
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            data-name="filter-priorities-button"
            data-description="Filter work items by priority"
          >
            All Priorities
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <WorkqueueTable
        items={items}
        selectedItems={selectedItems}
        onToggleSelection={toggleItemSelection}
        onSelectAll={selectAllItems}
        onClearSelection={clearSelection}
        onReassign={reassignItem}
        teamMembers={teamMembers}
        isAssigneeView={false}
      />
    </div>
  );
};
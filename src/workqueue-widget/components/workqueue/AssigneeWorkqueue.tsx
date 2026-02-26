import { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { WorkqueueTable } from './WorkqueueTable';
import { ProgressBar } from '../ui/ProgressBar';
import { useWorkqueueData } from '../../hooks/useWorkqueueData';
import { teamMembers } from '../../constants/workqueueData';

export const AssigneeWorkqueue = () => {
  const [activeTab, setActiveTab] = useState<'myItems' | 'availablePool'>('myItems');
  
  const { 
    items, 
    selectedItems, 
    metrics,
    toggleItemSelection, 
    selectAllItems, 
    clearSelection, 
    reassignItem,
    claimItem
  } = useWorkqueueData(true);

  const myItems = items.filter(item => item.assignedTo === 'Me' || item.assignedToId === 'current-user');
  const availableItems = items.filter(item => !item.assignedTo);

  const displayItems = activeTab === 'myItems' ? myItems : availableItems;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">My Work Queue</h1>
        <p className="text-sm text-gray-600">3 items assigned to you / 7 available in pool</p>
      </div>

      <div className="flex items-center justify-end mb-4">
        <button 
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          data-name="filter-all-statuses-button"
          data-description="Filter work items by all statuses"
        >
          All Statuses
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
            MY ITEMS
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {metrics.myItems}
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg border p-4">
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
            NEW
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {metrics.newItems}
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg border p-4">
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
            IN PROGRESS
          </div>
          <div className="text-2xl font-bold text-green-600">
            {metrics.inProgressItems}
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg border p-4">
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
            SLA AT RISK
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {metrics.slaAtRiskItems}
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg border p-4">
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
            POOL AVAILABLE
          </div>
          <div className="text-2xl font-bold text-primary">
            {metrics.poolAvailable}
          </div>
          <div className="text-xs text-gray-500">
            3/5 capacity
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-primary" />
          <span className="font-medium text-gray-900">Self-Assign Capacity</span>
          <span className="ml-auto text-sm text-gray-600">3 of 5 slots used</span>
        </div>
        <ProgressBar value={3} max={5} color="primary" />
      </div>

      <div className="mb-6">
        <div className="flex">
          <button
            onClick={() => setActiveTab('myItems')}
            className={`flex-1 px-4 py-3 text-sm font-medium rounded-l-lg border ${
              activeTab === 'myItems'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            } transition-colors`}
            data-name="my-items-tab-button"
            data-description="Switch to view my assigned work items"
          >
            My Items ({myItems.length})
          </button>
          <button
            onClick={() => setActiveTab('availablePool')}
            className={`flex-1 px-4 py-3 text-sm font-medium rounded-r-lg border-t border-r border-b ${
              activeTab === 'availablePool'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            } transition-colors`}
            data-name="available-pool-tab-button"
            data-description="Switch to view available work items in the pool"
          >
            Available Pool ({availableItems.length})
          </button>
        </div>
      </div>

      {activeTab === 'availablePool' && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 text-primary">
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">
              These items are available for you to claim. Click "Claim" to add an item to your work queue.
            </span>
          </div>
        </div>
      )}

      <WorkqueueTable
        items={displayItems}
        selectedItems={selectedItems}
        onToggleSelection={toggleItemSelection}
        onSelectAll={selectAllItems}
        onClearSelection={clearSelection}
        onReassign={reassignItem}
        onClaim={activeTab === 'availablePool' ? claimItem : undefined}
        teamMembers={teamMembers}
        isAssigneeView={true}
      />
    </div>
  );
};
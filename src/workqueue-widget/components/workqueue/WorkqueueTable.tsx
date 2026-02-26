import { useState } from 'react';
import { Eye, UserPlus, RotateCcw, Play, CheckCircle, ArrowUpRight } from 'lucide-react';
import { WorkItem, TeamMember } from '../../types/workqueue';
import { StatusBadge } from '../ui/StatusBadge';
import { PriorityBadge } from '../ui/PriorityBadge';
import { UserAvatar } from '../ui/UserAvatar';
import { ReassignModal } from '../modals/ReassignModal';
import { formatCurrency, getSlaStatusColor, getSlaIcon } from '../../utils/formatters';

interface WorkqueueTableProps {
  items: WorkItem[];
  selectedItems: string[];
  onToggleSelection: (itemId: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onReassign: (itemId: string, assigneeId: string, assigneeName: string) => void;
  onClaim?: (itemId: string) => void;
  teamMembers: TeamMember[];
  isAssigneeView?: boolean;
  showActions?: boolean;
}

export const WorkqueueTable = ({ 
  items, 
  selectedItems, 
  onToggleSelection, 
  onSelectAll, 
  onClearSelection,
  onReassign,
  onClaim,
  teamMembers,
  isAssigneeView = false,
  showActions = true
}: WorkqueueTableProps) => {
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [reassignItemId, setReassignItemId] = useState<string>('');

  const handleReassignClick = (itemId: string) => {
    setReassignItemId(itemId);
    setReassignModalOpen(true);
  };

  const handleReassignConfirm = (assigneeId: string, assigneeName: string, note: string) => {
    onReassign(reassignItemId, assigneeId, assigneeName);
    setReassignModalOpen(false);
    setReassignItemId('');
  };

  const getAssigneeDisplay = (item: WorkItem) => {
    if (!item.assignedTo) {
      return <span className="text-gray-400">Unassigned</span>;
    }
    
    if (isAssigneeView || item.assignedTo === 'Me') {
      return (
        <div className="flex items-center gap-2">
          <UserAvatar initials="SC" name="Me" size="sm" />
          <span className="text-sm font-medium">Me</span>
        </div>
      );
    }

    const member = teamMembers.find(m => m.name === item.assignedTo);
    if (member) {
      return (
        <div className="flex items-center gap-2">
          <UserAvatar 
            initials={member.initials}
            name={member.name}
            color={member.color}
            size="sm"
          />
          <span className="text-sm font-medium">{member.name}</span>
        </div>
      );
    }

    return <span className="text-sm">{item.assignedTo}</span>;
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === items.length && items.length > 0}
                    onChange={selectedItems.length === items.length ? onClearSelection : onSelectAll}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    data-name="select-all-items-checkbox"
                    data-description="Select or deselect all items in the workqueue table"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claim ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claimant Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claim Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Filed Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                {!isAssigneeView && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SLA
                </th>
                {showActions && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => {
                const SlaIcon = getSlaIcon(item.slaStatus);

                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => onToggleSelection(item.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      data-name="select-item-checkbox"
                      data-description={`Select work item ${item.id}`}
                    />
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {item.claimantName}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {formatCurrency(item.claimAmount)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {item.filedDate}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-4">
                    <PriorityBadge priority={item.priority} />
                  </td>
                  {!isAssigneeView && (
                    <td className="px-4 py-4">
                      {getAssigneeDisplay(item)}
                    </td>
                  )}
                  <td className="px-4 py-4">
                    <div className={`flex items-center gap-1 text-sm ${getSlaStatusColor(item.slaStatus)}`}>
                      <SlaIcon className="w-4 h-4" aria-hidden="true" />
                      <span>{item.sla}</span>
                    </div>
                  </td>
                  {showActions && (
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="View"
                          data-name="view-item-button"
                          data-description={`View details for work item ${item.id}`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {isAssigneeView ? (
                          <>
                            {onClaim && !item.assignedTo && (
                              <button 
                                onClick={() => onClaim(item.id)}
                                className="p-1 text-primary hover:text-primary/80 transition-colors"
                                title="Claim"
                                data-name="claim-item-button"
                                data-description={`Claim work item ${item.id}`}
                              >
                                <UserPlus className="w-4 h-4" />
                              </button>
                            )}
                            {item.assignedTo && (
                              <>
                                <button 
                                  className="p-1 text-green-600 hover:text-green-700 transition-colors"
                                  title="Start"
                                  data-name="start-item-button"
                                  data-description={`Start work on item ${item.id}`}
                                >
                                  <Play className="w-4 h-4" />
                                </button>
                                <button 
                                  className="p-1 text-green-600 hover:text-green-700 transition-colors"
                                  title="Done"
                                  data-name="complete-item-button"
                                  data-description={`Mark item ${item.id} as complete`}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button 
                                  className="p-1 text-orange-600 hover:text-orange-700 transition-colors"
                                  title="Release"
                                  data-name="release-item-button"
                                  data-description={`Release item ${item.id} back to the pool`}
                                >
                                  <RotateCcw className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleReassignClick(item.id)}
                              className="p-1 text-primary hover:text-primary/80 transition-colors"
                              title="Reassign"
                              data-name="reassign-item-button"
                              data-description={`Reassign work item ${item.id} to another user`}
                            >
                              <UserPlus className="w-4 h-4" />
                            </button>
                            {!item.assignedTo && (
                              <button 
                                className="p-1 text-primary hover:text-primary/80 transition-colors"
                                title="Force Assign"
                                data-name="force-assign-item-button"
                                data-description={`Force assign work item ${item.id}`}
                              >
                                <ArrowUpRight className="w-4 h-4" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-700">
          Showing {items.length} of {items.length} items
        </div>
      </div>

      <ReassignModal
        isOpen={reassignModalOpen}
        onClose={() => setReassignModalOpen(false)}
        onReassign={handleReassignConfirm}
        teamMembers={teamMembers}
      />
    </>
  );
};

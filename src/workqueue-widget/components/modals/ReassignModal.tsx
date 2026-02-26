import { useState } from 'react';
import { X } from 'lucide-react';
import { TeamMember } from '../../types/workqueue';
import { UserAvatar } from '../ui/UserAvatar';

interface ReassignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReassign: (assigneeId: string, assigneeName: string, note: string) => void;
  teamMembers: TeamMember[];
}

export const ReassignModal = ({ isOpen, onClose, onReassign, teamMembers }: ReassignModalProps) => {
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');
  const [note, setNote] = useState<string>('');

  if (!isOpen) return null;

  const handleReassign = () => {
    if (selectedAssignee) {
      const member = teamMembers.find(m => m.id === selectedAssignee);
      if (member) {
        onReassign(selectedAssignee, member.name, note);
        onClose();
        setSelectedAssignee('');
        setNote('');
      }
    }
  };

  const handleCancel = () => {
    onClose();
    setSelectedAssignee('');
    setNote('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Reassign Work Item</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            data-name="close-reassign-modal-button"
            data-description="Close the reassign work item modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign to
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Eligible users based on queue access roles: Claims Processor, Claims Manager, Senior Adjuster
            </p>
            
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <label key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="assignee"
                    value={member.id}
                    checked={selectedAssignee === member.id}
                    onChange={(e) => setSelectedAssignee(e.target.value)}
                    className="text-primary focus:ring-primary"
                    data-name="assignee-selection-radio"
                    data-description={`Select ${member.name} as the new assignee`}
                  />
                  <UserAvatar 
                    initials={member.initials}
                    name={member.name}
                    color={member.color}
                    size="sm"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.role}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a reason for reassignment..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              rows={3}
              data-name="reassignment-note-textarea"
              data-description="Add an optional note explaining the reason for reassignment"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              data-name="cancel-reassign-button"
              data-description="Cancel the reassignment and close the modal"
            >
              Cancel
            </button>
            <button
              onClick={handleReassign}
              disabled={!selectedAssignee}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              data-name="confirm-reassign-button"
              data-description="Confirm the reassignment to the selected user"
            >
              Reassign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
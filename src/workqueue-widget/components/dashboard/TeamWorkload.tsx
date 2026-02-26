import { Users } from 'lucide-react';
import { TeamMember } from '../../types/workqueue';
import { UserAvatar } from '../ui/UserAvatar';
import { ProgressBar } from '../ui/ProgressBar';

interface TeamWorkloadProps {
  teamMembers: TeamMember[];
}

export const TeamWorkload = ({ teamMembers }: TeamWorkloadProps) => {
  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-gray-600" />
        <h3 className="font-medium text-gray-900">Team Workload</h3>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="text-center">
            <div className='flex justify-between items-center gap-2'>
              <div className='flex items-center gap-2'>
                <div className="flex items-center justify-center mb-2">
                  <UserAvatar
                    initials={member.initials}
                    name={member.name}
                    color={member.color}
                    size="md"
                  />
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {member.name}
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900 mb-2">
                {member.workload}
              </div>
            </div>
            <div className="w-full">
              <ProgressBar
                value={member.workload}
                max={member.capacity}
                color={member.color}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
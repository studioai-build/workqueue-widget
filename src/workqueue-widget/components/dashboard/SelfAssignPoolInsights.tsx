import { Info, Clock } from 'lucide-react';
import { PoolActivity } from '../../types/workqueue';

interface SelfAssignPoolInsightsProps {
  poolActivity: PoolActivity[];
  poolCount: number;
}

export const SelfAssignPoolInsights = ({ poolActivity, poolCount }: SelfAssignPoolInsightsProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-gray-600" />
          <h3 className="font-medium text-gray-900">Self-Assign Pool Insights</h3>
          <span className="ml-auto text-xs text-gray-500">{poolCount} items in pool</span>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                POOL CONFIGURATION
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Max per user</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Allow release</span>
                  <span className="font-medium">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Justification</span>
                  <span className="font-medium">Optional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visibility</span>
                  <span className="font-medium">All eligible</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                CLAIM CAPACITY BY USER
              </div>
              <div className="space-y-2">
                {['Sarah Chen', 'Marcus Johnson', 'Ahmed Hassan', 'Priya Sharma'].map((name, index) => (
                  <div key={name} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-gray-700 flex-1">{name}</span>
                    <span className="text-sm font-medium">{index < 2 ? '3/5' : '2/5'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-gray-600" />
          <h3 className="font-medium text-gray-900">Recent Pool Activity</h3>
        </div>
        
        <div className="space-y-3">
          {poolActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                activity.action === 'claimed' ? 'bg-green-500' : 
                activity.action === 'released' ? 'bg-orange-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-gray-600 ml-1">
                    {activity.action} {activity.claimId}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {activity.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
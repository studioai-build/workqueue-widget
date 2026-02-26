import { RefreshCw, FileText } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          data-name="refresh-dashboard-button"
          data-description="Refresh the dashboard data and metrics"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
        <button 
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          data-name="reports-button"
          data-description="Generate and view workqueue reports"
        >
          <FileText className="w-4 h-4" />
          Reports
        </button>
      </div>
    </div>
  );
};
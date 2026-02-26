import { DashboardMetrics } from '../../types/workqueue';

interface MetricsCardsProps {
  metrics: DashboardMetrics;
}

export const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  const cards = [
    {
      title: 'TOTAL ITEMS',
      value: metrics.totalItems,
      change: metrics.totalChange,
      color: 'bg-gray-50'
    },
    {
      title: 'IN POOL',
      value: metrics.inPool,
      change: metrics.poolChange,
      color: 'bg-blue-50'
    },
    {
      title: 'ESCALATED',
      value: metrics.escalated,
      change: metrics.escalatedChange,
      color: 'bg-red-50'
    },
    {
      title: 'SLA AT RISK',
      value: metrics.slaAtRisk,
      change: metrics.riskChange,
      color: 'bg-orange-50'
    },
    {
      title: 'SLA BREACHED',
      value: metrics.slaBreached,
      change: metrics.breachedChange,
      color: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={`p-4 rounded-lg border ${card.color}`}>
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
            {card.title}
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {card.value}
          </div>
          <div className="text-xs text-gray-500">
            {card.change}
          </div>
        </div>
      ))}
    </div>
  );
};
import { WorkItem, TeamMember, PoolActivity, DashboardMetrics } from '../types/workqueue';

export const dashboardMetrics: DashboardMetrics = {
  totalItems: 12,
  inPool: 2,
  escalated: 2,
  slaAtRisk: 2,
  slaBreached: 2,
  totalChange: '12% vs last week',
  poolChange: 'self-assign pool',
  escalatedChange: 'requires review',
  riskChange: '4h remaining',
  breachedChange: 'immediate action'
};

export const teamMembers: TeamMember[] = [
  {
    id: 'sc',
    name: 'Sarah Chen',
    initials: 'SC',
    role: 'Claims Processor',
    workload: 3,
    capacity: 5,
    color: 'orange'
  },
  {
    id: 'mj',
    name: 'Marcus Johnson',
    initials: 'MJ',
    role: 'Claims Processor',
    workload: 3,
    capacity: 5,
    color: 'blue'
  },
  {
    id: 'ah',
    name: 'Ahmed Hassan',
    initials: 'AH',
    role: 'Claims Processor',
    workload: 2,
    capacity: 5,
    color: 'purple'
  },
  {
    id: 'ps',
    name: 'Priya Sharma',
    initials: 'PS',
    role: 'Claims Processor',
    workload: 2,
    capacity: 5,
    color: 'purple'
  },
  {
    id: 'dp',
    name: 'Diana Patel',
    initials: 'DP',
    role: 'Claims Manager',
    workload: 0,
    capacity: 5,
    color: 'green'
  }
];

export const poolActivity: PoolActivity[] = [
  {
    id: '1',
    user: 'Sarah Chen',
    action: 'claimed',
    claimId: 'CLM-2024003',
    timestamp: '12m ago'
  },
  {
    id: '2',
    user: 'Marcus Johnson',
    action: 'released',
    claimId: 'CLM-2024008',
    timestamp: '28m ago'
  },
  {
    id: '3',
    user: 'Ahmed Hassan',
    action: 'claimed',
    claimId: 'CLM-2024005',
    timestamp: '1h ago'
  },
  {
    id: '4',
    user: 'Diana Patel (Manager)',
    action: 'force-assigned',
    claimId: 'CLM-2024010',
    timestamp: '2h ago'
  }
];

export const workItems: WorkItem[] = [
  {
    id: 'CLM-2024001',
    claimantName: 'John Rivera',
    claimAmount: 84837,
    filedDate: '2/17/2026',
    status: 'New',
    priority: 'Low',
    assignedTo: 'Sarah Chen',
    assignedToId: 'sc',
    sla: '20h left',
    slaStatus: 'normal',
    timeLeft: '10h left'
  },
  {
    id: 'CLM-2024002',
    claimantName: 'Maria Santos',
    claimAmount: 38149,
    filedDate: '2/19/2026',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Marcus Johnson',
    assignedToId: 'mj',
    sla: '2h left',
    slaStatus: 'warning',
    timeLeft: '2h left'
  },
  {
    id: 'CLM-2024003',
    claimantName: 'David Lee',
    claimAmount: 84113,
    filedDate: '2/18/2026',
    status: 'Pending Info',
    priority: 'High',
    assignedTo: 'Ahmed Hassan',
    assignedToId: 'ah',
    sla: 'Breached',
    slaStatus: 'breached'
  },
  {
    id: 'CLM-2024004',
    claimantName: 'Angela Morrison',
    claimAmount: 74924,
    filedDate: '2/20/2026',
    status: 'Under Review',
    priority: 'Critical',
    assignedTo: 'Priya Sharma',
    assignedToId: 'ps',
    sla: '16h left',
    slaStatus: 'normal',
    timeLeft: '10h left'
  },
  {
    id: 'CLM-2024005',
    claimantName: 'Thomas Wu',
    claimAmount: 55396,
    filedDate: '2/18/2026',
    status: 'Escalated',
    priority: 'Low',
    sla: '20h left',
    slaStatus: 'normal'
  },
  {
    id: 'CLM-2024006',
    claimantName: 'Rachel Green',
    claimAmount: 55739,
    filedDate: '2/18/2026',
    status: 'New',
    priority: 'Medium',
    assignedTo: 'Sarah Chen',
    assignedToId: 'sc',
    sla: '13h left',
    slaStatus: 'normal'
  },
  {
    id: 'CLM-2024007',
    claimantName: 'Kevin Park',
    claimAmount: 56171,
    filedDate: '2/17/2026',
    status: 'In Progress',
    priority: 'High',
    assignedTo: 'Marcus Johnson',
    assignedToId: 'mj',
    sla: '5h left',
    slaStatus: 'warning'
  },
  {
    id: 'CLM-2024008',
    claimantName: 'Laura Chen',
    claimAmount: 65912,
    filedDate: '2/18/2026',
    status: 'Pending Info',
    priority: 'Critical',
    assignedTo: 'Ahmed Hassan',
    assignedToId: 'ah',
    sla: '0h left',
    slaStatus: 'breached'
  },
  {
    id: 'CLM-2024009',
    claimantName: 'Michael Ford',
    claimAmount: 30268,
    filedDate: '2/23/2026',
    status: 'Under Review',
    priority: 'Low',
    assignedTo: 'Priya Sharma',
    assignedToId: 'ps',
    sla: '19h left',
    slaStatus: 'normal'
  },
  {
    id: 'CLM-2024010',
    claimantName: 'Jessica Adams',
    claimAmount: 76572,
    filedDate: '2/17/2026',
    status: 'Escalated',
    priority: 'Medium',
    sla: 'Breached',
    slaStatus: 'breached'
  },
  {
    id: 'CLM-2024011',
    claimantName: 'Ryan Mitchell',
    claimAmount: 11573,
    filedDate: '2/18/2026',
    status: 'New',
    priority: 'High',
    assignedTo: 'Sarah Chen',
    assignedToId: 'sc',
    sla: '7h left',
    slaStatus: 'warning'
  },
  {
    id: 'CLM-2024012',
    claimantName: 'Karen Wright',
    claimAmount: 37184,
    filedDate: '2/24/2026',
    status: 'In Progress',
    priority: 'Critical',
    assignedTo: 'Marcus Johnson',
    assignedToId: 'mj',
    sla: '9h left',
    slaStatus: 'warning'
  }
];

export const assigneeWorkItems: WorkItem[] = [
  {
    id: 'CLM-2024004',
    claimantName: 'Angela Morrison',
    claimAmount: 68485,
    filedDate: '2/23/2026',
    status: 'Under Review',
    priority: 'Critical',
    sla: '10h left',
    slaStatus: 'normal'
  },
  {
    id: 'CLM-2024005',
    claimantName: 'Thomas Wu',
    claimAmount: 86974,
    filedDate: '2/26/2026',
    status: 'New',
    priority: 'Low',
    sla: 'Breached',
    slaStatus: 'breached'
  },
  {
    id: 'CLM-2024006',
    claimantName: 'Rachel Green',
    claimAmount: 68530,
    filedDate: '2/22/2026',
    status: 'In Progress',
    priority: 'Medium',
    sla: '10h left',
    slaStatus: 'normal'
  },
  {
    id: 'CLM-2024007',
    claimantName: 'Kevin Park',
    claimAmount: 17561,
    filedDate: '2/21/2026',
    status: 'Pending Info',
    priority: 'High',
    sla: '13h left',
    slaStatus: 'normal'
  },
  {
    id: 'CLM-2024008',
    claimantName: 'Laura Chen',
    claimAmount: 42893,
    filedDate: '2/20/2026',
    status: 'Under Review',
    priority: 'Critical',
    sla: 'Breached',
    slaStatus: 'breached'
  },
  {
    id: 'CLM-2024009',
    claimantName: 'Michael Ford',
    claimAmount: 5699,
    filedDate: '2/22/2026',
    status: 'New',
    priority: 'Low',
    sla: '13h left',
    slaStatus: 'normal'
  },
  {
    id: 'CLM-2024010',
    claimantName: 'Jessica Adams',
    claimAmount: 13689,
    filedDate: '2/25/2026',
    status: 'In Progress',
    priority: 'Medium',
    sla: '7h left',
    slaStatus: 'warning'
  }
];
export interface WorkItem {
  id: string;
  claimantName: string;
  claimAmount: number;
  filedDate: string;
  status: 'New' | 'In Progress' | 'Pending Info' | 'Under Review' | 'Escalated';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo?: string;
  assignedToId?: string;
  sla: string;
  slaStatus: 'normal' | 'warning' | 'breached';
  timeLeft?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  workload: number;
  capacity: number;
  color: string;
}

export interface PoolActivity {
  id: string;
  user: string;
  action: 'claimed' | 'released' | 'force-assigned';
  claimId: string;
  timestamp: string;
}

export interface DashboardMetrics {
  totalItems: number;
  inPool: number;
  escalated: number;
  slaAtRisk: number;
  slaBreached: number;
  totalChange: string;
  poolChange: string;
  escalatedChange: string;
  riskChange: string;
  breachedChange: string;
}

export type ViewType = 'manager' | 'assignee';
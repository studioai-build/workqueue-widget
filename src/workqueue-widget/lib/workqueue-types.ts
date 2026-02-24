// ============================================================
// Workqueue Configuration Types
// ============================================================

export interface IAMRole {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

export interface IAMUser {
  id: string
  name: string
  email: string
  initials: string
  roles: string[] // role IDs
}

export type AssignmentMethod = "rule-based" | "trigger-based" | "manual" | "round-robin" | "least-loaded" | "self-assign"

export type ColumnType = "text" | "number" | "date" | "status" | "priority" | "user" | "currency" | "link"

export type QueuePriority = "low" | "medium" | "high" | "critical"

export type QueueStatus = "draft" | "active" | "paused" | "archived"

export interface QueueColumn {
  id: string
  name: string
  type: ColumnType
  required: boolean
  width?: number
  sortable: boolean
  filterable: boolean
}

export interface AssignmentRule {
  id: string
  name: string
  description: string
  method: AssignmentMethod
  // For rule-based
  condition?: string
  // Target role or specific users
  targetRoleIds: string[]
  targetUserIds: string[]
  // Fallback if no match
  fallbackMethod?: AssignmentMethod
  priority: number // ordering of rules
  enabled: boolean
}

export interface TriggerConfig {
  id: string
  name: string
  source: "workflow" | "api" | "schedule" | "event"
  workflowId?: string
  workflowName?: string
  event?: string
  schedule?: string
  condition: string
  enabled: boolean
}

export interface SLAConfig {
  enabled: boolean
  responseTimeHours: number
  resolutionTimeHours: number
  escalationRoleId: string
  autoEscalate: boolean
  warningThresholdPercent: number
}

export interface SelfAssignConfig {
  enabled: boolean
  maxItemsPerUser: number // 0 = unlimited
  poolVisibility: "all-eligible" | "role-filtered" // who sees the pool
  allowRelease: boolean // can a user release a claimed item back to pool
  requireJustification: boolean // must the user provide a reason when claiming
  eligibleRoleIds: string[] // which roles can self-assign
}

export interface NotificationConfig {
  onAssignment: boolean
  onEscalation: boolean
  onSLAWarning: boolean
  onSLABreach: boolean
  onStatusChange: boolean
  channels: ("email" | "in-app" | "webhook")[]
}

export interface WorkqueueDefinition {
  id: string
  name: string
  description: string
  status: QueueStatus
  defaultPriority: QueuePriority
  columns: QueueColumn[]
  assignmentRules: AssignmentRule[]
  triggers: TriggerConfig[]
  sla: SLAConfig
  selfAssign: SelfAssignConfig
  notifications: NotificationConfig
  accessRoleIds: string[]
  createdAt: string
  updatedAt: string
}

// ============================================================
// Mock IAM Data
// ============================================================

export const iamRoles: IAMRole[] = [
  {
    id: "role-1",
    name: "Claims Processor",
    description: "Handles incoming insurance claims and initial assessment",
    permissions: ["claims.read", "claims.write", "claims.process"],
    userCount: 3,
  },
  {
    id: "role-2",
    name: "Claims Manager",
    description: "Supervises claims processing and handles escalations",
    permissions: ["claims.read", "claims.write", "claims.approve", "claims.escalate", "reports.read"],
    userCount: 2,
  },
  {
    id: "role-3",
    name: "Underwriter",
    description: "Evaluates risk and approves/denies coverage",
    permissions: ["underwriting.read", "underwriting.write", "underwriting.approve"],
    userCount: 2,
  },
  {
    id: "role-4",
    name: "Compliance Officer",
    description: "Monitors regulatory compliance across operations",
    permissions: ["compliance.read", "compliance.write", "audit.read", "reports.read"],
    userCount: 2,
  },
  {
    id: "role-5",
    name: "Customer Service Rep",
    description: "Front-line customer interaction and case intake",
    permissions: ["cases.read", "cases.write", "customers.read"],
    userCount: 2,
  },
  {
    id: "role-6",
    name: "Senior Adjuster",
    description: "Experienced claim adjusters handling complex cases",
    permissions: ["claims.read", "claims.write", "claims.approve", "claims.reassign"],
    userCount: 1,
  },
]

export const iamUsers: IAMUser[] = [
  { id: "user-1", name: "Sarah Chen", email: "sarah.chen@company.com", initials: "SC", roles: ["role-1"] },
  { id: "user-2", name: "Marcus Johnson", email: "marcus.j@company.com", initials: "MJ", roles: ["role-1", "role-5"] },
  { id: "user-3", name: "Diana Patel", email: "diana.p@company.com", initials: "DP", roles: ["role-2"] },
  { id: "user-4", name: "Robert Kim", email: "robert.k@company.com", initials: "RK", roles: ["role-3"] },
  { id: "user-5", name: "Elena Torres", email: "elena.t@company.com", initials: "ET", roles: ["role-4"] },
  { id: "user-6", name: "James Wilson", email: "james.w@company.com", initials: "JW", roles: ["role-2", "role-4"] },
  { id: "user-7", name: "Lisa Wang", email: "lisa.w@company.com", initials: "LW", roles: ["role-5"] },
  { id: "user-8", name: "Ahmed Hassan", email: "ahmed.h@company.com", initials: "AH", roles: ["role-1", "role-3"] },
  { id: "user-9", name: "Priya Sharma", email: "priya.s@company.com", initials: "PS", roles: ["role-6"] },
]

// Pre-built queue for demo
export const sampleQueue: WorkqueueDefinition = {
  id: "queue-demo-1",
  name: "New Claims Intake",
  description: "Incoming insurance claims requiring initial assessment and triage",
  status: "active",
  defaultPriority: "medium",
  columns: [
    { id: "col-1", name: "Claim ID", type: "text", required: true, sortable: true, filterable: true },
    { id: "col-2", name: "Claimant Name", type: "text", required: true, sortable: true, filterable: true },
    { id: "col-3", name: "Claim Amount", type: "currency", required: true, sortable: true, filterable: true },
    { id: "col-4", name: "Filed Date", type: "date", required: true, sortable: true, filterable: true },
    { id: "col-5", name: "Status", type: "status", required: true, sortable: true, filterable: true },
    { id: "col-6", name: "Priority", type: "priority", required: true, sortable: true, filterable: true },
    { id: "col-7", name: "Assigned To", type: "user", required: false, sortable: true, filterable: true },
  ],
  assignmentRules: [
    {
      id: "rule-1",
      name: "High-value claims to Senior Adjuster",
      description: "Claims over $50,000 are routed to senior adjusters",
      method: "rule-based",
      condition: "claim_amount > 50000",
      targetRoleIds: ["role-6"],
      targetUserIds: [],
      priority: 1,
      enabled: true,
    },
    {
      id: "rule-2",
      name: "Standard claims round-robin",
      description: "Distribute standard claims evenly across processors",
      method: "round-robin",
      targetRoleIds: ["role-1"],
      targetUserIds: [],
      fallbackMethod: "least-loaded",
      priority: 2,
      enabled: true,
    },
  ],
  triggers: [
    {
      id: "trig-1",
      name: "New Claim Workflow",
      source: "workflow",
      workflowId: "wf-claim-intake",
      workflowName: "Claim Intake Pipeline",
      condition: "workflow.status === 'completed'",
      enabled: true,
    },
    {
      id: "trig-2",
      name: "External API Submission",
      source: "api",
      event: "POST /api/claims",
      condition: "payload.source === 'partner_portal'",
      enabled: true,
    },
  ],
  sla: {
    enabled: true,
    responseTimeHours: 4,
    resolutionTimeHours: 24,
    escalationRoleId: "role-2",
    autoEscalate: true,
    warningThresholdPercent: 75,
  },
  selfAssign: {
    enabled: true,
    maxItemsPerUser: 5,
    poolVisibility: "all-eligible",
    allowRelease: true,
    requireJustification: false,
    eligibleRoleIds: ["role-1", "role-6"],
  },
  notifications: {
    onAssignment: true,
    onEscalation: true,
    onSLAWarning: true,
    onSLABreach: true,
    onStatusChange: false,
    channels: ["email", "in-app"],
  },
  accessRoleIds: ["role-1", "role-2", "role-6"],
  createdAt: "2026-01-15T10:00:00Z",
  updatedAt: "2026-02-08T14:30:00Z",
}

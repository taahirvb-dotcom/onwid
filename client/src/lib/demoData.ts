// CONDUCT Platform - Demo/Seed Data
// Realistic enterprise project management data for demonstration

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  department: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'on-hold' | 'completed' | 'at-risk';
  phase: string;
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  manager: string;
  team: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  methodology: 'agile' | 'waterfall' | 'hybrid';
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: string;
  tags: string[];
  phase: string;
}

export interface Risk {
  id: string;
  projectId: string;
  title: string;
  description: string;
  probability: number;
  impact: number;
  status: 'identified' | 'mitigating' | 'resolved' | 'accepted';
  mitigation: string;
  owner: string;
  category: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  dueDate: string;
  status: 'upcoming' | 'completed' | 'overdue';
  phase: string;
}

export const users: User[] = [
  { id: 'u1', name: 'Sarah Chen', email: 'sarah.chen@conduct.io', role: 'Super Admin', avatar: 'SC', department: 'Executive' },
  { id: 'u2', name: 'Marcus Johnson', email: 'marcus.j@conduct.io', role: 'PMO Lead', avatar: 'MJ', department: 'PMO' },
  { id: 'u3', name: 'Elena Rodriguez', email: 'elena.r@conduct.io', role: 'Project Manager', avatar: 'ER', department: 'Engineering' },
  { id: 'u4', name: 'David Park', email: 'david.p@conduct.io', role: 'Scrum Master', avatar: 'DP', department: 'Engineering' },
  { id: 'u5', name: 'Aisha Patel', email: 'aisha.p@conduct.io', role: 'Product Owner', avatar: 'AP', department: 'Product' },
  { id: 'u6', name: 'James Wilson', email: 'james.w@conduct.io', role: 'Team Member', avatar: 'JW', department: 'Engineering' },
  { id: 'u7', name: 'Lisa Thompson', email: 'lisa.t@conduct.io', role: 'Team Member', avatar: 'LT', department: 'Design' },
  { id: 'u8', name: 'Robert Kim', email: 'robert.k@conduct.io', role: 'Stakeholder', avatar: 'RK', department: 'Finance' },
  { id: 'u9', name: 'Maria Garcia', email: 'maria.g@conduct.io', role: 'Client Viewer', avatar: 'MG', department: 'External' },
  { id: 'u10', name: 'Alex Turner', email: 'alex.t@conduct.io', role: 'Organization Admin', avatar: 'AT', department: 'Operations' },
];

export const roles = [
  'Super Admin',
  'Organization Admin',
  'PMO Lead',
  'Project Manager',
  'Scrum Master',
  'Product Owner',
  'Team Member',
  'Stakeholder',
  'Client Viewer',
];

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Enterprise CRM Migration',
    description: 'Complete migration of legacy CRM system to cloud-native architecture with AI-powered analytics integration.',
    status: 'active',
    phase: 'Drive Execution',
    progress: 68,
    budget: 2400000,
    spent: 1632000,
    startDate: '2025-01-15',
    endDate: '2025-09-30',
    manager: 'u3',
    team: ['u3', 'u4', 'u6', 'u7'],
    priority: 'critical',
    methodology: 'agile',
  },
  {
    id: 'p2',
    name: 'Global Supply Chain Platform',
    description: 'Build next-generation supply chain visibility platform with real-time tracking and predictive analytics.',
    status: 'active',
    phase: 'Navigate Risks',
    progress: 42,
    budget: 5800000,
    spent: 2436000,
    startDate: '2025-03-01',
    endDate: '2026-02-28',
    manager: 'u2',
    team: ['u2', 'u5', 'u6', 'u7'],
    priority: 'high',
    methodology: 'hybrid',
  },
  {
    id: 'p3',
    name: 'Mobile Banking App v3.0',
    description: 'Major version upgrade with biometric authentication, AI chatbot, and real-time transaction monitoring.',
    status: 'at-risk',
    phase: 'Control Quality',
    progress: 82,
    budget: 1800000,
    spent: 1620000,
    startDate: '2024-11-01',
    endDate: '2025-07-15',
    manager: 'u3',
    team: ['u3', 'u4', 'u6'],
    priority: 'critical',
    methodology: 'agile',
  },
  {
    id: 'p4',
    name: 'Data Warehouse Modernization',
    description: 'Migrate from on-premise data warehouse to cloud-based lakehouse architecture with real-time streaming.',
    status: 'active',
    phase: 'Organize Resources',
    progress: 25,
    budget: 3200000,
    spent: 800000,
    startDate: '2025-04-01',
    endDate: '2026-01-31',
    manager: 'u2',
    team: ['u2', 'u6', 'u7'],
    priority: 'high',
    methodology: 'waterfall',
  },
  {
    id: 'p5',
    name: 'Customer Experience Portal',
    description: 'Self-service customer portal with knowledge base, ticket management, and community forums.',
    status: 'completed',
    phase: 'Track Progress',
    progress: 100,
    budget: 950000,
    spent: 912000,
    startDate: '2024-08-01',
    endDate: '2025-03-31',
    manager: 'u3',
    team: ['u3', 'u5', 'u7'],
    priority: 'medium',
    methodology: 'agile',
  },
  {
    id: 'p6',
    name: 'AI-Powered HR Analytics',
    description: 'Implement machine learning models for employee retention prediction, performance analytics, and workforce planning.',
    status: 'on-hold',
    phase: 'Clarify Objectives',
    progress: 12,
    budget: 1500000,
    spent: 180000,
    startDate: '2025-05-01',
    endDate: '2025-12-31',
    manager: 'u2',
    team: ['u2', 'u5'],
    priority: 'medium',
    methodology: 'hybrid',
  },
];

export const tasks: Task[] = [
  // Project 1 tasks
  { id: 't1', projectId: 'p1', title: 'Design API gateway architecture', description: 'Define microservices communication patterns', status: 'done', priority: 'critical', assignee: 'u6', dueDate: '2025-04-15', tags: ['architecture', 'backend'], phase: 'Drive Execution' },
  { id: 't2', projectId: 'p1', title: 'Implement user authentication module', description: 'OAuth 2.0 + SAML integration', status: 'done', priority: 'high', assignee: 'u6', dueDate: '2025-04-30', tags: ['security', 'backend'], phase: 'Drive Execution' },
  { id: 't3', projectId: 'p1', title: 'Build contact management UI', description: 'React components for contact CRUD operations', status: 'in-progress', priority: 'high', assignee: 'u7', dueDate: '2025-05-20', tags: ['frontend', 'ui'], phase: 'Drive Execution' },
  { id: 't4', projectId: 'p1', title: 'Data migration scripts', description: 'ETL pipeline for legacy data transformation', status: 'in-progress', priority: 'critical', assignee: 'u6', dueDate: '2025-05-25', tags: ['data', 'backend'], phase: 'Drive Execution' },
  { id: 't5', projectId: 'p1', title: 'Integration testing suite', description: 'End-to-end test coverage for API endpoints', status: 'todo', priority: 'high', assignee: 'u4', dueDate: '2025-06-10', tags: ['testing', 'qa'], phase: 'Control Quality' },
  { id: 't6', projectId: 'p1', title: 'Performance optimization', description: 'Database query optimization and caching strategy', status: 'todo', priority: 'medium', assignee: 'u6', dueDate: '2025-06-20', tags: ['performance', 'backend'], phase: 'Drive Execution' },
  { id: 't7', projectId: 'p1', title: 'Dashboard analytics widgets', description: 'Real-time metrics and KPI visualization', status: 'review', priority: 'medium', assignee: 'u7', dueDate: '2025-05-18', tags: ['frontend', 'analytics'], phase: 'Drive Execution' },
  { id: 't8', projectId: 'p1', title: 'Mobile responsive layouts', description: 'Ensure all views work on tablet and mobile', status: 'todo', priority: 'medium', assignee: 'u7', dueDate: '2025-06-30', tags: ['frontend', 'responsive'], phase: 'Drive Execution' },
  // Project 2 tasks
  { id: 't9', projectId: 'p2', title: 'Vendor risk assessment', description: 'Evaluate third-party logistics provider risks', status: 'in-progress', priority: 'high', assignee: 'u5', dueDate: '2025-05-30', tags: ['risk', 'vendor'], phase: 'Navigate Risks' },
  { id: 't10', projectId: 'p2', title: 'IoT sensor integration spec', description: 'Define protocols for warehouse sensor data', status: 'review', priority: 'high', assignee: 'u6', dueDate: '2025-05-25', tags: ['iot', 'architecture'], phase: 'Navigate Risks' },
  { id: 't11', projectId: 'p2', title: 'Supply chain data model', description: 'Design graph database schema for supply chain', status: 'done', priority: 'critical', assignee: 'u6', dueDate: '2025-05-10', tags: ['data', 'architecture'], phase: 'Organize Resources' },
  { id: 't12', projectId: 'p2', title: 'Compliance framework mapping', description: 'Map regulatory requirements across regions', status: 'in-progress', priority: 'medium', assignee: 'u5', dueDate: '2025-06-15', tags: ['compliance', 'legal'], phase: 'Navigate Risks' },
  // Project 3 tasks
  { id: 't13', projectId: 'p3', title: 'Biometric auth UAT', description: 'User acceptance testing for fingerprint/face ID', status: 'in-progress', priority: 'critical', assignee: 'u4', dueDate: '2025-05-22', tags: ['testing', 'security'], phase: 'Control Quality' },
  { id: 't14', projectId: 'p3', title: 'Load testing - 10K concurrent', description: 'Verify system handles peak transaction load', status: 'todo', priority: 'critical', assignee: 'u6', dueDate: '2025-05-28', tags: ['testing', 'performance'], phase: 'Control Quality' },
  { id: 't15', projectId: 'p3', title: 'Security penetration testing', description: 'Third-party security audit and pen testing', status: 'in-progress', priority: 'critical', assignee: 'u4', dueDate: '2025-06-01', tags: ['security', 'testing'], phase: 'Control Quality' },
  { id: 't16', projectId: 'p3', title: 'App Store submission prep', description: 'Screenshots, descriptions, compliance docs', status: 'todo', priority: 'high', assignee: 'u7', dueDate: '2025-06-15', tags: ['release', 'marketing'], phase: 'Track Progress' },
];

export const risks: Risk[] = [
  { id: 'r1', projectId: 'p1', title: 'Data loss during migration', description: 'Risk of data corruption or loss during ETL process', probability: 0.3, impact: 0.9, status: 'mitigating', mitigation: 'Implement incremental migration with rollback capability and daily backups', owner: 'u6', category: 'Technical' },
  { id: 'r2', projectId: 'p1', title: 'Vendor API deprecation', description: 'Third-party CRM vendor may deprecate critical APIs', probability: 0.2, impact: 0.7, status: 'identified', mitigation: 'Build abstraction layer and maintain alternative vendor contacts', owner: 'u3', category: 'External' },
  { id: 'r3', projectId: 'p2', title: 'Regulatory compliance changes', description: 'New trade regulations may require architecture changes', probability: 0.4, impact: 0.8, status: 'mitigating', mitigation: 'Modular compliance engine with configurable rule sets', owner: 'u5', category: 'Compliance' },
  { id: 'r4', projectId: 'p2', title: 'IoT sensor reliability', description: 'Warehouse sensors may have connectivity issues', probability: 0.5, impact: 0.6, status: 'identified', mitigation: 'Implement offline buffering and redundant communication paths', owner: 'u6', category: 'Technical' },
  { id: 'r5', projectId: 'p3', title: 'App store rejection', description: 'Apple/Google may reject due to new privacy policies', probability: 0.25, impact: 0.9, status: 'mitigating', mitigation: 'Pre-submission review with Apple/Google developer relations', owner: 'u3', category: 'External' },
  { id: 'r6', projectId: 'p3', title: 'Performance degradation under load', description: 'Transaction processing may slow under peak load', probability: 0.35, impact: 0.8, status: 'identified', mitigation: 'Auto-scaling infrastructure and query optimization', owner: 'u6', category: 'Technical' },
  { id: 'r7', projectId: 'p4', title: 'Skill gap in cloud technologies', description: 'Team lacks experience with lakehouse architecture', probability: 0.6, impact: 0.5, status: 'mitigating', mitigation: 'Training program and external consultant engagement', owner: 'u2', category: 'Resource' },
  { id: 'r8', projectId: 'p1', title: 'Scope creep from stakeholders', description: 'Additional feature requests threatening timeline', probability: 0.7, impact: 0.6, status: 'accepted', mitigation: 'Strict change control process and backlog prioritization', owner: 'u3', category: 'Management' },
];

export const milestones: Milestone[] = [
  { id: 'm1', projectId: 'p1', title: 'API Gateway Go-Live', dueDate: '2025-05-30', status: 'upcoming', phase: 'Drive Execution' },
  { id: 'm2', projectId: 'p1', title: 'Data Migration Complete', dueDate: '2025-06-15', status: 'upcoming', phase: 'Drive Execution' },
  { id: 'm3', projectId: 'p1', title: 'UAT Sign-off', dueDate: '2025-07-31', status: 'upcoming', phase: 'Control Quality' },
  { id: 'm4', projectId: 'p2', title: 'Architecture Review', dueDate: '2025-06-01', status: 'upcoming', phase: 'Navigate Risks' },
  { id: 'm5', projectId: 'p2', title: 'MVP Release', dueDate: '2025-09-30', status: 'upcoming', phase: 'Drive Execution' },
  { id: 'm6', projectId: 'p3', title: 'Security Audit Complete', dueDate: '2025-06-01', status: 'upcoming', phase: 'Control Quality' },
  { id: 'm7', projectId: 'p3', title: 'App Store Launch', dueDate: '2025-07-15', status: 'upcoming', phase: 'Track Progress' },
  { id: 'm8', projectId: 'p5', title: 'Portal Launch', dueDate: '2025-03-31', status: 'completed', phase: 'Track Progress' },
];

export const conductPhases = [
  { key: 'clarify', label: 'Clarify Objectives', letter: 'C', color: '#6366F1', description: 'Define and align project goals' },
  { key: 'organize', label: 'Organize Resources', letter: 'O', color: '#8B5CF6', description: 'Allocate resources efficiently' },
  { key: 'navigate', label: 'Navigate Risks', letter: 'N', color: '#3B82F6', description: 'Identify and mitigate risks' },
  { key: 'drive', label: 'Drive Execution', letter: 'D', color: '#06B6D4', description: 'Execute tasks on time' },
  { key: 'understand', label: 'Understand Feedback', letter: 'U', color: '#10B981', description: 'Collect and act on feedback' },
  { key: 'control', label: 'Control Quality', letter: 'C', color: '#F59E0B', description: 'Ensure quality standards' },
  { key: 'track', label: 'Track Progress', letter: 'T', color: '#EF4444', description: 'Monitor performance' },
];

export const recentActivity = [
  { id: 'a1', user: 'Elena Rodriguez', action: 'completed task', target: 'API Gateway Architecture Review', time: '2 hours ago', type: 'task' },
  { id: 'a2', user: 'David Park', action: 'flagged risk', target: 'Performance degradation under load', time: '3 hours ago', type: 'risk' },
  { id: 'a3', user: 'James Wilson', action: 'pushed code to', target: 'feature/auth-module', time: '4 hours ago', type: 'code' },
  { id: 'a4', user: 'Lisa Thompson', action: 'uploaded design for', target: 'Dashboard Analytics Widgets', time: '5 hours ago', type: 'design' },
  { id: 'a5', user: 'Aisha Patel', action: 'approved milestone', target: 'Supply Chain Data Model', time: '6 hours ago', type: 'milestone' },
  { id: 'a6', user: 'Marcus Johnson', action: 'updated budget for', target: 'Global Supply Chain Platform', time: '8 hours ago', type: 'budget' },
  { id: 'a7', user: 'Sarah Chen', action: 'created project', target: 'AI-Powered HR Analytics', time: '1 day ago', type: 'project' },
  { id: 'a8', user: 'Robert Kim', action: 'reviewed report', target: 'Q2 Financial Summary', time: '1 day ago', type: 'report' },
];

export const kpiData = {
  totalProjects: 6,
  activeProjects: 4,
  completedProjects: 1,
  atRiskProjects: 1,
  totalBudget: 15650000,
  totalSpent: 7580000,
  avgProgress: 55,
  onTimeDelivery: 87,
  teamUtilization: 82,
  risksMitigated: 72,
  tasksCompleted: 156,
  tasksTotal: 234,
};

export const budgetByMonth = [
  { month: 'Jan', planned: 800000, actual: 750000 },
  { month: 'Feb', planned: 1200000, actual: 1180000 },
  { month: 'Mar', planned: 1500000, actual: 1620000 },
  { month: 'Apr', planned: 1800000, actual: 1750000 },
  { month: 'May', planned: 2000000, actual: 2280000 },
  { month: 'Jun', planned: 2200000, actual: 0 },
];

export const progressByPhase = [
  { phase: 'Clarify', completed: 95, total: 100 },
  { phase: 'Organize', completed: 88, total: 100 },
  { phase: 'Navigate', completed: 72, total: 100 },
  { phase: 'Drive', completed: 65, total: 100 },
  { phase: 'Understand', completed: 45, total: 100 },
  { phase: 'Control', completed: 38, total: 100 },
  { phase: 'Track', completed: 30, total: 100 },
];

export const teamMembers = [
  { id: 'u3', name: 'Elena Rodriguez', role: 'Project Manager', utilization: 92, projects: 3, avatar: 'ER' },
  { id: 'u4', name: 'David Park', role: 'Scrum Master', utilization: 85, projects: 2, avatar: 'DP' },
  { id: 'u5', name: 'Aisha Patel', role: 'Product Owner', utilization: 78, projects: 3, avatar: 'AP' },
  { id: 'u6', name: 'James Wilson', role: 'Senior Engineer', utilization: 95, projects: 4, avatar: 'JW' },
  { id: 'u7', name: 'Lisa Thompson', role: 'UI/UX Designer', utilization: 88, projects: 3, avatar: 'LT' },
];

import { useState, useMemo } from 'react';
import { useParams, Link } from 'wouter';
import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart3, Calendar, CheckCircle2, Clock, AlertTriangle, Users,
  FileText, MessageSquare, Shield, ArrowLeft, Plus, GripVertical,
  ChevronRight, Target, Layers
} from 'lucide-react';
import { projects, tasks, risks, milestones, users, conductPhases, teamMembers } from '@/lib/demoData';
import { useAppStore } from '@/lib/store';

const statusColors: Record<string, string> = {
  active: 'bg-[oklch(0.7_0.18_145)]/10 text-[oklch(0.7_0.18_145)]',
  'at-risk': 'bg-[oklch(0.6_0.2_25)]/10 text-[oklch(0.6_0.2_25)]',
  'on-hold': 'bg-[oklch(0.75_0.15_80)]/10 text-[oklch(0.75_0.15_80)]',
  completed: 'bg-[oklch(0.65_0.2_265)]/10 text-[oklch(0.65_0.2_265)]',
};

const priorityColors: Record<string, string> = {
  critical: 'bg-[oklch(0.6_0.2_25)]/10 text-[oklch(0.6_0.2_25)] border-[oklch(0.6_0.2_25)]/20',
  high: 'bg-[oklch(0.75_0.15_80)]/10 text-[oklch(0.75_0.15_80)] border-[oklch(0.75_0.15_80)]/20',
  medium: 'bg-[oklch(0.65_0.2_265)]/10 text-[oklch(0.65_0.2_265)] border-[oklch(0.65_0.2_265)]/20',
  low: 'bg-muted text-muted-foreground border-border',
};

export default function ProjectWorkspace() {
  const params = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const { tasks: storeTasks, updateTask } = useAppStore();

  const project = projects.find(p => p.id === params.id) || projects[0];
  const projectTasks = storeTasks.filter(t => t.projectId === project.id);
  const projectRisks = risks.filter(r => r.projectId === project.id);
  const projectMilestones = milestones.filter(m => m.projectId === project.id);

  return (
    <AppLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link href="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Projects</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{project.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-xl lg:text-2xl font-bold">{project.name}</h1>
                <Badge variant="outline" className={statusColors[project.status]}>{project.status}</Badge>
                <Badge variant="outline" className={priorityColors[project.priority]}>{project.priority}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{project.description}</p>
            </div>
          </div>
        </div>

        {/* Project Selector */}
        <div className="mb-4">
          <Select value={project.id} onValueChange={(val) => { window.location.href = `/project/${val}`; }}>
            <SelectTrigger className="w-64 bg-secondary/50">
              <SelectValue placeholder="Switch project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-secondary/30 border border-border/30 p-1 h-auto flex-wrap">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="kanban" className="text-xs">Kanban</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">Tasks</TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs">Timeline</TabsTrigger>
            <TabsTrigger value="risks" className="text-xs">Risks</TabsTrigger>
            <TabsTrigger value="resources" className="text-xs">Resources</TabsTrigger>
            <TabsTrigger value="quality" className="text-xs">Quality</TabsTrigger>
            <TabsTrigger value="feedback" className="text-xs">Feedback</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs">Documents</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <OverviewTab project={project} tasks={projectTasks} risks={projectRisks} milestones={projectMilestones} />
          </TabsContent>

          {/* Kanban Tab */}
          <TabsContent value="kanban">
            <KanbanTab tasks={projectTasks} updateTask={updateTask} />
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <TasksTab tasks={projectTasks} />
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <TimelineTab tasks={projectTasks} milestones={projectMilestones} project={project} />
          </TabsContent>

          {/* Risks Tab */}
          <TabsContent value="risks">
            <RisksTab risks={projectRisks} />
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <ResourcesTab project={project} />
          </TabsContent>

          {/* Quality Tab */}
          <TabsContent value="quality">
            <QualityTab project={project} />
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <FeedbackTab project={project} />
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <DocumentsTab project={project} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

// --- Sub-components ---

function OverviewTab({ project, tasks, risks, milestones }: any) {
  const completedTasks = tasks.filter((t: any) => t.status === 'done').length;
  const budgetPercent = Math.round((project.spent / project.budget) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        {/* Progress Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="glass-card border-border/30">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-display font-bold">{project.progress}%</p>
              <p className="text-xs text-muted-foreground">Progress</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-border/30">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-display font-bold">{completedTasks}/{tasks.length}</p>
              <p className="text-xs text-muted-foreground">Tasks Done</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-border/30">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-display font-bold">{budgetPercent}%</p>
              <p className="text-xs text-muted-foreground">Budget Used</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-border/30">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-display font-bold">{risks.length}</p>
              <p className="text-xs text-muted-foreground">Active Risks</p>
            </CardContent>
          </Card>
        </div>

        {/* CONDUCT Phase Progress */}
        <Card className="glass-card border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">Methodology Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {conductPhases.map((phase, i) => {
              const isActive = project.phase === phase.label;
              const isPast = conductPhases.findIndex(p => p.label === project.phase) > i;
              return (
                <div key={phase.key} className={`flex items-center gap-3 p-2 rounded-lg ${isActive ? 'bg-primary/10 border border-primary/20' : ''}`}>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isPast ? 'bg-[oklch(0.7_0.18_145)]/20 text-[oklch(0.7_0.18_145)]' :
                      isActive ? 'text-white' : 'bg-muted text-muted-foreground'
                    }`}
                    style={isActive ? { background: phase.color } : {}}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : phase.letter}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{phase.label}</p>
                  </div>
                  {isActive && <Badge className="text-[10px]">Current</Badge>}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <Card className="glass-card border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-display">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Methodology</span><Badge variant="outline">{project.methodology}</Badge></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Start Date</span><span>{new Date(project.startDate).toLocaleDateString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">End Date</span><span>{new Date(project.endDate).toLocaleDateString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Budget</span><span>${(project.budget / 1000000).toFixed(1)}M</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Spent</span><span>${(project.spent / 1000000).toFixed(1)}M</span></div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-muted-foreground">Budget Health</span><span>{budgetPercent}%</span></div>
              <Progress value={budgetPercent} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-display">Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {milestones.map((m: any) => (
              <div key={m.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/20">
                <CheckCircle2 className={`w-4 h-4 ${m.status === 'completed' ? 'text-[oklch(0.7_0.18_145)]' : 'text-muted-foreground'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{m.title}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(m.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KanbanTab({ tasks, updateTask }: any) {
  const columns = [
    { id: 'todo', label: 'To Do', color: 'border-muted-foreground/30' },
    { id: 'in-progress', label: 'In Progress', color: 'border-[oklch(0.65_0.2_265)]/50' },
    { id: 'review', label: 'In Review', color: 'border-[oklch(0.75_0.15_80)]/50' },
    { id: 'done', label: 'Done', color: 'border-[oklch(0.7_0.18_145)]/50' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((col) => {
        const colTasks = tasks.filter((t: any) => t.status === col.id);
        return (
          <div key={col.id} className={`rounded-xl border-t-2 ${col.color} bg-secondary/20 p-3`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">{col.label}</h3>
              <Badge variant="secondary" className="text-[10px]">{colTasks.length}</Badge>
            </div>
            <div className="space-y-2">
              {colTasks.map((task: any) => {
                const assignee = users.find(u => u.id === task.assignee);
                return (
                  <div key={task.id} className="glass-card p-3 hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="flex items-start gap-2 mb-2">
                      <GripVertical className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                      <p className="text-xs font-medium leading-tight">{task.title}</p>
                    </div>
                    <div className="flex items-center justify-between pl-5">
                      <Badge variant="outline" className={`text-[9px] ${priorityColors[task.priority]}`}>{task.priority}</Badge>
                      {assignee && (
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[8px] bg-primary/20 text-primary">{assignee.avatar}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                );
              })}
              <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                <Plus className="w-3 h-3 mr-1" /> Add Task
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TasksTab({ tasks }: any) {
  return (
    <Card className="glass-card border-border/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-display">All Tasks</CardTitle>
          <Button size="sm" className="text-xs"><Plus className="w-3 h-3 mr-1" /> New Task</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] text-muted-foreground uppercase tracking-wider font-medium border-b border-border/30">
            <div className="col-span-5">Task</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-2">Assignee</div>
            <div className="col-span-1">Due</div>
          </div>
          {tasks.map((task: any) => {
            const assignee = users.find(u => u.id === task.assignee);
            return (
              <div key={task.id} className="grid grid-cols-12 gap-2 px-3 py-2.5 rounded-lg hover:bg-accent/20 transition-colors items-center">
                <div className="col-span-5">
                  <p className="text-xs font-medium truncate">{task.title}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{task.description}</p>
                </div>
                <div className="col-span-2">
                  <Badge variant="outline" className="text-[9px]">{task.status}</Badge>
                </div>
                <div className="col-span-2">
                  <Badge variant="outline" className={`text-[9px] ${priorityColors[task.priority]}`}>{task.priority}</Badge>
                </div>
                <div className="col-span-2">
                  {assignee && (
                    <div className="flex items-center gap-1.5">
                      <Avatar className="h-5 w-5"><AvatarFallback className="text-[8px] bg-primary/20 text-primary">{assignee.avatar}</AvatarFallback></Avatar>
                      <span className="text-[10px] truncate">{assignee.name.split(' ')[0]}</span>
                    </div>
                  )}
                </div>
                <div className="col-span-1">
                  <span className="text-[10px] text-muted-foreground">{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function TimelineTab({ tasks, milestones, project }: any) {
  // Simple Gantt-like timeline
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  const ganttItems = tasks.map((task: any) => {
    const taskStart = new Date(task.dueDate);
    taskStart.setDate(taskStart.getDate() - 14); // Assume 2 week duration
    const taskEnd = new Date(task.dueDate);
    const left = Math.max(0, ((taskStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100);
    const width = Math.min(100 - left, ((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100);
    return { ...task, left, width: Math.max(width, 3) };
  });

  return (
    <Card className="glass-card border-border/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display">Project Timeline (Gantt View)</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Month headers */}
        <div className="flex border-b border-border/30 pb-2 mb-4">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m) => (
            <div key={m} className="flex-1 text-[10px] text-muted-foreground text-center">{m}</div>
          ))}
        </div>
        {/* Gantt bars */}
        <div className="space-y-2">
          {ganttItems.map((item: any) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-40 shrink-0">
                <p className="text-[11px] font-medium truncate">{item.title}</p>
              </div>
              <div className="flex-1 relative h-6 bg-secondary/30 rounded">
                <div
                  className={`absolute top-1 bottom-1 rounded ${
                    item.status === 'done' ? 'bg-[oklch(0.7_0.18_145)]' :
                    item.status === 'in-progress' ? 'bg-[oklch(0.65_0.2_265)]' :
                    'bg-muted-foreground/30'
                  }`}
                  style={{ left: `${item.left}%`, width: `${item.width}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Milestones */}
        <div className="mt-6 pt-4 border-t border-border/30">
          <h4 className="text-xs font-medium mb-3">Milestones</h4>
          <div className="flex items-center gap-3 relative h-8 bg-secondary/20 rounded">
            {milestones.map((m: any) => {
              const mDate = new Date(m.dueDate);
              const pos = ((mDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100;
              return (
                <div key={m.id} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${Math.min(pos, 95)}%` }}>
                  <div className="w-3 h-3 rotate-45 bg-[oklch(0.75_0.15_80)] border-2 border-background" title={m.title} />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RisksTab({ risks }: any) {
  return (
    <div className="space-y-4">
      {/* Risk Matrix */}
      <Card className="glass-card border-border/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Risk Heat Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-1 max-w-md">
            <div className="col-span-1" />
            {['Very Low', 'Low', 'Medium', 'High', 'Very High'].map(l => (
              <div key={l} className="text-[8px] text-muted-foreground text-center">{l}</div>
            ))}
            {[5, 4, 3, 2, 1].map(row => (
              <>
                <div key={`label-${row}`} className="text-[8px] text-muted-foreground flex items-center">{row}</div>
                {[1, 2, 3, 4, 5].map(col => {
                  const score = row * col;
                  const risksInCell = risks.filter((r: any) => {
                    const rRow = Math.ceil(r.impact * 5);
                    const rCol = Math.ceil(r.probability * 5);
                    return rRow === row && rCol === col;
                  });
                  const bg = score >= 15 ? 'bg-[oklch(0.6_0.2_25)]/30' : score >= 8 ? 'bg-[oklch(0.75_0.15_80)]/30' : 'bg-[oklch(0.7_0.18_145)]/20';
                  return (
                    <div key={`${row}-${col}`} className={`aspect-square rounded ${bg} flex items-center justify-center relative`}>
                      {risksInCell.length > 0 && (
                        <div className="w-3 h-3 rounded-full bg-foreground/80 flex items-center justify-center">
                          <span className="text-[7px] text-background font-bold">{risksInCell.length}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
            <span>X: Probability</span>
            <span>Y: Impact</span>
          </div>
        </CardContent>
      </Card>

      {/* Risk Register */}
      <Card className="glass-card border-border/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-display">Risk Register</CardTitle>
            <Button size="sm" className="text-xs"><Plus className="w-3 h-3 mr-1" /> Add Risk</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {risks.map((risk: any) => {
            const score = risk.probability * risk.impact;
            const severity = score > 0.5 ? 'Critical' : score > 0.3 ? 'High' : score > 0.15 ? 'Medium' : 'Low';
            const sevColor = score > 0.5 ? 'text-[oklch(0.6_0.2_25)]' : score > 0.3 ? 'text-[oklch(0.75_0.15_80)]' : 'text-[oklch(0.7_0.18_145)]';
            const owner = users.find(u => u.id === risk.owner);
            return (
              <div key={risk.id} className="p-4 rounded-lg border border-border/30 hover:border-border/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${sevColor}`} />
                    <h4 className="text-sm font-medium">{risk.title}</h4>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{risk.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{risk.description}</p>
                <div className="flex items-center gap-4 text-[10px]">
                  <span className="text-muted-foreground">Probability: <span className="text-foreground">{(risk.probability * 100)}%</span></span>
                  <span className="text-muted-foreground">Impact: <span className="text-foreground">{(risk.impact * 100)}%</span></span>
                  <span className={`font-medium ${sevColor}`}>Severity: {severity}</span>
                  <span className="text-muted-foreground">Category: {risk.category}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-border/20">
                  <p className="text-[10px] text-muted-foreground"><span className="font-medium">Mitigation:</span> {risk.mitigation}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function ResourcesTab({ project }: any) {
  const team = project.team.map((id: string) => users.find(u => u.id === id)).filter(Boolean);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="glass-card border-border/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Team Allocation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {team.map((member: any) => {
            const tm = teamMembers.find(t => t.id === member.id);
            return (
              <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/20 transition-colors">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">{member.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{tm?.utilization || 80}%</p>
                  <p className="text-[10px] text-muted-foreground">Utilization</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="glass-card border-border/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Budget Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Personnel', amount: project.budget * 0.55, spent: project.spent * 0.5 },
            { label: 'Infrastructure', amount: project.budget * 0.2, spent: project.spent * 0.22 },
            { label: 'Licenses & Tools', amount: project.budget * 0.1, spent: project.spent * 0.12 },
            { label: 'Contingency', amount: project.budget * 0.1, spent: project.spent * 0.05 },
            { label: 'Other', amount: project.budget * 0.05, spent: project.spent * 0.11 },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span>{item.label}</span>
                <span className="text-muted-foreground">${(item.spent / 1000).toFixed(0)}K / ${(item.amount / 1000).toFixed(0)}K</span>
              </div>
              <Progress value={(item.spent / item.amount) * 100} className="h-1.5" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function QualityTab({ project }: any) {
  const qualityMetrics = [
    { label: 'Code Coverage', value: 87, target: 90, status: 'warning' },
    { label: 'Defect Rate', value: 1.8, target: 2, status: 'good', unit: '%' },
    { label: 'Test Pass Rate', value: 96, target: 95, status: 'good' },
    { label: 'WCAG Compliance', value: 94, target: 100, status: 'warning' },
    { label: 'Performance Score', value: 92, target: 95, status: 'warning' },
    { label: 'Security Score', value: 88, target: 90, status: 'warning' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {qualityMetrics.map((metric) => (
          <Card key={metric.label} className="glass-card border-border/30">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground font-medium">{metric.label}</p>
                <Badge variant="outline" className={`text-[9px] ${
                  metric.status === 'good' ? 'text-[oklch(0.7_0.18_145)] border-[oklch(0.7_0.18_145)]/30' : 'text-[oklch(0.75_0.15_80)] border-[oklch(0.75_0.15_80)]/30'
                }`}>
                  {metric.status === 'good' ? 'On Track' : 'Needs Attention'}
                </Badge>
              </div>
              <p className="text-2xl font-display font-bold">{metric.value}{metric.unit || '%'}</p>
              <p className="text-[10px] text-muted-foreground mt-1">Target: {metric.target}{metric.unit || '%'}</p>
              <Progress value={(metric.value / metric.target) * 100} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card border-border/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Quality Gates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { gate: 'Unit Testing', status: 'passed', date: '2025-04-20' },
            { gate: 'Integration Testing', status: 'passed', date: '2025-05-01' },
            { gate: 'Security Audit', status: 'in-progress', date: '2025-05-25' },
            { gate: 'Performance Testing', status: 'pending', date: '2025-06-01' },
            { gate: 'UAT Sign-off', status: 'pending', date: '2025-06-15' },
          ].map((gate) => (
            <div key={gate.gate} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/20">
              <CheckCircle2 className={`w-4 h-4 ${
                gate.status === 'passed' ? 'text-[oklch(0.7_0.18_145)]' :
                gate.status === 'in-progress' ? 'text-[oklch(0.65_0.2_265)]' : 'text-muted-foreground'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{gate.gate}</p>
              </div>
              <Badge variant="outline" className="text-[10px]">{gate.status}</Badge>
              <span className="text-[10px] text-muted-foreground">{new Date(gate.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function FeedbackTab({ project }: any) {
  const feedbackItems = [
    { id: 1, author: 'Aisha Patel', role: 'Product Owner', date: '2025-05-15', type: 'feature', content: 'The dashboard analytics need more granular filtering options. Users should be able to drill down by team, sprint, and custom date ranges.', status: 'open', priority: 'high' },
    { id: 2, author: 'Robert Kim', role: 'Stakeholder', date: '2025-05-12', type: 'improvement', content: 'Report generation is too slow for large datasets. Consider implementing background processing with email notifications.', status: 'in-progress', priority: 'medium' },
    { id: 3, author: 'James Wilson', role: 'Developer', date: '2025-05-10', type: 'bug', content: 'Kanban drag-and-drop occasionally loses task position when network is slow. Need optimistic updates.', status: 'resolved', priority: 'high' },
    { id: 4, author: 'Lisa Thompson', role: 'Designer', date: '2025-05-08', type: 'improvement', content: 'The mobile experience needs improvement. Navigation is difficult on smaller screens.', status: 'open', priority: 'medium' },
  ];

  return (
    <Card className="glass-card border-border/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-display">Feedback & Retrospectives</CardTitle>
          <Button size="sm" className="text-xs"><Plus className="w-3 h-3 mr-1" /> Add Feedback</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {feedbackItems.map((item) => (
          <div key={item.id} className="p-4 rounded-lg border border-border/30 hover:border-border/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6"><AvatarFallback className="text-[8px] bg-primary/20 text-primary">{item.author.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                <span className="text-xs font-medium">{item.author}</span>
                <span className="text-[10px] text-muted-foreground">{item.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[9px]">{item.type}</Badge>
                <Badge variant="outline" className={`text-[9px] ${
                  item.status === 'resolved' ? 'text-[oklch(0.7_0.18_145)]' :
                  item.status === 'in-progress' ? 'text-[oklch(0.65_0.2_265)]' : ''
                }`}>{item.status}</Badge>
              </div>
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed">{item.content}</p>
            <p className="text-[10px] text-muted-foreground mt-2">{new Date(item.date).toLocaleDateString()}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function DocumentsTab({ project }: any) {
  const documents = [
    { id: 1, name: 'Project Charter v2.1', type: 'PDF', size: '2.4 MB', date: '2025-01-20', author: 'Elena Rodriguez' },
    { id: 2, name: 'Architecture Decision Record', type: 'DOCX', size: '1.8 MB', date: '2025-02-15', author: 'James Wilson' },
    { id: 3, name: 'Risk Assessment Report', type: 'XLSX', size: '890 KB', date: '2025-03-10', author: 'David Park' },
    { id: 4, name: 'Sprint Retrospective Notes', type: 'MD', size: '45 KB', date: '2025-05-01', author: 'David Park' },
    { id: 5, name: 'UI/UX Design System', type: 'FIGMA', size: '12 MB', date: '2025-04-22', author: 'Lisa Thompson' },
    { id: 6, name: 'API Documentation', type: 'MD', size: '320 KB', date: '2025-05-10', author: 'James Wilson' },
  ];

  return (
    <Card className="glass-card border-border/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-display">Project Documents</CardTitle>
          <Button size="sm" className="text-xs"><Plus className="w-3 h-3 mr-1" /> Upload</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/20 transition-colors cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{doc.name}</p>
                <p className="text-[10px] text-muted-foreground">{doc.author} &middot; {new Date(doc.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right shrink-0">
                <Badge variant="secondary" className="text-[9px]">{doc.type}</Badge>
                <p className="text-[10px] text-muted-foreground mt-0.5">{doc.size}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

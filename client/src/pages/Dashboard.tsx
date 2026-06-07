import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock,
  DollarSign, Users, FolderKanban, ArrowUpRight, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { projects, kpiData, budgetByMonth, risks, recentActivity, milestones } from '@/lib/demoData';

import { fadeUpSmall as fadeUp, staggerFast as stagger } from '@/lib/animations';

const statusColors: Record<string, string> = {
  active: 'bg-[oklch(0.7_0.18_145)]/10 text-[oklch(0.7_0.18_145)] border-[oklch(0.7_0.18_145)]/20',
  'at-risk': 'bg-[oklch(0.6_0.2_25)]/10 text-[oklch(0.6_0.2_25)] border-[oklch(0.6_0.2_25)]/20',
  'on-hold': 'bg-[oklch(0.75_0.15_80)]/10 text-[oklch(0.75_0.15_80)] border-[oklch(0.75_0.15_80)]/20',
  completed: 'bg-[oklch(0.65_0.2_265)]/10 text-[oklch(0.65_0.2_265)] border-[oklch(0.65_0.2_265)]/20',
};

const CHART_COLORS = ['#6366F1', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];

export default function Dashboard() {
  const projectStatusData = [
    { name: 'Active', value: kpiData.activeProjects, color: '#10B981' },
    { name: 'At Risk', value: kpiData.atRiskProjects, color: '#EF4444' },
    { name: 'Completed', value: kpiData.completedProjects, color: '#6366F1' },
    { name: 'On Hold', value: 1, color: '#F59E0B' },
  ];

  return (
    <AppLayout>
      <div className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold">Portfolio Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">Real-time overview of all projects and KPIs</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
              <span className="text-xs text-muted-foreground">Last updated: 2 min ago</span>
            </div>
          </motion.div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Projects', value: kpiData.activeProjects, icon: FolderKanban, trend: '+2', trendUp: true, color: 'text-[oklch(0.65_0.2_265)]' },
            { label: 'On-Time Delivery', value: `${kpiData.onTimeDelivery}%`, icon: Clock, trend: '+3%', trendUp: true, color: 'text-[oklch(0.7_0.18_145)]' },
            { label: 'Team Utilization', value: `${kpiData.teamUtilization}%`, icon: Users, trend: '-2%', trendUp: false, color: 'text-[oklch(0.75_0.15_80)]' },
            { label: 'Budget Spent', value: `$${(kpiData.totalSpent / 1000000).toFixed(1)}M`, icon: DollarSign, trend: `of $${(kpiData.totalBudget / 1000000).toFixed(1)}M`, trendUp: true, color: 'text-[oklch(0.65_0.2_265)]' },
          ].map((kpi) => (
            <motion.div key={kpi.label} variants={fadeUp}>
              <Card className="glass-card border-border/30 hover:border-border/50 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{kpi.label}</p>
                      <p className="font-display text-2xl font-bold mt-1">{kpi.value}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {kpi.trendUp ? (
                          <TrendingUp className="w-3 h-3 text-[oklch(0.7_0.18_145)]" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-[oklch(0.75_0.15_80)]" />
                        )}
                        <span className="text-xs text-muted-foreground">{kpi.trend}</span>
                      </div>
                    </div>
                    <div className={`p-2.5 rounded-xl bg-primary/10 ${kpi.color}`}>
                      <kpi.icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Budget Chart */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <Card className="glass-card border-border/30 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display">Budget vs Actual Spend</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={budgetByMonth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="plannedGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 250 / 30%)" />
                      <XAxis dataKey="month" tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000000}M`} />
                      <Tooltip
                        contentStyle={{ background: 'oklch(0.18 0.025 250)', border: '1px solid oklch(0.3 0.02 250 / 40%)', borderRadius: '8px' }}
                        labelStyle={{ color: 'oklch(0.85 0.01 250)' }}
                        formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`]}
                      />
                      <Area type="monotone" dataKey="planned" stroke="#6366F1" fill="url(#plannedGrad)" strokeWidth={2} name="Planned" />
                      <Area type="monotone" dataKey="actual" stroke="#8B5CF6" fill="url(#actualGrad)" strokeWidth={2} name="Actual" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Status Pie */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="glass-card border-border/30 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display">Project Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: 'oklch(0.18 0.025 250)', border: '1px solid oklch(0.3 0.02 250 / 40%)', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {projectStatusData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                      <span className="text-xs text-muted-foreground">{item.name} ({item.value})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Projects & Risk / Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Active Projects */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-border/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-display">Active Projects</CardTitle>
                  <Link href="/project/p1">
                    <Button variant="ghost" size="sm" className="text-xs">View All <ArrowUpRight className="w-3 h-3 ml-1" /></Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {projects.filter(p => p.status !== 'completed').slice(0, 4).map((project) => (
                  <Link key={project.id} href={`/project/${project.id}`}>
                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/30 transition-colors group">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{project.name}</p>
                          <Badge variant="outline" className={`text-[10px] shrink-0 ${statusColors[project.status]}`}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{project.phase}</span>
                          <span>{project.methodology}</span>
                        </div>
                      </div>
                      <div className="w-24 shrink-0">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Risk Heat Map */}
          <div>
            <Card className="glass-card border-border/30 h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[oklch(0.75_0.15_80)]" />
                  Risk Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {risks.slice(0, 5).map((risk) => {
                  const score = risk.probability * risk.impact;
                  const color = score > 0.5 ? 'text-[oklch(0.6_0.2_25)]' : score > 0.3 ? 'text-[oklch(0.75_0.15_80)]' : 'text-[oklch(0.7_0.18_145)]';
                  return (
                    <div key={risk.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/20 transition-colors">
                      <div className={`mt-0.5 ${color}`}>
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{risk.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-muted-foreground">P: {(risk.probability * 100).toFixed(0)}%</span>
                          <span className="text-[10px] text-muted-foreground">I: {(risk.impact * 100).toFixed(0)}%</span>
                          <Badge variant="outline" className="text-[9px] h-4">{risk.status}</Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Activity */}
          <Card className="glass-card border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {recentActivity.slice(0, 6).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>{' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Milestones */}
          <Card className="glass-card border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Upcoming Milestones</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {milestones.filter(m => m.status === 'upcoming').slice(0, 6).map((milestone) => {
                const project = projects.find(p => p.id === milestone.projectId);
                return (
                  <div key={milestone.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/20 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{milestone.title}</p>
                      <p className="text-[10px] text-muted-foreground">{project?.name}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">{new Date(milestone.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

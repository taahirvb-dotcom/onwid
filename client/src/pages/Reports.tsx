import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Filter, Calendar } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { budgetByMonth, progressByPhase, kpiData } from '@/lib/demoData';
import { motion } from 'framer-motion';
import { fadeUpSmall as fadeUp } from '@/lib/animations';

const velocityData = [
  { sprint: 'S1', planned: 42, completed: 38 },
  { sprint: 'S2', planned: 45, completed: 44 },
  { sprint: 'S3', planned: 48, completed: 46 },
  { sprint: 'S4', planned: 50, completed: 52 },
  { sprint: 'S5', planned: 48, completed: 47 },
  { sprint: 'S6', planned: 52, completed: 50 },
];

const burndownData = [
  { day: 'Day 1', remaining: 120, ideal: 120 },
  { day: 'Day 3', remaining: 105, ideal: 100 },
  { day: 'Day 5', remaining: 88, ideal: 80 },
  { day: 'Day 7', remaining: 72, ideal: 60 },
  { day: 'Day 9', remaining: 55, ideal: 40 },
  { day: 'Day 11', remaining: 38, ideal: 20 },
  { day: 'Day 14', remaining: 12, ideal: 0 },
];

const evaData = [
  { month: 'Jan', pv: 400, ev: 380, ac: 390 },
  { month: 'Feb', pv: 800, ev: 750, ac: 780 },
  { month: 'Mar', pv: 1200, ev: 1150, ac: 1250 },
  { month: 'Apr', pv: 1600, ev: 1500, ac: 1580 },
  { month: 'May', pv: 2000, ev: 1850, ac: 1950 },
];

const radarData = progressByPhase.map(p => ({ subject: p.phase, value: p.completed, fullMark: 100 }));

export default function Reports() {
  return (
    <AppLayout>
      <div className="p-4 lg:p-8 space-y-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold">Reports & Analytics</h1>
              <p className="text-muted-foreground text-sm mt-1">Comprehensive project performance insights</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm"><Filter className="w-3.5 h-3.5 mr-1.5" /> Filter</Button>
              <Button variant="outline" size="sm"><Download className="w-3.5 h-3.5 mr-1.5" /> Export</Button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="overview">
          <TabsList className="bg-secondary/30 border border-border/30">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="financial" className="text-xs">Financial</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
            <TabsTrigger value="methodology" className="text-xs">Methodology</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            {/* KPI Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="glass-card border-border/30">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">CPI</p>
                  <p className="text-2xl font-display font-bold text-[oklch(0.7_0.18_145)]">0.95</p>
                  <p className="text-[10px] text-muted-foreground">Cost Performance</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-border/30">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">SPI</p>
                  <p className="text-2xl font-display font-bold text-[oklch(0.75_0.15_80)]">0.92</p>
                  <p className="text-[10px] text-muted-foreground">Schedule Performance</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-border/30">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">EAC</p>
                  <p className="text-2xl font-display font-bold">$16.5M</p>
                  <p className="text-[10px] text-muted-foreground">Estimate at Completion</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-border/30">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">TCPI</p>
                  <p className="text-2xl font-display font-bold">1.04</p>
                  <p className="text-[10px] text-muted-foreground">To-Complete Index</p>
                </CardContent>
              </Card>
            </div>

            {/* Velocity & Burndown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="glass-card border-border/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-display">Sprint Velocity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={velocityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 250 / 30%)" />
                        <XAxis dataKey="sprint" tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: 'oklch(0.18 0.025 250)', border: '1px solid oklch(0.3 0.02 250 / 40%)', borderRadius: '8px' }} />
                        <Bar dataKey="planned" fill="#6366F1" radius={[4, 4, 0, 0]} opacity={0.5} name="Planned" />
                        <Bar dataKey="completed" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Completed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-display">Sprint Burndown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={burndownData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 250 / 30%)" />
                        <XAxis dataKey="day" tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: 'oklch(0.18 0.025 250)', border: '1px solid oklch(0.3 0.02 250 / 40%)', borderRadius: '8px' }} />
                        <Line type="monotone" dataKey="ideal" stroke="#6366F1" strokeDasharray="5 5" strokeWidth={1.5} dot={false} name="Ideal" />
                        <Line type="monotone" dataKey="remaining" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} name="Actual" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-4 space-y-4">
            <Card className="glass-card border-border/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display">Earned Value Analysis (EVA)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={evaData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 250 / 30%)" />
                      <XAxis dataKey="month" tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}K`} />
                      <Tooltip contentStyle={{ background: 'oklch(0.18 0.025 250)', border: '1px solid oklch(0.3 0.02 250 / 40%)', borderRadius: '8px' }} formatter={(v: number) => [`$${v}K`]} />
                      <Line type="monotone" dataKey="pv" stroke="#6366F1" strokeWidth={2} name="Planned Value" />
                      <Line type="monotone" dataKey="ev" stroke="#10B981" strokeWidth={2} name="Earned Value" />
                      <Line type="monotone" dataKey="ac" stroke="#F59E0B" strokeWidth={2} name="Actual Cost" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-[#6366F1]" /><span className="text-xs text-muted-foreground">Planned Value</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-[#10B981]" /><span className="text-xs text-muted-foreground">Earned Value</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-[#F59E0B]" /><span className="text-xs text-muted-foreground">Actual Cost</span></div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display">Budget Allocation by Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetByMonth} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 250 / 30%)" />
                      <XAxis type="number" tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000000}M`} />
                      <YAxis dataKey="month" type="category" tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: 'oklch(0.18 0.025 250)', border: '1px solid oklch(0.3 0.02 250 / 40%)', borderRadius: '8px' }} />
                      <Bar dataKey="planned" fill="#6366F1" radius={[0, 4, 4, 0]} opacity={0.5} name="Planned" />
                      <Bar dataKey="actual" fill="#8B5CF6" radius={[0, 4, 4, 0]} name="Actual" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="glass-card border-border/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-display">Task Completion Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { week: 'W1', completed: 12, created: 18 },
                        { week: 'W2', completed: 15, created: 14 },
                        { week: 'W3', completed: 22, created: 20 },
                        { week: 'W4', completed: 18, created: 16 },
                        { week: 'W5', completed: 25, created: 22 },
                        { week: 'W6', completed: 28, created: 24 },
                      ]}>
                        <defs>
                          <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 250 / 30%)" />
                        <XAxis dataKey="week" tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: 'oklch(0.18 0.025 250)', border: '1px solid oklch(0.3 0.02 250 / 40%)', borderRadius: '8px' }} />
                        <Area type="monotone" dataKey="completed" stroke="#10B981" fill="url(#compGrad)" strokeWidth={2} name="Completed" />
                        <Area type="monotone" dataKey="created" stroke="#6366F1" fill="transparent" strokeWidth={1.5} strokeDasharray="4 4" name="Created" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-display">Methodology Adherence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="oklch(0.25 0.02 250 / 40%)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 10 }} />
                        <PolarRadiusAxis tick={{ fill: 'oklch(0.65 0.02 250)', fontSize: 9 }} />
                        <Radar name="Progress" dataKey="value" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="methodology" className="mt-4 space-y-4">
            <Card className="glass-card border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">C.O.N.D.U.C.T. Phase Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {progressByPhase.map((phase) => (
                  <div key={phase.phase} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{phase.phase}</span>
                      <span className="text-xs text-muted-foreground">{phase.completed}%</span>
                    </div>
                    <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[oklch(0.65_0.2_265)] to-[oklch(0.6_0.2_300)]"
                        style={{ width: `${phase.completed}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

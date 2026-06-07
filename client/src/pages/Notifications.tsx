import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell, CheckCircle2, AlertTriangle, MessageSquare, FolderKanban,
  Clock, Users, DollarSign, Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUpSmall as fadeUp } from '@/lib/animations';

const notifications = [
  { id: 1, type: 'task', icon: CheckCircle2, title: 'Task Completed', message: 'James Wilson completed "Design API gateway architecture"', time: '10 minutes ago', read: false, color: 'text-[oklch(0.7_0.18_145)]' },
  { id: 2, type: 'risk', icon: AlertTriangle, title: 'Risk Escalated', message: 'Data loss during migration risk escalated to Critical', time: '25 minutes ago', read: false, color: 'text-[oklch(0.6_0.2_25)]' },
  { id: 3, type: 'message', icon: MessageSquare, title: 'New Comment', message: 'Aisha Patel commented on "Sprint Planning for CRM Migration"', time: '1 hour ago', read: false, color: 'text-[oklch(0.65_0.2_265)]' },
  { id: 4, type: 'project', icon: FolderKanban, title: 'Project Status Changed', message: 'Mobile Banking App v3.0 status changed to "At Risk"', time: '2 hours ago', read: true, color: 'text-[oklch(0.75_0.15_80)]' },
  { id: 5, type: 'milestone', icon: Clock, title: 'Milestone Approaching', message: 'API Gateway Go-Live due in 5 days', time: '3 hours ago', read: true, color: 'text-[oklch(0.65_0.2_265)]' },
  { id: 6, type: 'team', icon: Users, title: 'Team Update', message: 'Lisa Thompson joined Enterprise CRM Migration project', time: '5 hours ago', read: true, color: 'text-[oklch(0.7_0.18_145)]' },
  { id: 7, type: 'budget', icon: DollarSign, title: 'Budget Alert', message: 'Global Supply Chain Platform reached 80% budget threshold', time: '6 hours ago', read: true, color: 'text-[oklch(0.75_0.15_80)]' },
  { id: 8, type: 'task', icon: CheckCircle2, title: 'Task Assigned', message: 'You have been assigned "Performance optimization" task', time: '8 hours ago', read: true, color: 'text-[oklch(0.65_0.2_265)]' },
  { id: 9, type: 'risk', icon: AlertTriangle, title: 'Risk Mitigated', message: 'Vendor API deprecation risk successfully mitigated', time: '1 day ago', read: true, color: 'text-[oklch(0.7_0.18_145)]' },
  { id: 10, type: 'project', icon: FolderKanban, title: 'Phase Transition', message: 'Enterprise CRM Migration moved to "Drive Execution" phase', time: '1 day ago', read: true, color: 'text-[oklch(0.65_0.2_265)]' },
];

export default function Notifications() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppLayout>
      <div className="p-4 lg:p-8 space-y-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              <Check className="w-3.5 h-3.5 mr-1.5" /> Mark All Read
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="all">
          <TabsList className="bg-secondary/30 border border-border/30">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">Tasks</TabsTrigger>
            <TabsTrigger value="risks" className="text-xs">Risks</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card className="glass-card border-border/30">
              <CardContent className="p-0 divide-y divide-border/20">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 hover:bg-accent/20 transition-colors ${
                      !notification.read ? 'bg-primary/[0.03]' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-secondary/50 ${notification.color}`}>
                      <notification.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{notification.title}</p>
                        {!notification.read && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread" className="mt-4">
            <Card className="glass-card border-border/30">
              <CardContent className="p-0 divide-y divide-border/20">
                {notifications.filter(n => !n.read).map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-4 bg-primary/[0.03] hover:bg-accent/20 transition-colors">
                    <div className={`p-2 rounded-lg bg-secondary/50 ${notification.color}`}>
                      <notification.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="mt-4">
            <Card className="glass-card border-border/30">
              <CardContent className="p-0 divide-y divide-border/20">
                {notifications.filter(n => n.type === 'task').map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-4 hover:bg-accent/20 transition-colors">
                    <div className={`p-2 rounded-lg bg-secondary/50 ${notification.color}`}>
                      <notification.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="mt-4">
            <Card className="glass-card border-border/30">
              <CardContent className="p-0 divide-y divide-border/20">
                {notifications.filter(n => n.type === 'risk').map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-4 hover:bg-accent/20 transition-colors">
                    <div className={`p-2 rounded-lg bg-secondary/50 ${notification.color}`}>
                      <notification.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-4">
            <Card className="glass-card border-border/30">
              <CardContent className="p-0 divide-y divide-border/20">
                {notifications.filter(n => n.type === 'project').map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-4 hover:bg-accent/20 transition-colors">
                    <div className={`p-2 rounded-lg bg-secondary/50 ${notification.color}`}>
                      <notification.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{notification.time}</p>
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

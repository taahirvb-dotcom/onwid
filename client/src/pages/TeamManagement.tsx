import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Mail, Phone, MapPin, Users, UserPlus } from 'lucide-react';
import { users, teamMembers, projects } from '@/lib/demoData';
import { motion } from 'framer-motion';
import { fadeUpSmall as fadeUp } from '@/lib/animations';

export default function TeamManagement() {
  return (
    <AppLayout>
      <div className="p-4 lg:p-8 space-y-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold">Team Management</h1>
              <p className="text-muted-foreground text-sm mt-1">Manage team members, roles, and resource allocation</p>
            </div>
            <Button size="sm"><UserPlus className="w-4 h-4 mr-2" /> Add Member</Button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Members', value: users.length, icon: Users },
            { label: 'Avg Utilization', value: '82%', icon: Users },
            { label: 'Active on Projects', value: teamMembers.length, icon: Users },
            { label: 'Departments', value: 5, icon: Users },
          ].map((stat) => (
            <Card key={stat.label} className="glass-card border-border/30">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-display font-bold mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="members">
          <TabsList className="bg-secondary/30 border border-border/30">
            <TabsTrigger value="members" className="text-xs">All Members</TabsTrigger>
            <TabsTrigger value="workload" className="text-xs">Workload</TabsTrigger>
            <TabsTrigger value="roles" className="text-xs">Roles & Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => {
                const tm = teamMembers.find(t => t.id === user.id);
                const userProjects = projects.filter(p => p.team.includes(user.id));
                return (
                  <Card key={user.id} className="glass-card-hover border-border/30">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-4">
                        <Avatar className="h-11 w-11">
                          <AvatarFallback className="bg-primary/20 text-primary font-medium">{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.role}</p>
                          <Badge variant="outline" className="text-[9px] mt-1">{user.department}</Badge>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><Mail className="w-3 h-3" />{user.email}</div>
                      </div>
                      {tm && (
                        <div className="mt-3 pt-3 border-t border-border/30">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Utilization</span>
                            <span className="font-medium">{tm.utilization}%</span>
                          </div>
                          <Progress value={tm.utilization} className="h-1.5" />
                          <p className="text-[10px] text-muted-foreground mt-2">{userProjects.length} active project(s)</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="workload" className="mt-4">
            <Card className="glass-card border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">Team Workload Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-4">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{member.name}</span>
                        <span className="text-xs text-muted-foreground">{member.utilization}%</span>
                      </div>
                      <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            member.utilization > 90 ? 'bg-[oklch(0.6_0.2_25)]' :
                            member.utilization > 80 ? 'bg-[oklch(0.75_0.15_80)]' :
                            'bg-[oklch(0.7_0.18_145)]'
                          }`}
                          style={{ width: `${member.utilization}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-muted-foreground">{member.role}</span>
                        <span className="text-[10px] text-muted-foreground">&middot; {member.projects} projects</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="mt-4">
            <Card className="glass-card border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">Role-Based Access Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="grid grid-cols-6 gap-2 px-3 py-2 text-[10px] text-muted-foreground uppercase tracking-wider font-medium border-b border-border/30">
                    <div className="col-span-2">Role</div>
                    <div>Projects</div>
                    <div>Tasks</div>
                    <div>Reports</div>
                    <div>Admin</div>
                  </div>
                  {[
                    { role: 'Super Admin', projects: 'Full', tasks: 'Full', reports: 'Full', admin: 'Full' },
                    { role: 'Organization Admin', projects: 'Full', tasks: 'Full', reports: 'Full', admin: 'Org Level' },
                    { role: 'PMO Lead', projects: 'Full', tasks: 'Full', reports: 'Full', admin: 'None' },
                    { role: 'Project Manager', projects: 'Assigned', tasks: 'Full', reports: 'Project', admin: 'None' },
                    { role: 'Scrum Master', projects: 'Assigned', tasks: 'Full', reports: 'Sprint', admin: 'None' },
                    { role: 'Product Owner', projects: 'Assigned', tasks: 'Read/Write', reports: 'Project', admin: 'None' },
                    { role: 'Team Member', projects: 'Assigned', tasks: 'Own', reports: 'Limited', admin: 'None' },
                    { role: 'Stakeholder', projects: 'View', tasks: 'View', reports: 'Summary', admin: 'None' },
                    { role: 'Client Viewer', projects: 'View', tasks: 'None', reports: 'Summary', admin: 'None' },
                  ].map((row) => (
                    <div key={row.role} className="grid grid-cols-6 gap-2 px-3 py-2.5 rounded-lg hover:bg-accent/20 items-center">
                      <div className="col-span-2 text-xs font-medium">{row.role}</div>
                      <Badge variant="outline" className="text-[9px] w-fit">{row.projects}</Badge>
                      <Badge variant="outline" className="text-[9px] w-fit">{row.tasks}</Badge>
                      <Badge variant="outline" className="text-[9px] w-fit">{row.reports}</Badge>
                      <Badge variant="outline" className="text-[9px] w-fit">{row.admin}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

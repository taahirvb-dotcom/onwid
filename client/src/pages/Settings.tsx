import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { fadeUpSmall as fadeUp } from '@/lib/animations';

export default function Settings() {
  return (
    <AppLayout>
      <div className="p-4 lg:p-8 space-y-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="font-display text-2xl lg:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your organization and platform preferences</p>
        </motion.div>

        <Tabs defaultValue="general">
          <TabsList className="bg-secondary/30 border border-border/30">
            <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
            <TabsTrigger value="organization" className="text-xs">Organization</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs">Notifications</TabsTrigger>
            <TabsTrigger value="integrations" className="text-xs">Integrations</TabsTrigger>
            <TabsTrigger value="security" className="text-xs">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-4 space-y-4">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-display">Platform Settings</CardTitle>
                <CardDescription className="text-xs">Configure general platform behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs">Platform Name</Label>
                    <Input defaultValue="CONDUCT" className="bg-secondary/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Default Timezone</Label>
                    <Select defaultValue="utc-5">
                      <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc+0">UTC</SelectItem>
                        <SelectItem value="utc+1">Central European (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator className="bg-border/30" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Dark Mode</p>
                      <p className="text-xs text-muted-foreground">Use dark theme across the platform</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Compact View</p>
                      <p className="text-xs text-muted-foreground">Reduce spacing for denser information display</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Animations</p>
                      <p className="text-xs text-muted-foreground">Enable UI animations and transitions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <Button onClick={() => toast.success('Settings saved successfully')} className="bg-gradient-to-r from-[oklch(0.65_0.2_265)] to-[oklch(0.6_0.2_300)]">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organization" className="mt-4 space-y-4">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-display">Organization Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs">Organization Name</Label>
                    <Input defaultValue="TechCorp Industries" className="bg-secondary/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Industry</Label>
                    <Select defaultValue="tech">
                      <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Company Size</Label>
                    <Select defaultValue="500">
                      <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">1-50 employees</SelectItem>
                        <SelectItem value="200">51-200 employees</SelectItem>
                        <SelectItem value="500">201-500 employees</SelectItem>
                        <SelectItem value="1000">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Billing Email</Label>
                    <Input defaultValue="billing@techcorp.com" className="bg-secondary/50" />
                  </div>
                </div>
                <Button onClick={() => toast.success('Organization updated')} className="bg-gradient-to-r from-[oklch(0.65_0.2_265)] to-[oklch(0.6_0.2_300)]">Update Organization</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4 space-y-4">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-display">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Task Assignments', desc: 'When a task is assigned to you' },
                  { label: 'Project Updates', desc: 'Status changes on your projects' },
                  { label: 'Risk Alerts', desc: 'New risks identified or escalated' },
                  { label: 'Milestone Reminders', desc: 'Upcoming milestone deadlines' },
                  { label: 'Team Messages', desc: 'Direct messages and mentions' },
                  { label: 'Budget Alerts', desc: 'Budget threshold warnings' },
                  { label: 'Quality Reports', desc: 'Quality gate pass/fail notifications' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="mt-4 space-y-4">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-display">Connected Integrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Jira', status: 'connected', desc: 'Project tracking and issue management' },
                  { name: 'Slack', status: 'connected', desc: 'Team communication and alerts' },
                  { name: 'Microsoft Teams', status: 'available', desc: 'Video conferencing and chat' },
                  { name: 'Power BI', status: 'available', desc: 'Advanced analytics and reporting' },
                  { name: 'GitHub', status: 'connected', desc: 'Source code management' },
                  { name: 'Confluence', status: 'available', desc: 'Documentation and knowledge base' },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:border-border/50 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{integration.name}</p>
                        <Badge variant="outline" className={`text-[9px] ${integration.status === 'connected' ? 'text-[oklch(0.7_0.18_145)]' : ''}`}>
                          {integration.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{integration.desc}</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => toast.info('Feature coming soon')}>
                      {integration.status === 'connected' ? 'Configure' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-4 space-y-4">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-display">Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">SSO / SAML</p>
                    <p className="text-xs text-muted-foreground">Enterprise single sign-on</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Enterprise Plan</Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">Session Timeout</p>
                    <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-32 bg-secondary/50"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">Audit Logging</p>
                    <p className="text-xs text-muted-foreground">Track all user actions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">Data Encryption</p>
                    <p className="text-xs text-muted-foreground">AES-256 encryption at rest</p>
                  </div>
                  <Badge className="text-[10px] bg-[oklch(0.7_0.18_145)]/10 text-[oklch(0.7_0.18_145)]">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

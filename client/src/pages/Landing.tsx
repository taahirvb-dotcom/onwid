import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Target, ArrowRight, Check, Star, Zap, Shield, BarChart3,
  Users, Clock, TrendingUp, ChevronRight, Layers, Brain
} from 'lucide-react';
import { conductPhases } from '@/lib/demoData';

import { fadeUp, stagger } from '@/lib/animations';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.65_0.2_265)] to-[oklch(0.6_0.2_300)] flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">CONDUCT</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#methodology" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Methodology</a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-gradient-to-r from-[oklch(0.65_0.2_265)] to-[oklch(0.6_0.2_300)] hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663675785442/F7gfWhM7d7VsWo4923dJJN/conduct-hero-bg-Cr9BMuBKo7aPQP5H9m64Q6.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-primary/30 bg-primary/5">
                <Zap className="w-3.5 h-3.5 mr-1.5 text-primary" />
                Enterprise Project Management Platform
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Conduct Projects with{' '}
              <span className="gradient-text">Intelligence</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              The enterprise project management platform powered by the C.O.N.D.U.C.T. methodology.
              Deliver projects on time, within budget, and beyond expectations.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-[oklch(0.65_0.2_265)] to-[oklch(0.6_0.2_300)] hover:opacity-90 transition-opacity h-12 px-8 text-base">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="#methodology">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base border-border/50 bg-card/50 backdrop-blur-sm">
                  Explore Methodology
                </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {[
                { value: '500+', label: 'Enterprise Clients' },
                { value: '98%', label: 'On-Time Delivery' },
                { value: '$2B+', label: 'Projects Managed' },
                { value: '4.9/5', label: 'Customer Rating' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4">
                  <p className="font-display text-2xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-primary/30">
                THE METHODOLOGY
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              The C.O.N.D.U.C.T. Framework
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Seven proven phases that transform how you deliver projects. Each phase builds on the last, creating a comprehensive lifecycle.
            </motion.p>
          </motion.div>

          {/* Methodology Visual */}
          <div className="relative mb-16">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663675785442/F7gfWhM7d7VsWo4923dJJN/conduct-methodology-visual-kGb3c8vnqZHpqbYbxFfwcH.webp"
              alt="CONDUCT Methodology"
              className="w-full max-w-4xl mx-auto rounded-2xl opacity-80"
            />
          </div>

          {/* Phase Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {conductPhases.slice(0, 4).map((phase, i) => (
              <motion.div
                key={phase.key}
                variants={fadeUp}
                className="glass-card-hover p-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg mb-4"
                  style={{ background: `linear-gradient(135deg, ${phase.color}, ${phase.color}88)` }}
                >
                  {phase.letter}
                </div>
                <h3 className="font-display font-semibold text-base mb-2">{phase.label}</h3>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
          >
            {conductPhases.slice(4).map((phase) => (
              <motion.div
                key={phase.key}
                variants={fadeUp}
                className="glass-card-hover p-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg mb-4"
                  style={{ background: `linear-gradient(135deg, ${phase.color}, ${phase.color}88)` }}
                >
                  {phase.letter}
                </div>
                <h3 className="font-display font-semibold text-base mb-2">{phase.label}</h3>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-primary/30">
                FEATURES
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Everything You Need to Deliver
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive suite of tools designed for enterprise project delivery excellence.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: LayoutDashboard, title: 'Interactive Dashboards', desc: 'Real-time KPI visualization with portfolio overview, risk heat maps, and budget tracking.' },
              { icon: Layers, title: 'Project Workspaces', desc: 'Gantt charts, Kanban boards, task lists, and document management in one unified view.' },
              { icon: Shield, title: 'Risk Management', desc: 'Proactive risk identification with probability-impact matrices and mitigation tracking.' },
              { icon: BarChart3, title: 'Advanced Analytics', desc: 'Earned value analysis, burndown charts, and predictive forecasting for informed decisions.' },
              { icon: Users, title: 'Team Collaboration', desc: 'Resource allocation, workload balancing, and real-time team communication.' },
              { icon: Brain, title: 'Quality Control', desc: 'Automated quality gates, compliance tracking, and deliverable approval workflows.' },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="glass-card-hover p-6 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mt-16"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663675785442/F7gfWhM7d7VsWo4923dJJN/conduct-features-abstract-nQYdYfujkR34yVKcy8BiAR.webp"
              alt="Platform Features"
              className="w-full max-w-5xl mx-auto rounded-2xl border border-border/30 shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-primary/30">
                PRICING
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Plans for Every Team
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Start free, scale as you grow. Enterprise-grade features at every tier.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                name: 'Starter',
                price: '$29',
                period: '/user/month',
                desc: 'For small teams getting started',
                features: ['Up to 10 projects', '5 team members', 'Basic analytics', 'Email support', 'Kanban boards'],
                cta: 'Start Free Trial',
                highlighted: false,
              },
              {
                name: 'Professional',
                price: '$79',
                period: '/user/month',
                desc: 'For growing organizations',
                features: ['Unlimited projects', '50 team members', 'Advanced analytics', 'Priority support', 'Gantt charts & Kanban', 'Risk management', 'Custom workflows'],
                cta: 'Start Free Trial',
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                desc: 'For large-scale operations',
                features: ['Everything in Pro', 'Unlimited members', 'SSO & SAML', 'Dedicated CSM', 'Custom integrations', 'SLA guarantee', 'On-premise option'],
                cta: 'Contact Sales',
                highlighted: false,
              },
            ].map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-primary/10 to-primary/5 border-2 border-primary/30 relative'
                    : 'glass-card'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <h3 className="font-display font-semibold text-xl mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <Link href="/dashboard">
                  <Button
                    className={`w-full mb-6 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-[oklch(0.65_0.2_265)] to-[oklch(0.6_0.2_300)]'
                        : ''
                    }`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-[oklch(0.7_0.18_145)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-primary/30">
                TESTIMONIALS
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Trusted by Industry Leaders
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                quote: "CONDUCT transformed how we deliver enterprise projects. The methodology-driven approach reduced our delivery time by 40%.",
                author: 'Jennifer Walsh',
                role: 'VP of Engineering, TechCorp',
                rating: 5,
              },
              {
                quote: "The risk management module alone saved us millions. We can now predict and mitigate issues before they become problems.",
                author: 'Michael Torres',
                role: 'PMO Director, GlobalFinance',
                rating: 5,
              },
              {
                quote: "Finally, a platform that understands enterprise complexity. The C.O.N.D.U.C.T. framework is exactly what our teams needed.",
                author: 'Sarah Nakamura',
                role: 'CTO, InnovateCo',
                rating: 5,
              },
            ].map((testimonial) => (
              <motion.div
                key={testimonial.author}
                variants={fadeUp}
                className="glass-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[oklch(0.75_0.15_80)] text-[oklch(0.75_0.15_80)]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 text-foreground/90">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.65_0.2_265_/_0.1)] to-[oklch(0.6_0.2_300_/_0.1)]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your{' '}
              <span className="gradient-text">Project Delivery?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join 500+ enterprise teams already using CONDUCT to deliver projects with intelligence.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-[oklch(0.65_0.2_265)] to-[oklch(0.6_0.2_300)] hover:opacity-90 h-12 px-8 text-base">
                  Start Your Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base border-border/50">
                  View Live Demo
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[oklch(0.65_0.2_265)] to-[oklch(0.6_0.2_300)] flex items-center justify-center">
                  <Target className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-display font-bold">CONDUCT</span>
              </div>
              <p className="text-xs text-muted-foreground">Conduct Projects with Intelligence.</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#methodology" className="hover:text-foreground transition-colors">Methodology</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-3">Company</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 text-center">
            <p className="text-xs text-muted-foreground">&copy; 2025 CONDUCT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const LayoutDashboard = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
  </svg>
);

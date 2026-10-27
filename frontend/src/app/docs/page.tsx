import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Brain,
  MapPin,
  Shield,
  Workflow,
  Wrench,
  Users,
} from "lucide-react";

const sections = [
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Closed-loop resolution",
    description:
      "A complaint travels from citizen submission through AI analysis, duplicate detection, priority scoring, department routing, field dispatch and verified closure.",
    href: "/docs/architecture",
    linkLabel: "Read the architecture",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "AI assistance with human control",
    description:
      "Language and vision models recommend a classification, priority and route. Every recommendation is advisory and is confirmed by an official before it takes effect.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "GIS and context enrichment",
    description:
      "PostGIS powers ward boundaries, spatial joins and proximity lookups, so each report carries location context such as nearby infrastructure and known hotspots.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Auditable by design",
    description:
      "Role-based access, ward isolation and an audit trail record who did what, when, and on which case — including each agent recommendation.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Role-specific workspaces",
    description:
      "Citizens, officers, ward representatives, field workers and administrators each get a workspace scoped to their responsibilities.",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Operations and verification",
    description:
      "Work orders, SLA tracking, evidence uploads and vision-assisted repair verification close the loop between the report and the fix on the ground.",
  },
];

const quickLinks = [
  { href: "/about", label: "About the platform" },
  { href: "/docs/architecture", label: "Architecture overview" },
  { href: "/report", label: "Report an issue" },
  { href: "/login", label: "Sign in to your workspace" },
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden py-20">
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[720px] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg">
                <BookOpen className="h-7 w-7" />
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Documentation
              </h1>
              <p className="mt-5 text-lg leading-7 text-slate-500">
                How CivicAgent receives civic reports, enriches them with AI and geospatial
                context, and coordinates a verified resolution with officials in control.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => (
                <Card key={section.title} className="h-full transition-shadow hover:shadow-card-hover">
                  <CardContent className="p-6">
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      {section.icon}
                    </span>
                    <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                    <p className="mt-1.5 text-sm text-slate-500">{section.description}</p>
                    {section.href && (
                      <Link
                        href={section.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        {section.linkLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border-soft bg-surface py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Quick links</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between rounded-xl border border-border-soft bg-canvas px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-primary-200 hover:text-primary-700"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-slate-500">
              Running the backend locally? Interactive API reference is served by the backend at
              its <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">/docs</code> path
              when <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">DEBUG=true</code>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

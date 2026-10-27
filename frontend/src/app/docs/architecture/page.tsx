import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Brain, Database, MapPin, Server, ShieldCheck } from "lucide-react";

const layers = [
  {
    icon: <Server className="h-5 w-5" />,
    title: "Frontend — Next.js App Router",
    points: [
      "File-based routing under src/app with route-level layouts",
      "Client components handle forms, maps and interactive workspaces",
      "Role-aware shells for citizen, officer, ward representative, field worker and admin views",
      "Typed API clients talk to the backend using the configured API base URL",
    ],
  },
  {
    icon: <Server className="h-5 w-5" />,
    title: "Backend — FastAPI",
    points: [
      "Layered design: API routers, Pydantic schemas, services, SQLAlchemy models",
      "Async request handling with connection pooling",
      "JWT access and refresh tokens with role-based authorisation",
      "WebSocket channels for live notifications and command-centre updates",
    ],
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Data — PostgreSQL",
    points: [
      "PostgreSQL is the system of record, migrated with Alembic",
      "PostGIS stores complaint geometry (SRID 4326) for spatial queries",
      "pgvector supports embedding-based duplicate detection",
      "Redis provides caching, queues and pub/sub for real time events",
    ],
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Intelligence — AI pipeline",
    points: [
      "Complaint classification, urgency and entity extraction",
      "Duplicate detection over embeddings and recent reports",
      "Deterministic priority scoring with configurable weights",
      "Vision-assisted verification of repair evidence",
      "Every recommendation is advisory and stored for audit",
    ],
  },
];

const flow = [
  "Citizen report",
  "AI analysis",
  "Context enrichment",
  "Priority scoring",
  "Department routing",
  "Field dispatch",
  "Verified resolution",
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Navbar />
      <main className="flex-1">
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Documentation
            </Link>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">
              Architecture overview
            </h1>
            <p className="mt-4 text-lg leading-7 text-slate-500">
              CivicAgent is a decoupled monorepo: a Next.js frontend, a FastAPI backend, and
              PostgreSQL with PostGIS and pgvector, supported by Redis and pluggable media storage.
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900">Request path</h2>
                <ol className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                  {flow.map((step, index) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-50 px-3 py-1 font-medium text-primary-700">
                        {step}
                      </span>
                      {index < flow.length - 1 && <span className="text-slate-300">→</span>}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-sm text-slate-500">
                  The frontend calls the backend API over HTTP and keeps the access token in
                  memory, restoring sessions with a refresh token. Media is referenced from
                  storage rather than stored in the database.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {layers.map((layer) => (
                <Card key={layer.title} className="h-full">
                  <CardContent className="p-6">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      {layer.icon}
                    </span>
                    <h2 className="text-lg font-semibold text-slate-900">{layer.title}</h2>
                    <ul className="mt-3 space-y-2 text-sm text-slate-500">
                      {layer.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border-soft bg-surface py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Geospatial context</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Wards, complaint locations and proximity lookups use PostGIS geometry so
                    officers can reason about where an issue is and what it affects.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Security and governance</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    JWT authentication, role-based access, ward isolation, server-side upload
                    validation and a complete audit trail protect every action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const sections = [
  {
    title: "Information we collect",
    body: [
      "Account details you provide when you register, such as your name, email address and ward.",
      "Civic reports you submit, including descriptions, categories, photos or videos, and the location you attach to a report.",
      "Operational records created while a report is handled, such as status changes, assignments, messages and resolution evidence.",
      "Basic technical information needed to operate the service, such as session tokens and request logs.",
    ],
  },
  {
    title: "How information is used",
    body: [
      "To receive, analyse, route and track civic reports through to resolution.",
      "To give citizens, officers, ward representatives, field workers and administrators the information each role needs.",
      "To detect duplicate reports, prioritise work and measure service performance.",
      "To keep an audit trail of decisions and to secure the platform.",
    ],
  },
  {
    title: "AI-assisted processing",
    body: [
      "Descriptions and evidence may be processed by language and vision models to suggest a category, urgency, priority or likely duplicate.",
      "AI output is advisory. An authorised official reviews and confirms decisions before they take effect.",
      "Model interactions are recorded as part of the case audit trail.",
    ],
  },
  {
    title: "Location information",
    body: [
      "Reports may include a precise location so the correct ward and department can respond.",
      "Location data is stored as geospatial coordinates and used for proximity and hotspot analysis.",
      "You can choose to enter a location manually where the reporting form offers that option.",
    ],
  },
  {
    title: "Sharing and access",
    body: [
      "Access is limited by role and, where configured, by ward.",
      "Information is shared with the departments and field staff responsible for resolving a report.",
      "Data is not sold. Disclosure outside the operating municipality occurs only where required by law or with your consent.",
    ],
  },
  {
    title: "Storage and retention",
    body: [
      "Data is stored in the PostgreSQL database and in the configured media storage backend for the deployment.",
      "Uploaded media is stored outside the database and referenced by a storage key.",
      "Records are retained according to the deploying organisation's retention policy and applicable law.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can review and update your profile details from your account.",
      "You can ask the operating municipality about access, correction or deletion of your personal information, subject to legal and operational retention requirements.",
    ],
  },
  {
    title: "Security",
    body: [
      "The platform uses JWT-based authentication, role-based authorisation, server-side upload validation and an audit trail.",
      "No system is perfectly secure; report suspected issues to the platform administrator for your deployment.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Navbar />
      <main className="flex-1">
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg leading-7 text-slate-500">
              This policy explains how a CivicAgent deployment handles information submitted
              through the platform. The municipality or organisation operating the deployment is
              responsible for the data it collects.
            </p>

            <div className="mt-12 space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                    {section.title}
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    {section.body.map((paragraph) => (
                      <li key={paragraph} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                        {paragraph}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-xl border border-border-soft bg-surface p-5 text-sm text-slate-600">
              Questions about this policy or your data should be directed to the administrator of
              the CivicAgent deployment you are using. See the{" "}
              <Link href="/docs" className="font-medium text-primary-600 hover:text-primary-700">
                documentation
              </Link>{" "}
              for an overview of how the platform works.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

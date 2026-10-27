import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const sections = [
  {
    title: "Using the platform",
    body: [
      "CivicAgent is provided by the municipality or organisation that operates the deployment.",
      "You may use the platform only for lawful civic reporting and for the duties attached to your account role.",
      "You are responsible for keeping your login credentials secure and for activity carried out with your account.",
    ],
  },
  {
    title: "Civic reports",
    body: [
      "Submit accurate information and only attach evidence you have the right to share.",
      "Do not submit false reports, abusive content, or material that infringes another person's rights.",
      "Reports may be analysed by automated systems for classification, duplicate detection and prioritisation, but decisions are confirmed by an authorised official.",
    ],
  },
  {
    title: "Role-based access",
    body: [
      "Citizen, officer, ward representative, field worker and administrator accounts have different permissions.",
      "Access to reports may be limited to the ward or department responsible for them.",
      "Attempting to access data or actions outside your role is not permitted.",
    ],
  },
  {
    title: "Availability and changes",
    body: [
      "The platform may be unavailable during maintenance or due to circumstances outside the operator's control.",
      "Features may change as the deployment is updated. Material changes to these terms should be published by the operator.",
    ],
  },
  {
    title: "Content and intellectual property",
    body: [
      "The CivicAgent software and its design remain the property of their respective owners.",
      "You retain ownership of the content you submit, while granting the operator the rights needed to process and resolve your report.",
    ],
  },
  {
    title: "Liability",
    body: [
      "The platform supports civic operations; it does not replace official decisions, emergency services or legal advice.",
      "To the extent permitted by law, the operator is not liable for indirect or consequential loss arising from use of the platform.",
    ],
  },
  {
    title: "Ending access",
    body: [
      "The operator may suspend or close an account that breaches these terms or creates a security risk.",
      "Records may be retained after account closure where required for audits, legal obligations or ongoing case resolution.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Navbar />
      <main className="flex-1">
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Terms of Service
            </h1>
            <p className="mt-4 text-lg leading-7 text-slate-500">
              These terms govern use of a CivicAgent deployment. By creating an account or using
              the platform, you agree to them.
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
              For questions about these terms, contact the administrator of the CivicAgent
              deployment you are using. See the{" "}
              <Link href="/docs" className="font-medium text-primary-600 hover:text-primary-700">
                documentation
              </Link>{" "}
              for platform details.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

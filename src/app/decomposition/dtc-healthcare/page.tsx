"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const criteriaScoring = [
  { filter: "Tech-starved", score: 2, justification: "Many DTC healthcare businesses operate on a patchwork of generic tools; though some vertical SaaS exists, specialized end-to-end solutions remain limited." },
  { filter: "Labor-intensive", score: 3, justification: "Fulfillment, clinical oversight, compliance, and customer service remain heavily manual and resource-intensive." },
  { filter: "Fragmented", score: 3, justification: "Highly fragmented across clinical categories, care modalities, and target populations with limited consolidation." },
  { filter: "Overlooked", score: 2, justification: "Significant capital has chased DTC healthcare recently, but much is concentrated in a few crowded categories (e.g. men&apos;s health, weight loss), leaving many niches underexplored." },
  { filter: "Capital-efficient", score: 2, justification: "Can be capital-efficient with strong unit economics at smaller scale but often requires significant upfront investment in marketing, compliance, and fulfillment." },
];

const subsegmentation = [
  { subsegment: "Condition-specific DTC", description: "Focused on narrow therapeutic areas (e.g. hair loss, ED, dermatology, contraception)", notes: "Heavily penetrated in some categories; others remain underserved." },
  { subsegment: "Preventive / Wellness", description: "Supplements, longevity, preventive screenings, general health optimization", notes: "Large consumer interest; compliance lower than clinical categories." },
  { subsegment: "Chronic Condition Mgmt", description: "Ongoing management for chronic diseases (e.g. diabetes, hypertension)", notes: "Payer models emerging but many remain cash-pay DTC." },
  { subsegment: "Mental Health", description: "Therapy, coaching, behavioral programs, medication mgmt for mental health", notes: "Increasingly competitive but significant unmet demand." },
  { subsegment: "Women&apos;s Health", description: "Fertility, menopause, hormonal health, gynecologic care", notes: "Growing but still highly fragmented with clinical complexities." },
  { subsegment: "Pediatric / Adolescent", description: "Youth-focused care across physical and mental health", notes: "Emerging but limited focus; parental involvement adds complexity." },
  { subsegment: "Senior / Geriatric", description: "Aging-in-place support, medication mgmt, chronic care for seniors", notes: "High friction on caregiver integration and clinical compliance." },
  { subsegment: "Procedural / Surgical Adj", description: "Pre/post surgical care, recovery programs, physical therapy", notes: "Often overlooked for tech enablement; requires clinical involvement." },
];

const masterWorkflowList = [
  { workflow: "Patient Intake", description: "Onboarding, medical history, consent collection", currentTooling: "Forms, Typeform, Google Forms", vendors: "IntakeQ, Phreesia" },
  { workflow: "Telehealth Scheduling", description: "Booking clinical consults (sync/async)", currentTooling: "Calendly, Excel", vendors: "Mend, NexHealth, Updox" },
  { workflow: "Clinical Documentation", description: "SOAP notes, charting, care plans", currentTooling: "Manual notes, EHRs", vendors: "Elation, Jane, SimplePractice" },
  { workflow: "ePrescribing & Orders", description: "Medication, labs, device fulfillment", currentTooling: "Point solutions", vendors: "Truepill, Alto, Capsule" },
  { workflow: "Fulfillment Coordination", description: "Pharmacy drop-shipping, lab kit logistics", currentTooling: "Partner-managed", vendors: "Ro Pharmacy, Everlywell, Thirty Madison" },
  { workflow: "Compliance Management", description: "HIPAA, informed consent, regulatory recordkeeping", currentTooling: "Manual audits, basic checklists", vendors: "Accountable, MedStack" },
  { workflow: "Patient Communications", description: "Ongoing messaging, support, follow-ups", currentTooling: "Email, SMS, CRM", vendors: "Klara, Artera, Twilio" },
  { workflow: "Billing & Payment", description: "Payment capture, subscription mgmt, refunds", currentTooling: "Stripe, Chargebee", vendors: "Hint, Recurly" },
  { workflow: "Customer Service", description: "Non-clinical support, logistics, refunds, troubleshooting", currentTooling: "Email, Zendesk", vendors: "Freshdesk, Gorgias" },
  { workflow: "Outcome Tracking", description: "Measuring treatment efficacy, ongoing monitoring", currentTooling: "Surveys, apps", vendors: "Heads Up Health, Validic" },
  { workflow: "Provider Credentialing", description: "Vetting, licensing, background checks for clinical staff", currentTooling: "Manual, spreadsheets", vendors: "Medallion, Verifiable" },
  { workflow: "Inventory Management", description: "Tracking lab kits, medications, fulfillment items", currentTooling: "Excel, vendor platforms", vendors: "ShipBob, Stord" },
];

const functionalGroupings = [
  "1. Service & Clinical Operations",
  "2. Compliance & Credentialing",
  "3. Customer Comms & Support",
  "4. Billing & Financial Operations",
];

const workflowMatrices = [
  {
    title: "Category: Service & Clinical Operations",
    workflows: [
      { workflow: "Patient Intake", conditionSpecific: "Generic Tools", preventive: "Generic Tools", chronic: "Generic Tools", mental: "Generic Tools", womens: "Generic Tools", pediatric: "Generic Tools", senior: "Generic Tools", procedural: "Generic Tools", competitors: "IntakeQ, Phreesia" },
      { workflow: "Telehealth Scheduling", conditionSpecific: "Generic Tools", preventive: "Generic Tools", chronic: "SaaS", mental: "SaaS", womens: "Generic Tools", pediatric: "Generic Tools", senior: "Generic Tools", procedural: "Generic Tools", competitors: "Mend, Updox" },
      { workflow: "Clinical Documentation", conditionSpecific: "Manual + SaaS", preventive: "SaaS", chronic: "SaaS", mental: "SaaS", womens: "SaaS", pediatric: "SaaS", senior: "SaaS", procedural: "Manual", competitors: "Elation, Jane" },
      { workflow: "Outcome Tracking", conditionSpecific: "Limited / Ad Hoc", preventive: "Limited", chronic: "Limited", mental: "Some SaaS", womens: "Limited", pediatric: "Limited", senior: "Limited", procedural: "Limited", competitors: "Heads Up Health" },
      { workflow: "Fulfillment Coordination", conditionSpecific: "Integrated / Partner", preventive: "Integrated / Partner", chronic: "Integrated / Partner", mental: "Partnered", womens: "Partnered", pediatric: "Limited", senior: "Limited", procedural: "Limited", competitors: "Truepill, Thirty Madison" },
    ],
  },
  {
    title: "Category: Compliance & Credentialing",
    workflows: [
      { workflow: "Compliance Management", conditionSpecific: "Manual / Paper", preventive: "Manual", chronic: "Manual", mental: "Manual", womens: "Manual", pediatric: "Manual", senior: "Manual", procedural: "Manual", competitors: "Accountable, MedStack" },
      { workflow: "Provider Credentialing", conditionSpecific: "Manual", preventive: "Manual", chronic: "Manual", mental: "SaaS", womens: "Manual", pediatric: "Manual", senior: "Manual", procedural: "Manual", competitors: "Medallion, Verifiable" },
    ],
  },
  {
    title: "Category: Customer Comms & Support",
    workflows: [
      { workflow: "Patient Communications", conditionSpecific: "CRM / SMS", preventive: "CRM / SMS", chronic: "CRM / SMS", mental: "CRM / SMS", womens: "CRM / SMS", pediatric: "CRM / SMS", senior: "CRM / SMS", procedural: "CRM / SMS", competitors: "Klara, Artera" },
      { workflow: "Customer Service", conditionSpecific: "Email, CRM", preventive: "Email, CRM", chronic: "CRM", mental: "CRM", womens: "CRM", pediatric: "CRM", senior: "CRM", procedural: "CRM", competitors: "Zendesk, Gorgias" },
    ],
  },
  {
    title: "Category: Billing & Financial Operations",
    workflows: [
      { workflow: "Billing & Payment", conditionSpecific: "Stripe, Chargebee", preventive: "Stripe, SaaS", chronic: "Chargebee", mental: "SaaS", womens: "Stripe, Chargebee", pediatric: "Stripe, Chargebee", senior: "Stripe, Chargebee", procedural: "Stripe, Chargebee", competitors: "Hint, Recurly" },
    ],
  },
];

const topPairs = [
  {
    title: "Opportunity 1: Procedural / Surgical Adj x Outcome Tracking",
    criteria: [
      { item: "Product whitespace", notes: "Limited digital recovery tracking protocols" },
      { item: "Business whitespace", notes: "Growing demand for objective post-surgical outcome data" },
      { item: "Operational leverage", notes: "High, protocolizable recovery pathways" },
      { item: "ACV estimate", notes: "$10-15K per surgical center per year" },
      { item: "Customers at scale", notes: "~4,000 outpatient surgical centers" },
      { item: "Market size", notes: "$50-60M" },
      { item: "Price sensitivity", notes: "Low if tied to reimbursement, quality metrics" },
      { item: "Known competitors", notes: "Force Therapeutics (partial), few startups" },
    ],
  },
  {
    title: "Opportunity 2: Senior x Compliance Mgmt",
    criteria: [
      { item: "Product whitespace", notes: "No scalable, proactive compliance automation" },
      { item: "Business whitespace", notes: "Multi-site assisted living operators need scalable solutions" },
      { item: "Operational leverage", notes: "High standardization potential across facilities" },
      { item: "ACV estimate", notes: "$10K per operator per year" },
      { item: "Customers at scale", notes: "~12,000 assisted living operators" },
      { item: "Market size", notes: "$120M+" },
      { item: "Price sensitivity", notes: "Medium; linked to audit risk and fines" },
      { item: "Known competitors", notes: "Accountable, MedStack (low penetration)" },
    ],
  },
  {
    title: "Opportunity 3: Chronic Condition Mgmt x Fulfillment Coordination",
    criteria: [
      { item: "Product whitespace", notes: "Fragmented pharmacy + lab logistics" },
      { item: "Business whitespace", notes: "Integrated fulfillment tightly aligned with clinical care plans" },
      { item: "Operational leverage", notes: "High across multi-location clinic groups" },
      { item: "ACV estimate", notes: "$20-25K per clinic network per year" },
      { item: "Customers at scale", notes: "~2,000 integrated primary/chronic care groups" },
      { item: "Market size", notes: "$40-50M" },
      { item: "Price sensitivity", notes: "Low; tied to retention, adherence, and margin" },
      { item: "Known competitors", notes: "Truepill (partial), Thirty Madison (internalized models)" },
    ],
  },
];

const buyerPersonas = [
  { buyer: "Healthcare Professional (HCP)", workflowOwned: "Clinical Documentation, ePrescribing, Outcome Tracking", contextOfPain: "Time-consuming, paper-based processes, fragmented data", budgetControl: "Limited, tied to reimbursement", notes: "Need for streamlined, compliant workflows, real-time data insights" },
  { buyer: "Patient / Consumer", workflowOwned: "Patient Intake, Telehealth Scheduling, Fulfillment Coordination", contextOfPain: "Frustrated with fragmented care, manual processes", budgetControl: "Variable, depending on treatment type", notes: "Expecting seamless, personalized experiences with direct access to care" },
  { buyer: "Payer / Insurance Company", workflowOwned: "Compliance Management, Patient Communications, Billing & Payment", contextOfPain: "High administrative burden, fraud risk, non-compliance penalties", budgetControl: "Limited, tied to negotiated rates", notes: "Need for robust, scalable solutions to manage risk and costs" },
  { buyer: "Supplier / Vendor", workflowOwned: "Inventory Management, Fulfillment Coordination, Patient Communications", contextOfPain: "Manual, fragmented processes, limited visibility", budgetControl: "Variable, based on contract terms", notes: "Looking for efficient, reliable partners to manage supply chains and patient engagement" },
];

const getScoreColor = (score: number) => {
  if (score === 3) return "bg-green-100 text-green-800 border-green-200";
  if (score === 2) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-red-100 text-red-800 border-red-200";
};
const getToolingColor = (tooling: string) => {
  if (tooling.includes("SaaS") || tooling.includes("Vertical")) return "bg-green-100 text-green-800";
  if (tooling.includes("Excel") || tooling.includes("Manual")) return "bg-yellow-100 text-yellow-800";
  if (tooling.includes("Paper") || tooling.includes("Binders")) return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
};

const getAccessibilityColor = (accessibility: string) => {
  if (accessibility.includes("Very High") || accessibility.includes("Extremely High")) return "bg-green-100 text-green-800";
  if (accessibility.includes("High")) return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
};
const getComplexityColor = (complexity: string) => {
  if (/Labs|Protocol|Adherence|Monitoring|Optimization|Evaluation/i.test(complexity)) return "bg-yellow-100 text-yellow-800";
  if (/Personalization|Multi-system|Behavioral|Trigger/i.test(complexity)) return "bg-blue-100 text-blue-800";
  return "bg-gray-100 text-gray-800";
};
const getCompetitorColor = () => "bg-blue-100 text-blue-800";

export default function IndustryDecompositionDTCHC() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky header: full width, matches all other updated pages */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 mb-8 px-1 py-1 shadow-sm flex items-center justify-between h-12 sm:h-auto sm:px-2 sm:py-3 w-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full p-2 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex-1 flex justify-center">
          <Image
            src="/logo.png"
            alt="InVitro Capital Logo"
            className="h-7 w-auto sm:h-12"
            style={{ objectFit: 'contain' }}
            width={180}
            height={48}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-2 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]"
          onClick={() => {
            window.open('/Industry Decomposition- DTC Healthcare.pdf', '_blank');
          }}
          aria-label="Download PDF"
        >
          <Download className="w-6 h-6" />
        </Button>
      </div>
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Decomposition: DTC Healthcare</h1>
          <div className="flex justify-center gap-4 mb-2">
            <span className="text-sm text-muted-foreground">Published: 2024</span>
            <span className="text-sm text-muted-foreground">Format: PDF available</span>
          </div>
        </div>
        {/* I. InVitro Criteria Scoring */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">I. InVitro Criteria Scoring</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Filter</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900 min-w-[120px]">Score (1–3)</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Justification</th>
                </tr>
              </thead>
              <tbody>
                {criteriaScoring.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.filter}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center min-w-[120px]">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${getScoreColor(row.score)}`}>{row.score}</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.justification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* II. MECE Subsegmentation of the Industry */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">II. MECE Subsegmentation of the Industry</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Subsegment</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                </tr>
              </thead>
              <tbody>
                {subsegmentation.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.subsegment}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.description}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* III. Workflow Decomposition */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">III. Workflow Decomposition</h2>
          {/* A. Master Workflow List */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">A. Master Workflow List</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Workflow Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Current Tooling</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Known Vendors / Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {masterWorkflowList.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.workflow}</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.description}</td>
                      <td className={`border border-gray-300 px-4 py-3 text-gray-700`}>
                        <span className={`inline-block px-2 py-1 rounded ${getToolingColor(row.currentTooling)}`}>{row.currentTooling}</span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.vendors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* B. Group Workflows into Functional Categories */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">B. Group Workflows into Functional Categories</h3>
            <ul className="list-disc pl-6 text-gray-800">
              {functionalGroupings.map((item, idx) => (
                <li key={idx} className="mb-2">{item}</li>
              ))}
            </ul>
          </div>
          {/* C. Build Workflow Matrices by Subsegment */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">C. Build Workflow Matrices by Subsegment</h3>
            {workflowMatrices.map((matrix, idx) => (
              <div key={idx} className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{matrix.title}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Workflow</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Condition-specific</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Preventive</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Chronic</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Mental</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Women&apos;s Health</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Pediatric</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Senior</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Procedural</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Competitors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matrix.workflows.map((row, jdx) => (
                        <tr key={jdx} className={jdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.workflow}</td>
                          <td className={`border border-gray-300 px-4 py-3 text-gray-700`}><span className={`inline-block px-2 py-1 rounded ${getToolingColor(row.conditionSpecific)}`}>{row.conditionSpecific}</span></td>
                          <td className={`border border-gray-300 px-4 py-3 text-gray-700`}><span className={`inline-block px-2 py-1 rounded ${getToolingColor(row.preventive)}`}>{row.preventive}</span></td>
                          <td className={`border border-gray-300 px-4 py-3 text-gray-700`}><span className={`inline-block px-2 py-1 rounded ${getToolingColor(row.chronic)}`}>{row.chronic}</span></td>
                          <td className={`border border-gray-300 px-4 py-3 text-gray-700`}><span className={`inline-block px-2 py-1 rounded ${getToolingColor(row.mental)}`}>{row.mental}</span></td>
                          <td className={`border border-gray-300 px-4 py-3 text-gray-700`}><span className={`inline-block px-2 py-1 rounded ${getToolingColor(row.womens)}`}>{row.womens}</span></td>
                          <td className={`border border-gray-300 px-4 py-3 text-gray-700`}><span className={`inline-block px-2 py-1 rounded ${getToolingColor(row.pediatric)}`}>{row.pediatric}</span></td>
                          <td className={`border border-gray-300 px-4 py-3 text-gray-700`}><span className={`inline-block px-2 py-1 rounded ${getToolingColor(row.senior)}`}>{row.senior}</span></td>
                          <td className={`border border-gray-300 px-4 py-3 text-gray-700`}><span className={`inline-block px-2 py-1 rounded ${getToolingColor(row.procedural)}`}>{row.procedural}</span></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.competitors}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* IV. Evaluate Top Subsegment + Workflow Pairs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">IV. Evaluate Top Subsegment + Workflow Pairs</h2>
          {topPairs.map((pair, idx) => (
            <div key={idx} className="mb-8 p-6 bg-blue-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{pair.title}</h3>
              <table className="w-full border-collapse border border-gray-300 mb-2">
                <tbody>
                  {pair.criteria.map((row, jdx) => (
                    <tr key={jdx} className={jdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800 w-1/3">{row.item}</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </section>
        {/* V. Condition-Specific DTC Deep Dive (Accessibility & Complexity Map) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">V. Condition-Specific DTC Deep Dive (Accessibility & Complexity Map)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Condition</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Common Medicines / Interventions</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Accessibility</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Clinical Complexity</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Competitors</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { condition: "Erectile Dysfunction", medicines: "Sildenafil, Tadalafil", accessibility: "Very High", complexity: "Personalization, underlying etiologies", competitors: "Hims, Roman, BlueChew" },
                  { condition: "Hair Loss (Male)", medicines: "Finasteride, Minoxidil", accessibility: "Very High", complexity: "Adherence, optimization", competitors: "Hims, Keeps, Roman" },
                  { condition: "Acne", medicines: "Tretinoin, Clindamycin, Benzoyl Peroxide", accessibility: "Very High", complexity: "Titration, monitoring", competitors: "Curology, Apostrophe" },
                  { condition: "Hyperpigmentation", medicines: "Hydroquinone, Retinoids", accessibility: "High", complexity: "Visual tracking, adaptive regimens", competitors: "Musely, Hers" },
                  { condition: "Weight Loss", medicines: "GLP-1, lifestyle", accessibility: "Very High", complexity: "Maintenance, lifestyle integration", competitors: "Ro, Calibrate, Found" },
                  { condition: "Hormonal Acne (Women)", medicines: "Spironolactone, OCP", accessibility: "Very High", complexity: "Labs, cycle-based adjustment", competitors: "Nurx, Hers" },
                  { condition: "Menopause", medicines: "HRT", accessibility: "High", complexity: "Multi-system management", competitors: "Evernow, Midi" },
                  { condition: "Sleep Disorders", medicines: "CBT-I, Melatonin", accessibility: "High", complexity: "Behavioral support", competitors: "Cerebral" },
                  { condition: "Dermatologic Aging", medicines: "Tretinoin, peptides", accessibility: "High", complexity: "Protocol optimization", competitors: "Curology, Hers" },
                  { condition: "Allergies", medicines: "Immunotherapy", accessibility: "High", complexity: "Adherence, outcomes", competitors: "Wyndly" },
                  { condition: "Migraine", medicines: "Triptans, CGRP", accessibility: "Very High", complexity: "Trigger management", competitors: "Cove, Nurx" },
                  { condition: "Hair Loss (Female)", medicines: "Spironolactone, Minoxidil", accessibility: "High", complexity: "Hormonal evaluation", competitors: "Hers, Nutrafol" },
                  { condition: "Birth Control", medicines: "OCP, devices", accessibility: "Extremely High", complexity: "Side effect management", competitors: "Nurx, Hers, Pill Club" },
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.condition}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.medicines}</td>
                    <td className={`border border-gray-300 px-4 py-3`}><span className={`inline-block px-2 py-1 rounded ${getAccessibilityColor(row.accessibility)}`}>{row.accessibility}</span></td>
                    <td className={`border border-gray-300 px-4 py-3`}><span className={`inline-block px-2 py-1 rounded ${getComplexityColor(row.complexity)}`}>{row.complexity}</span></td>
                    <td className={`border border-gray-300 px-4 py-3`}><span className={`inline-block px-2 py-1 rounded ${getCompetitorColor()}`}>{row.competitors}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* VI. Condition-Specific DTC Build Opportunities (Quantified) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">VI. Condition-Specific DTC Build Opportunities (Quantified)</h2>
          <div className="space-y-8">
            {[
              {
                title: "1. Hormonal Acne (Women)",
                points: [
                  "Product whitespace: No integrated hormone labs + titration model",
                  "Business whitespace: Persistent dissatisfaction with trial-and-error prescribing",
                  "Operational leverage: High protocolization",
                  "ACV: $350/year",
                  "Scale: ~2M patients",
                  "Market: ~$700M",
                  "Price sensitivity: Medium",
                  "Competitors: Nurx, Hers",
                ],
              },
              {
                title: "2. Migraine Management",
                points: [
                  "Product whitespace: No integrated trigger tracking, wearables",
                  "Business whitespace: Acute care saturated; prevention underserved",
                  "Operational leverage: High",
                  "ACV: $400/year",
                  "Scale: ~4M patients",
                  "Market: ~$1.6B",
                  "Price sensitivity: Low",
                  "Competitors: Cove, Nurx",
                ],
              },
              {
                title: "3. Pigmentary & Aging Skin",
                points: [
                  "Product whitespace: No longitudinal visual tracking, limited multi-agent protocols",
                  "Business whitespace: High demand for measurable results",
                  "Operational leverage: High",
                  "ACV: $300/year",
                  "Scale: ~3M patients",
                  "Market: ~$900M",
                  "Price sensitivity: Medium-High",
                  "Competitors: Musely, Hers",
                ],
              },
            ].map((op, idx) => (
              <div key={idx} className="bg-blue-50 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{op.title}</h3>
                <ul className="list-disc pl-6 text-gray-800 space-y-1">
                  {op.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        {/* VII. Buyer Personas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">VII. Buyer Personas</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Buyer Title / Role</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Workflow Owned</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Context of Pain</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Budget Control</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                </tr>
              </thead>
              <tbody>
                {buyerPersonas.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.buyer}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.workflowOwned}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.contextOfPain}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.budgetControl}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
} 
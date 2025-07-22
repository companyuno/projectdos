"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const criteriaScoring = [
  { filter: "Tech-starved", score: 2, justification: "While large contractors have adopted some tech, much of the industry remains dependent on spreadsheets, manual processes, and legacy tools." },
  { filter: "Labor-intensive", score: 3, justification: "Construction is heavily reliant on skilled and unskilled labor across all phases, with chronic labor shortages." },
  { filter: "Fragmented", score: 3, justification: "The industry is extremely fragmented across geographies, project types, subcontractors, and suppliers." },
  { filter: "Overlooked", score: 2, justification: "Significant investment has flowed into high-profile segments (e.g. project management), but many workflows remain underserved." },
  { filter: "Capital-efficient", score: 2, justification: "Software opportunities exist, but many workflows are complex and require integration with offline or physical processes, limiting pure-play SaaS simplicity." },
];

const subsegmentation = [
  { subsegment: "Commercial General Contractors", description: "Mid- to large-scale projects (offices, infrastructure, retail, mixed-use)", notes: "High complexity, coordination across trades" },
  { subsegment: "Residential Builders", description: "Single-family and multifamily homebuilders", notes: "Large volume of small-scale projects" },
  { subsegment: "Specialty Subcontractors", description: "Electrical, HVAC, plumbing, concrete, framing, etc.", notes: "Many small operators, highly specialized" },
  { subsegment: "Suppliers / Distributors", description: "Materials suppliers, equipment rentals, aggregates", notes: "Mix of regional and national players" },
  { subsegment: "Owners / Developers", description: "Capital providers, real estate developers", notes: "Drive projects but outsource execution" },
  { subsegment: "Facilities Maintenance / Service Contractors", description: "Ongoing post-construction services", notes: "Growing segment as built environment ages" },
];

const masterWorkflowList = [
  { workflow: "Bid Estimation", description: "Create project cost estimates, labor, and materials", currentTooling: "Excel, legacy estimating software", vendors: "ProEst, STACK, Sage Estimating" },
  { workflow: "Scheduling & Project Planning", description: "Gantt charts, critical path management", currentTooling: "Primavera, MS Project, Excel", vendors: "Oracle Primavera, Procore Scheduling" },
  { workflow: "Subcontractor Coordination", description: "Track multiple subs on site and phase timing", currentTooling: "Email, spreadsheets, phone", vendors: "Procore, Buildertrend" },
  { workflow: "Permitting & Compliance", description: "Manage regulatory approvals, inspections", currentTooling: "Manual submission, local portals", vendors: "Accela (gov side), ePermitHub" },
  { workflow: "Labor Management", description: "Time tracking, crew scheduling, certifications", currentTooling: "Paper timesheets, standalone apps", vendors: "Rhumbix, LaborChart, BusyBusy" },
  { workflow: "Procurement", description: "Source and purchase materials, track delivery", currentTooling: "Phone, email, spreadsheets", vendors: "Kojo, Levelset, BuildOps" },
  { workflow: "Equipment Tracking", description: "Manage rentals, owned assets, usage logs", currentTooling: "Manual logs, spreadsheets", vendors: "Tenna, Trackunit" },
  { workflow: "Safety & Incident Reporting", description: "OSHA compliance, near-miss logs, training", currentTooling: "Paper forms, standalone apps", vendors: "SafetyCulture, Smartvid.io" },
  { workflow: "Progress Reporting", description: "Daily logs, photo documentation, milestones", currentTooling: "Paper, spreadsheets, phone photos", vendors: "Raken, Procore Daily Logs" },
  { workflow: "Invoicing & Payments", description: "Generate, submit, and reconcile payments", currentTooling: "Excel, QuickBooks", vendors: "GCPay, Billd, Textura" },
  { workflow: "Change Order Management", description: "Document and approve scope changes", currentTooling: "Email, spreadsheets", vendors: "Procore, eSub" },
  { workflow: "Closeout & Punch List", description: "Final inspections, handover docs, warranty", currentTooling: "Paper checklists, Excel", vendors: "Buildium, PlanGrid" },
  { workflow: "Warranty & Post-Completion Support", description: "Service requests, defect management", currentTooling: "Ad hoc emails", vendors: "BuildOps, ServiceTitan" },
];

const functionalGroupings = [
  "1. Project Execution & Coordination",
  "2. Labor & Workforce Management",
  "3. Procurement & Supply Chain",
  "4. Compliance, Documentation & Closeout",
  "5. Financial Operations",
];

const workflowMatrices = [
  {
    title: "Category: Project Execution & Coordination",
    workflows: [
      { workflow: "Scheduling & Planning", commercialGC: "Vertical SaaS", residentialBuilder: "Excel", subcontractor: "Excel", suppliers: "N/A", developers: "Excel", competitors: "Procore, MS Project" },
      { workflow: "Sub Coordination", commercialGC: "Vertical SaaS", residentialBuilder: "Manual/Ad hoc", subcontractor: "Manual", suppliers: "N/A", developers: "N/A", competitors: "Buildertrend, Procore" },
      { workflow: "Progress Reporting", commercialGC: "Vertical SaaS", residentialBuilder: "Excel/Ad hoc", subcontractor: "Excel", suppliers: "N/A", developers: "N/A", competitors: "Raken, Procore" },
      { workflow: "Change Orders", commercialGC: "Vertical SaaS", residentialBuilder: "Excel", subcontractor: "Excel", suppliers: "N/A", developers: "N/A", competitors: "Procore, eSub" },
      { workflow: "Closeout & Punch", commercialGC: "SaaS / Manual", residentialBuilder: "Excel", subcontractor: "Excel", suppliers: "N/A", developers: "N/A", competitors: "PlanGrid" },
    ],
  },
  {
    title: "Category: Labor & Workforce Management",
    workflows: [
      { workflow: "Time Tracking", commercialGC: "SaaS", residentialBuilder: "Manual", subcontractor: "Manual", suppliers: "N/A", developers: "N/A", competitors: "Rhumbix, BusyBusy" },
      { workflow: "Crew Scheduling", commercialGC: "SaaS", residentialBuilder: "Manual", subcontractor: "Ad hoc", suppliers: "N/A", developers: "N/A", competitors: "LaborChart" },
      { workflow: "Certifications", commercialGC: "SaaS", residentialBuilder: "Manual", subcontractor: "Paper files", suppliers: "N/A", developers: "N/A", competitors: "NCCER, Procore" },
      { workflow: "Safety Reporting", commercialGC: "SaaS", residentialBuilder: "Paper", subcontractor: "Paper", suppliers: "N/A", developers: "N/A", competitors: "SafetyCulture, Smartvid.io" },
    ],
  },
  {
    title: "Category: Procurement & Supply Chain",
    workflows: [
      { workflow: "Materials Procurement", commercialGC: "SaaS / Phone", residentialBuilder: "Phone", subcontractor: "Phone", suppliers: "N/A", developers: "N/A", competitors: "Kojo, Levelset" },
      { workflow: "Equipment Tracking", commercialGC: "SaaS / Manual", residentialBuilder: "Manual", subcontractor: "Manual", suppliers: "SaaS", developers: "N/A", competitors: "Tenna, Trackunit" },
      { workflow: "Vendor Payments", commercialGC: "Manual", residentialBuilder: "Manual", subcontractor: "Manual", suppliers: "SaaS", developers: "SaaS", competitors: "Billd, GCPay" },
    ],
  },
  {
    title: "Category: Compliance, Documentation & Closeout",
    workflows: [
      { workflow: "Permitting", commercialGC: "Manual", residentialBuilder: "Manual", subcontractor: "Manual", suppliers: "N/A", developers: "SaaS / Manual", competitors: "Accela" },
      { workflow: "Daily Logs", commercialGC: "SaaS", residentialBuilder: "Excel", subcontractor: "Excel", suppliers: "N/A", developers: "N/A", competitors: "Raken, Procore" },
      { workflow: "Warranty Support", commercialGC: "SaaS", residentialBuilder: "Manual", subcontractor: "Manual", suppliers: "N/A", developers: "SaaS", competitors: "BuildOps, ServiceTitan" },
    ],
  },
  {
    title: "Category: Financial Operations",
    workflows: [
      { workflow: "Invoicing", commercialGC: "SaaS / Manual", residentialBuilder: "Excel", subcontractor: "Excel", suppliers: "SaaS", developers: "SaaS", competitors: "GCPay, Textura" },
      { workflow: "Change Orders", commercialGC: "SaaS / Manual", residentialBuilder: "Excel", subcontractor: "Excel", suppliers: "N/A", developers: "N/A", competitors: "eSub" },
      { workflow: "Payment Reconciliation", commercialGC: "SaaS / Manual", residentialBuilder: "Excel", subcontractor: "Excel", suppliers: "SaaS", developers: "SaaS", competitors: "Billd" },
    ],
  },
];

const topPairs = [
  {
    title: "Opportunity 1: Subcontractors x Labor Management",
    criteria: [
      { item: "Product whitespace", notes: "Highly manual, fragmented adoption, few solutions tailored for small subs" },
      { item: "Business whitespace", notes: "Low price point SaaS feasible, viral adoption via crews" },
      { item: "Operational leverage", notes: "High (subscription model, low-touch onboarding)" },
      { item: "ACV estimate $", notes: "$~1,000 - $5,000" },
      { item: "# customers at scale", notes: "250K+ subcontractor firms" },
      { item: "Market size = ACV x customers", notes: "$250M - $1.25B" },
      { item: "Price sensitivity", notes: "Medium to high" },
      { item: "Known competitors", notes: "BusyBusy, Rhumbix (mostly upmarket), labor apps" },
    ],
  },
  {
    title: "Opportunity 2: Residential Builders x Procurement",
    criteria: [
      { item: "Product whitespace", notes: "Mostly phone, email, or informal dealer networks" },
      { item: "Business whitespace", notes: "Workflow-centric procurement SaaS with supplier integration" },
      { item: "Operational leverage", notes: "Medium" },
      { item: "ACV estimate $", notes: "$5,000 - $20,000" },
      { item: "# customers at scale", notes: "~50K small-to-mid builders" },
      { item: "Market size = ACV x customers", notes: "$250M - $1B" },
      { item: "Price sensitivity", notes: "Medium" },
      { item: "Known competitors", notes: "Kojo (mostly commercial), Levelset (payments)" },
    ],
  },
  {
    title: "Opportunity 3: Developers x Closeout Documentation",
    criteria: [
      { item: "Product whitespace", notes: "Closeout documentation remains fragmented, late-stage pain point" },
      { item: "Business whitespace", notes: "SaaS solution aggregating punch, warranty, turnover docs" },
      { item: "Operational leverage", notes: "High (centralized data vault)" },
      { item: "ACV estimate $", notes: "$10,000 - $50,000" },
      { item: "# customers at scale", notes: "10K+ active developers" },
      { item: "Market size = ACV x customers", notes: "$100M - $500M" },
      { item: "Price sensitivity", notes: "Low" },
      { item: "Known competitors", notes: "PlanGrid (limited focus), Procore (partial), mostly spreadsheets" },
    ],
  },
];

const buyerPersonas = [
  { buyer: "Owner/Principal (Subcontractor)", workflowOwned: "Labor management", contextOfPain: "Time theft, no visibility, poor scheduling", budgetControl: "Yes", notes: "Often owner-operated businesses" },
  { buyer: "Procurement Manager (Residential Builder)", workflowOwned: "Materials procurement", contextOfPain: "Cost overruns, shortages, delays", budgetControl: "Partial", notes: "Works with dealers and suppliers" },
  { buyer: "Project Director (Developer)", workflowOwned: "Closeout & punch", contextOfPain: "Delayed turnover, asset handover risk", budgetControl: "Yes", notes: "Directly tied to financing milestones" },
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

export default function IndustryDecompositionConstructionTech() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 w-full shadow-sm flex items-center justify-between h-20 px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full p-3 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]"
          aria-label="Back"
        >
          <ArrowLeft className="w-7 h-7" />
        </Button>
        <div className="flex-1 flex justify-center">
          <Image
            src="/logo.png"
            alt="InVitro Capital Logo"
            className="h-16 w-auto"
            style={{ objectFit: 'contain' }}
            width={180}
            height={48}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-3 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]"
          onClick={() => {
            window.open('/Industry Decomposition Construction Tech.pdf', '_blank');
          }}
          aria-label="Download PDF"
        >
          <Download className="w-7 h-7" />
        </Button>
      </div>
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Decomposition: Construction Tech</h1>
          <div className="flex justify-center gap-4 mb-2">
            <span className="text-sm text-muted-foreground">Published: 2024</span>
            <span className="text-sm text-muted-foreground">Format: PDF available</span>
          </div>
        </div>
        {/* Criteria Scoring */}
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
        {/* Subsegmentation */}
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
        {/* Workflow Decomposition */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">III. Workflow Decomposition</h2>
          {/* Master Workflow List */}
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
                      <td className="border border-gray-300 px-4 py-3"><span className={`px-2 py-1 rounded text-sm ${getToolingColor(row.currentTooling)}`}>{row.currentTooling}</span></td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.vendors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Functional Groupings */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">B. Group Workflows into Functional Categories</h3>
            <div className="bg-accent/10 p-6 rounded-lg">
              <ul className="space-y-2">
                {functionalGroupings.map((group, idx) => (
                  <li key={idx} className="text-gray-700 font-medium">{group}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Workflow Matrices */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">C. Build Workflow Matrices by Subsegment</h3>
            <div className="space-y-8">
              {workflowMatrices.map((category, catIdx) => (
                <div key={catIdx} className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.title}</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 bg-white">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900 text-sm">Workflow</th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-900 text-sm">Commercial GC</th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-900 text-sm">Residential Builder</th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-900 text-sm">Subcontractor</th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-900 text-sm">Suppliers</th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-900 text-sm">Developers</th>
                          <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900 text-sm">Competitors</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.workflows.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border border-gray-300 px-3 py-2 font-medium text-gray-800 text-sm">{row.workflow}</td>
                            <td className="border border-gray-300 px-3 py-2 text-center"><span className={`px-2 py-1 rounded text-xs ${getToolingColor(row.commercialGC)}`}>{row.commercialGC}</span></td>
                            <td className="border border-gray-300 px-3 py-2 text-center"><span className={`px-2 py-1 rounded text-xs ${getToolingColor(row.residentialBuilder)}`}>{row.residentialBuilder}</span></td>
                            <td className="border border-gray-300 px-3 py-2 text-center"><span className={`px-2 py-1 rounded text-xs ${getToolingColor(row.subcontractor)}`}>{row.subcontractor}</span></td>
                            <td className="border border-gray-300 px-3 py-2 text-center"><span className={`px-2 py-1 rounded text-xs ${getToolingColor(row.suppliers)}`}>{row.suppliers}</span></td>
                            <td className="border border-gray-300 px-3 py-2 text-center"><span className={`px-2 py-1 rounded text-xs ${getToolingColor(row.developers)}`}>{row.developers}</span></td>
                            <td className="border border-gray-300 px-3 py-2 text-gray-700 text-sm">{row.competitors}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Top Subsegment × Workflow Pairs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">IV. Evaluate Top Subsegment + Workflow Pairs</h2>
          <div className="space-y-8">
            {topPairs.map((pair, idx) => (
              <div key={idx} className="bg-gradient-to-r from-accent/10 to-indigo-50 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">{pair.title}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 bg-white">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Criteria</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pair.criteria.map((criterion, cidx) => (
                        <tr key={cidx} className={cidx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{criterion.item}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{criterion.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Buyer Personas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">V. Buyer Personas</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Buyer Title / Role</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Workflow Owned</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Context of Pain</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Budget Control</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                </tr>
              </thead>
              <tbody>
                {buyerPersonas.map((persona, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{persona.buyer}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{persona.workflowOwned}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{persona.contextOfPain}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${persona.budgetControl === "Yes" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{persona.budgetControl}</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{persona.notes}</td>
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
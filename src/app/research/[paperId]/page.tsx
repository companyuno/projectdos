"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

const researchContent: Record<string, unknown> = {
  "venture-studio-methodology": {
    title: "The InVitro Venture Studio Methodology",
    category: "InVitro Build Process",
    publishDate: "2024-01-15",
    readTime: "12 min read",
    tags: ["Methodology", "Venture Studio", "Scaling"],
    summary: "Our comprehensive approach to building and scaling high-growth companies from ideation to exit.",
    content: {
      introduction:
        "The venture studio model represents a paradigm shift in how we approach company creation and scaling. Unlike traditional venture capital, our methodology involves hands-on company building from day one.",
      keyPoints: [
        "Systematic ideation and validation processes",
        "Integrated talent acquisition and team building",
        "Shared resources and operational expertise",
        "Accelerated time-to-market through proven frameworks",
      ],
      methodology:
        "Our build process consists of five key phases: Ideation & Validation, Team Assembly, Product Development, Market Entry, and Scale & Exit. Each phase has specific milestones, success metrics, and resource allocation strategies.",
    },
  },
  "ai-healthcare-transformation": {
    title: "AI-Driven Healthcare Transformation: Opportunities and Challenges",
    category: "WhitePapers",
    publishDate: "2024-02-01",
    readTime: "20 min read",
    tags: ["AI", "Healthcare", "Digital Health"],
    summary: "Comprehensive analysis of artificial intelligence applications in healthcare and their market impact.",
    content: {
      introduction:
        "Artificial intelligence is fundamentally transforming healthcare delivery, from diagnostic accuracy to personalized treatment plans. This whitepaper examines the current landscape and future opportunities.",
      keyPoints: [
        "AI diagnostic tools achieving 95%+ accuracy rates",
        "Personalized medicine through machine learning algorithms",
        "Operational efficiency improvements of 30-40%",
        "Regulatory frameworks evolving to support AI adoption",
      ],
      methodology:
        "Our analysis covers market sizing, competitive landscape, regulatory environment, and investment opportunities across AI healthcare applications.",
    },
  },
  "digital-health-thesis-2024": {
    title: "Digital Health Investment Thesis 2024",
    category: "Industry Theses",
    publishDate: "2024-01-01",
    readTime: "16 min read",
    tags: ["Digital Health", "Investment Thesis", "Market Analysis"],
    summary: "Our strategic outlook on digital health opportunities, market dynamics, and investment priorities.",
    content: {
      introduction:
        "The digital health sector continues to evolve rapidly, driven by technological advances, changing consumer behaviors, and regulatory support. Our 2024 thesis outlines key investment opportunities.",
      keyPoints: [
        "Market size projected to reach $659B by 2025",
        "Focus on preventive care and chronic disease management",
        "Integration of AI and IoT in healthcare delivery",
        "Regulatory tailwinds supporting digital health adoption",
      ],
      methodology:
        "This thesis is based on comprehensive market analysis, stakeholder interviews, and evaluation of 200+ digital health companies across various sub-sectors.",
    },
  },
  "healthcare-prescription-dtc-thesis": {
    title: "Industry Thesis: Healthcare Prescription DTC",
    category: "Industry Theses",
    publishDate: "2023-11-01",
    readTime: "18 min read",
    tags: ["Healthcare", "DTC", "Telehealth", "Prescription"],
    summary:
      "Analysis of direct-to-consumer prescription healthcare opportunities and precision drug delivery platforms.",
    content: {
      investorSummary: `Direct-to-consumer healthcare has matured past its first wave. Platforms like Hims & Hers successfully built businesses by solving access friction: providing simple intake, convenience-first prescription issuance, and fulfillment. But access has now fully commoditized across nearly every therapeutic vertical.

The next defensible layer may emerge around precision drug delivery platforms that combine dynamic clinical workflows, integrated fulfillment, and adaptive longitudinal care optimization. This model depends on tight integration between software-driven protocol engines and physical drug dispensing operations—allowing for ongoing regimen adjustments, iterative optimization, and data-informed clinical learning loops.

InVitro Capital's ownership of two pharmacies provides unique operational leverage here, but only if fulfillment is treated not as a margin line item, but as a data-capture engine that directly feeds adaptive care protocols. The thesis is not "owning a pharmacy," but rather owning the drug delivery workflow itself.`,
      industryStructure: [
        {
          subsegment: "Sexual Health",
          description: "Erectile dysfunction, premature ejaculation, libido optimization",
          examples: "Hims, Roman",
        },
        {
          subsegment: "Dermatology",
          description: "Acne, pigment, aging",
          examples: "Curology, Musely, Apostrophe",
        },
        {
          subsegment: "Metabolic Health",
          description: "GLP-1s, metabolic optimization",
          examples: "Ro, Found, Hims & Hers",
        },
        {
          subsegment: "Women's Hormonal Health",
          description: "Hormonal acne, PCOS, menopause",
          examples: "Nurx, Hers, Midi, Evernow",
        },
        {
          subsegment: "Neurology",
          description: "Migraine, sleep disorders",
          examples: "Cove, Cerebral",
        },
        {
          subsegment: "Allergy / Immunology",
          description: "Immunotherapy, at-home desensitization",
          examples: "Wyndly",
        },
      ],
      studioFilter: [
        {
          filter: "Structural Inefficiency",
          assessment: "High",
          comment: "Protocol adaptation post-initiation remains largely manual or nonexistent.",
        },
        {
          filter: "Build Feasibility",
          assessment: "High",
          comment: "Software and pharmacy control enable scalable platform infrastructure.",
        },
        {
          filter: "Defensibility",
          assessment: "High (if protocol engine built)",
          comment:
            "Data feedback loops create learning curves; 3rd party fulfillment competitors cannot replicate easily.",
        },
        {
          filter: "Capital Efficiency",
          assessment: "High",
          comment: "No real estate, limited clinical staff; fulfillment scale already owned.",
        },
        {
          filter: "Return Potential",
          assessment: "High",
          comment: "Recurring conditions, large addressable populations, high LTV via protocol optimization.",
        },
      ],
      workflowDecomposition: [
        {
          stage: "Intake & Assessment",
          description: "Forms, telehealth intake, medical history",
          keyRisk: "Fully commoditized",
          invitroControl: "Minimal differentiation",
        },
        {
          stage: "Initial Prescription Decision",
          description: "Basic eligibility scripting",
          keyRisk: "Crude protocols dominate",
          invitroControl: "Baseline table stakes",
        },
        {
          stage: "Fulfillment Dispatch",
          description: "First shipment via pharmacy",
          keyRisk: "Vendor-dependent for most DTCs",
          invitroControl: "Pharmacy control provides data leverage",
        },
        {
          stage: "Dose Titration & Adjustments",
          description: "Adjusting dose / combo over time",
          keyRisk: "Rarely done in consumer DTC",
          invitroControl: "Core opportunity: protocol engine",
        },
        {
          stage: "Adherence Monitoring",
          description: "Track refill behavior, symptom surveys",
          keyRisk: "Under-utilized data",
          invitroControl: "Pharmacy data + digital follow-up integration",
        },
        {
          stage: "Longitudinal Outcomes Tracking",
          description: "Ongoing labs, biometric trends, symptom patterns",
          keyRisk: "Largely absent",
          invitroControl: "Closed-loop integration possible",
        },
        {
          stage: "Protocol Learning & Optimization",
          description: "Adapt protocols based on population-level signals",
          keyRisk: "Completely absent",
          invitroControl: "Studio-native clinical IP moat",
        },
      ],
      studioWedges: [
        {
          title: "A. Precision Titration Protocol Engine (Cross-Condition Core)",
          thesis:
            "Most conditions treated via DTC have large intra-patient response variation. Yet nearly all protocols are static. The opportunity sits in constructing dynamic titration models that adapt treatment based on pharmacy refill patterns, side effect reporting, biomarker monitoring, and lifestyle signals.",
          fulfillmentRole:
            "Pharmacy control allows real-time detection of adherence failures, dose gaps, and side-effect related non-compliance. This closes the loop into protocol engines.",
          applicableConditions: "GLP-1 weight loss, hormonal acne, menopause HRT, migraine prevention.",
          studioFit: "High defensibility; multiplatform applicability; software IP core.",
        },
        {
          title: "B. Hormonal Cycle-Based Care Platform (Vertical Example)",
          thesis:
            "Hormonal fluctuations drive significant variation in acne, PCOS, menopause, and cycle disorders. Current protocols often fail to dynamically adjust to cyclical physiology.",
          studioAdvantage:
            "Combine lab tracking, pharmacy refill cadence, symptom logs, and digital cycle tracking to enable individualized dosing algorithms that adapt over time.",
          pharmacyAdvantage:
            "Control over refill timing creates optionality for testing and protocol adjustment aligned with hormonal windows.",
          competitors: "Hers, Nurx, Evernow provide access, but personalization depth is minimal.",
        },
        {
          title: "C. Migraine Prevention Engine (Vertical Example)",
          thesis:
            "Effective prevention requires trigger identification, behavioral reinforcement, wearable integration, and medication optimization. Current offerings emphasize acute treatment.",
          studioAdvantage:
            "Integrate pharmacy refill gaps with trigger exposures and wearable data for prevention personalization.",
          competitors: "Cove focuses on acute prescriptions without prevention depth.",
        },
        {
          title: "D. Dermatologic Adaptive Regimen Platform (Vertical Example)",
          thesis:
            "Acne, hyperpigmentation, and aging regimens rarely adjust after initial prescribing. Variability in skin response is significant.",
          studioAdvantage:
            "Combine longitudinal imaging, pharmacy refill patterns, and side effect logs to inform adaptive topical and systemic protocols.",
          pharmacyRole: "Control of multi-agent inventory enables rapid regimen cycling.",
          competitors: "Curology, Musely, Apostrophe provide limited ongoing protocol adaptation.",
        },
      ],
      summary: [
        {
          wedge: "Intake & Access",
          currentPractice: "Fully commoditized",
          studioAdvantage: "Neutral",
        },
        {
          wedge: "Prescription Initiation",
          currentPractice: "Algorithmic forms",
          studioAdvantage: "Neutral",
        },
        {
          wedge: "Fulfillment Dispatch",
          currentPractice: "Third-party drop ship",
          studioAdvantage: "Controlled pharmacy fulfillment data",
        },
        {
          wedge: "Titration",
          currentPractice: "Rarely done",
          studioAdvantage: "Dynamic protocol learning engine",
        },
        {
          wedge: "Adherence Monitoring",
          currentPractice: "Low integration",
          studioAdvantage: "Pharmacy refill data + digital engagement",
        },
        {
          wedge: "Outcome Feedback",
          currentPractice: "Virtually absent",
          studioAdvantage: "Multi-modal longitudinal tracking",
        },
      ],
      conclusion: `The space for precision drug delivery platforms is structurally attractive. Access models have become fully commoditized. Workflow-level integration of drug fulfillment and dynamic protocol optimization could offer a next layer of differentiation.

However, a critical open question remains: Do consumers demand or value ongoing personalized protocol optimization, or is prescription access alone sufficient for most use cases? Existing DTC adoption patterns suggest patients value convenience and low-friction access, but longitudinal personalization adoption has not yet been validated at scale.

The studio thesis therefore remains under research:
• The infrastructure to build dynamic care engines is feasible and differentiated.
• Pharmacy integration provides unique data advantage.
• The patient demand signal for longitudinal personalization remains an open area requiring validation.`,
      nextSteps: [
        "Patient Surveys & Panels: Directly test willingness-to-pay, perceived value, and frustrations with current static DTC models.",
        "Clinician Interviews: Identify where clinical leaders see meaningful improvement opportunities through dynamic protocols.",
        "Retention Cohort Analysis: Assess existing DTC retention curves across known providers to estimate real-world churn driven by static protocols.",
        "Pilot Simulation Modeling: Use pharmacy data assets to simulate how protocol adjustments could have impacted outcomes or adherence in retrospective analysis.",
        "Design Partner Engagement: Identify potential early clinical partners willing to co-develop first-generation personalization layers inside controlled therapeutic categories.",
      ],
    },
  },
  "healthcare-elearning-thesis": {
    title: "Industry Thesis: Healthcare E-Learning",
    category: "Industry Theses",
    publishDate: "2024-01-01",
    readTime: "16 min read",
    tags: ["Healthcare", "E-Learning", "Digital Education"],
    summary:
      "Analysis of healthcare education and credentialing market opportunities, focusing on infrastructure gaps rather than content delivery.",
    content: {
      investorSummary: `The U.S. healthcare education and credentialing market is undergoing structural change. Regulatory pressure, labor shortages, and distributed workforces are forcing employers and professionals to modernize how they train, track, and verify skill. While content delivery is increasingly digital, the infrastructure that underpins credential management, compliance, and workforce advancement remains brittle and analog.

This thesis applies the InVitro Capital venture studio methodology to the space. It identifies infrastructure gaps that are capital efficient to build, defensible at scale, and aligned with budgeted buyer pain. The opportunity is not to become another learning brand—but to own the systems of record that govern professional readiness, compliance, and mobility.`,
      marketSubsegmentation: [
        {
          subsegment: "Pre-Licensure Training",
          description: "Full online or hybrid training programs for entry-level roles (e.g., MA, LPN, pharmacy tech)",
          targetUser: "Students entering workforce",
          primaryBuyer: "Individuals, workforce agencies, some employers",
          examples: "Stepful, MedCerts",
        },
        {
          subsegment: "Licensure Exam Prep",
          description: "Focused prep tools for certification exams (e.g., NCLEX, CPC, PTCB)",
          targetUser: "Near-grads, jobseekers",
          primaryBuyer: "Individuals",
          examples: "Kaplan Nursing, AAPC, NHA",
        },
        {
          subsegment: "Continuing Education (CEU/CME)",
          description: "Required periodic learning to maintain licensure",
          targetUser: "Licensed professionals",
          primaryBuyer: "Individuals, employers, boards",
          examples: "Colibri, Relias, NetCE",
        },
        {
          subsegment: "Skills-Based Upskilling",
          description: "Optional, career-advancing courses and micro-credentials",
          targetUser: "Working clinicians",
          primaryBuyer: "B2C or employers",
          examples: "Coursera, edX, Osmosis",
        },
        {
          subsegment: "Compliance Training",
          description: "Organization-mandated modules (HIPAA, OSHA, billing compliance)",
          targetUser: "Healthcare staff",
          primaryBuyer: "Hospitals and clinics",
          examples: "HealthStream, MedTrainer, Symplr",
        },
        {
          subsegment: "Instructor Enablement",
          description: "Learning platforms and tools for educators and admins",
          targetUser: "Training directors, institutions",
          primaryBuyer: "Institutions",
          examples: "Articulate, Absorb, Docebo",
        },
      ],
      studioFitTest: {
        structuralInefficiency: {
          laborIntensive:
            "Credentialing, compliance, CE tracking, and workflow orchestration are still largely managed via PDFs, spreadsheets, and manual email reminders.",
          techStarved:
            "While content delivery platforms (e.g., Coursera, Colibri) are common, the infrastructure to route, verify, and automate credentialing logic remains largely analog.",
          fragmented:
            "No single vendor spans multiple verticals—licensure prep, CE, compliance, and skills development remain in silos, often dictated by state or credentialing body.",
        },
        buildFeasibility: {
          favorable:
            "Credential wallets, compliance engines, and recommendation layers require limited up-front capital. They can be validated quickly via no-code prototypes and narrow vertical entry points (e.g., travel nursing, ambulatory clinics).",
          avoid:
            "Building new CE content libraries or full LMSs (Learning Management Systems) would require heavy content ops, slow iteration cycles, and difficult differentiation.",
        },
        wedgeDefensibility: {
          strong:
            "Products that sit between stakeholders—e.g., clinicians and boards, or schools and employers—can become systems of record. Data aggregation (CE tracking), logic embedding (compliance engines), and integration depth (license matching) offer defensibility.",
          weak: "Content businesses or shallow utilities will struggle to retain users or resist horizontal LMS competition.",
        },
        capitalEfficiency:
          "Infrastructure layers (e.g., credential APIs, scorecards, dashboards) can be tested and launched with small teams. Monetization can begin early via direct SaaS fees or workflow licensing.",
        returnPotential:
          "Multiple $1B+ subsegments exist (e.g., CE, compliance, upskilling). Buyers include: incumbents like HealthStream, PE-backed rollups (e.g., Relias, Colibri), or workflow SaaS platforms (Symplr, Workday Health). The combination of mandatory usage and recurring budgets creates highly acquirable outcomes at scale.",
      },
      productWedges: [
        {
          name: "CE Wallet",
          description:
            "A centralized ledger that aggregates CE records, maps them to license rules, and alerts users or employers to gaps.",
          buyer: "Compliance leads, clinical education managers, HR in hospitals and large ambulatory groups",
          market: "~2–3M reachable professionals across ~10,000 institutions",
          pricing: "B2B SaaS, $5–15/user/month",
          acv: "$10K–$100K depending on system size, integration, and license complexity",
          competitiveWhitespace: "No unified cross-state or multi-role CE tracker with system-of-record status",
          verdict: "High conviction studio-grade opportunity",
        },
        {
          name: "Skills Pathway Engine",
          description:
            "Career navigator for clinicians looking to switch roles or level up skills, tied to licensure and wage outcomes.",
          buyer: "Hospital learning & development teams, workforce boards, and systems managing retention",
          market: "~750K–1.5M target users across 2,000–3,000 enterprise buyers",
          pricing: "B2B SaaS, $10K–$50K/year per institution (based on user volume and role targeting)",
          acv: "$15K–30K mid-market, potentially higher with integration to HRIS or LMS",
          competitiveWhitespace: "Few tools offer personalized pathway logic across licensure/scope of practice",
          verdict: "Viable with scoped entry focused on churn-heavy roles",
        },
        {
          name: "Compliance Risk Engine",
          description:
            "Predictive system that flags compliance gaps, automates assignments, and feeds reporting layers for hospital HR and risk.",
          buyer: "Compliance officers, HR execs, clinical operations leads",
          market: "~10,000 midsize+ orgs (hospitals, IDNs, ambulatory networks)",
          pricing: "B2B SaaS, $1–3/user/month with reporting/logic tiers",
          acv: "$25K–75K depending on size and scope of automation; some enterprise deals may exceed $100K",
          competitiveWhitespace:
            "Existing tools (HealthStream, MedTrainer) offer static tracking, not risk-based assignment or predictive analytics",
          verdict: "Strong wedge. System-of-record potential",
        },
        {
          name: "Externship Placement Layer",
          description: "Externship tracking and site matching for training providers.",
          buyer: "School directors (weak), healthcare employers (indirect)",
          market: "~7K–10K programs, mostly sub-$5M annual budgets",
          pricing: "Hard to monetize in B2B unless bundled",
          acv: "Likely <$5K/year; price-sensitive, low-volume sales motion",
          competitiveWhitespace: "Exists, but buyers lack budget authority or urgency",
          verdict: "Remove as standalone wedge. Consider as future feature within credentialing system",
        },
      ],
      summaryTable: [
        {
          wedge: "CE Wallet",
          marketSize: "Large",
          buyerStrength: "High",
          competitiveWhiteSpace: "Yes",
          studioFit: "Yes",
        },
        {
          wedge: "Skills Pathways",
          marketSize: "Mid",
          buyerStrength: "Medium",
          competitiveWhiteSpace: "Partial",
          studioFit: "Yes (scoped)",
        },
        {
          wedge: "Compliance Risk Engine",
          marketSize: "Large",
          buyerStrength: "High",
          competitiveWhiteSpace: "Yes",
          studioFit: "Yes",
        },
        {
          wedge: "Externship Layer",
          marketSize: "Small",
          buyerStrength: "Low",
          competitiveWhiteSpace: "Yes but hard to monetize",
          studioFit: "No",
        },
      ],
      conclusion: `The learning content layer in healthcare is increasingly saturated—but the compliance, credentialing, and skills infrastructure remains broken. InVitro Capital is well-positioned to build this infrastructure from first principles: system-of-record products with regulatory tailwinds, recurring monetization, and high acquisition interest.

The best opportunities are not about education, but about ownership of compliance-critical workflows. With the right sequencing and validation, these wedges can be de-risked rapidly and spun out into highly acquirable, durable software businesses.

The recommendation is clear: start with the CE Wallet or Compliance Engine. Both are studio-native: capital efficient, workflow-embedded, and unavoidable.`,
    },
  },
}

export default function ResearchPaper() {
  const router = useRouter()
  const params = useParams()
  const paperId = params.paperId as string
  const paper = researchContent[paperId] || researchContent["healthcare-prescription-dtc-thesis"]

  return (
    <div className="min-h-screen bg-gray-50 text-foreground">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-[hsl(212,74%,15%)] text-[hsl(212,74%,15%)] rounded-full px-5 py-2 text-sm font-medium hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)] transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Research
          </Button>
          <div className="flex-1 flex justify-center">
            <img src="/logo.png" alt="InVitro Capital Logo" width={180} height={48} style={{ objectFit: 'contain' }} />
          </div>
          <Button 
            className="bg-white text-[hsl(212,74%,15%)] border border-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)] ml-4"
            asChild
          >
            <a 
              href={
                paperId === "healthcare-elearning-thesis" ? "/Industry Thesis - Healthcare E-Learning.pdf" :
                paperId === "healthcare-prescription-dtc-thesis" ? "/Industry Thesis - DTC Prescription Healthcare.pdf" :
                paperId === "accounting-services-industry-decomposition" ? "/Industry Decomposition - Accounting Services.pdf" :
                "#"
              } 
              download 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </a>
          </Button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{paper.title}</h1>
        </div>
        <Card>
          <CardContent className="space-y-8">
            <Separator />

            {/* Investor Summary for DTC thesis */}
            {paper.content.investorSummary && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Investor Summary</h3>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{paper.content.investorSummary}</p>
                </div>
              </div>
            )}

            {/* Industry Structure */}
            {paper.content.industryStructure && (
              <div>
                <h3 className="text-xl font-semibold mb-4">I. Reframing the Industry Structure</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Subsegment
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Description
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Representative Examples
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paper.content.industryStructure.map((row: { subsegment: string; description: string; examples: string }, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                            {row.subsegment}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.description}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.examples}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> These categories define initial condition entry points. The ultimate customer
                    could include DTC brands, hybrid virtual clinics, payers, and health systems. Our platform sits
                    below the end-user brand, operating the precision delivery infrastructure that powers longitudinal
                    care.
                  </p>
                </div>
              </div>
            )}

            {/* Studio Filter Assessment */}
            {paper.content.studioFilter && (
              <div>
                <h3 className="text-xl font-semibold mb-4">II. Studio Filter Assessment</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Studio Filter
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">
                          Assessment
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Comment
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paper.content.studioFilter.map((row: { filter: string; assessment: string; comment: string }, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.filter}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                row.assessment.includes("High")
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {row.assessment}
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Workflow Decomposition */}
            {paper.content.workflowDecomposition && (
              <div>
                <h3 className="text-xl font-semibold mb-4">III. Workflow Decomposition for Drug Delivery Platforms</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Workflow Stage
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Description
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Key Workflow Risk Today
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          InVitro Control Potential
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paper.content.workflowDecomposition.map((row: { stage: string; description: string; keyRisk: string; invitroControl: string }, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.stage}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.description}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.keyRisk}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.invitroControl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Studio Wedges */}
            {paper.content.studioWedges && (
              <div>
                <h3 className="text-xl font-semibold mb-4">IV. Studio Wedges Anchored to Drug Delivery Workflow</h3>
                <div className="space-y-6">
                  {paper.content.studioWedges.map((wedge: { title: string; thesis: string; fulfillmentRole?: string; studioAdvantage?: string; pharmacyAdvantage?: string; pharmacyRole?: string; applicableConditions?: string; studioFit?: string; competitors?: string }, index: number) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200"
                    >
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">{wedge.title}</h4>
                      <div className="space-y-3">
                        <div>
                          <span className="font-semibold text-gray-800">Thesis: </span>
                          <span className="text-gray-700">{wedge.thesis}</span>
                        </div>
                        {wedge.fulfillmentRole && (
                          <div>
                            <span className="font-semibold text-gray-800">Fulfillment Role: </span>
                            <span className="text-gray-700">{wedge.fulfillmentRole}</span>
                          </div>
                        )}
                        {wedge.studioAdvantage && (
                          <div>
                            <span className="font-semibold text-gray-800">Studio Advantage: </span>
                            <span className="text-gray-700">{wedge.studioAdvantage}</span>
                          </div>
                        )}
                        {wedge.pharmacyAdvantage && (
                          <div>
                            <span className="font-semibold text-gray-800">Pharmacy Control Advantage: </span>
                            <span className="text-gray-700">{wedge.pharmacyAdvantage}</span>
                          </div>
                        )}
                        {wedge.pharmacyRole && (
                          <div>
                            <span className="font-semibold text-gray-800">Pharmacy Role: </span>
                            <span className="text-gray-700">{wedge.pharmacyRole}</span>
                          </div>
                        )}
                        {wedge.applicableConditions && (
                          <div>
                            <span className="font-semibold text-gray-800">Applicable Conditions: </span>
                            <span className="text-gray-700">{wedge.applicableConditions}</span>
                          </div>
                        )}
                        {wedge.studioFit && (
                          <div>
                            <span className="font-semibold text-gray-800">Studio Fit: </span>
                            <span className="text-gray-700">{wedge.studioFit}</span>
                          </div>
                        )}
                        {wedge.competitors && (
                          <div>
                            <span className="font-semibold text-gray-800">Competitors: </span>
                            <span className="text-gray-700">{wedge.competitors}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {paper.content.summary && (
              <div>
                <h3 className="text-xl font-semibold mb-4">V. Summary: Drug Delivery Workflow as Defensible Moat</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Wedge
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Current Industry Practice
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Studio Advantage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paper.content.summary.map((row: { wedge: string; currentPractice: string; studioAdvantage: string }, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.wedge}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.currentPractice}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.studioAdvantage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}



            {/* Healthcare E-Learning Market Subsegmentation */}
            {paper.content.marketSubsegmentation && (
              <div>
                <h3 className="text-xl font-semibold mb-4">I. Subsegmenting the Healthcare E-Learning Market (MECE Framework)</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Subsegment</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Target User</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Primary Buyer</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Examples</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paper.content.marketSubsegmentation.map((row: { subsegment: string; description: string; targetUser: string; primaryBuyer: string; examples: string }, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.subsegment}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.description}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.targetUser}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.primaryBuyer}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.examples}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Studio Model Fit Test for E-Learning */}
            {paper.content.studioFitTest && (
              <div>
                <h3 className="text-xl font-semibold mb-4">II. Studio Model Fit Test: Should We Build in Healthcare E-Learning?</h3>
                <div className="space-y-6">
                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h4 className="text-lg font-semibold text-red-800 mb-4">1. Structural Inefficiency</h4>
                    <div className="space-y-3">
                      <div><span className="font-semibold text-red-800">Labor-Intensive: </span><span className="text-red-700">{paper.content.studioFitTest.structuralInefficiency.laborIntensive}</span></div>
                      <div><span className="font-semibold text-red-800">Tech-Starved: </span><span className="text-red-700">{paper.content.studioFitTest.structuralInefficiency.techStarved}</span></div>
                      <div><span className="font-semibold text-red-800">Fragmented: </span><span className="text-red-700">{paper.content.studioFitTest.structuralInefficiency.fragmented}</span></div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4">2. Build Feasibility</h4>
                    <div className="space-y-3">
                      <div><span className="font-semibold text-blue-800">Favorable: </span><span className="text-blue-700">{paper.content.studioFitTest.buildFeasibility.favorable}</span></div>
                      <div><span className="font-semibold text-blue-800">Avoid: </span><span className="text-blue-700">{paper.content.studioFitTest.buildFeasibility.avoid}</span></div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h4 className="text-lg font-semibold text-green-800 mb-4">3. Wedge Defensibility</h4>
                    <div className="space-y-3">
                      <div><span className="font-semibold text-green-800">Strong: </span><span className="text-green-700">{paper.content.studioFitTest.wedgeDefensibility.strong}</span></div>
                      <div><span className="font-semibold text-green-800">Weak: </span><span className="text-green-700">{paper.content.studioFitTest.wedgeDefensibility.weak}</span></div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-4">4. Capital Efficiency</h4>
                    <p className="text-yellow-700">{paper.content.studioFitTest.capitalEfficiency}</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <h4 className="text-lg font-semibold text-purple-800 mb-4">5. Return Potential</h4>
                    <p className="text-purple-700">{paper.content.studioFitTest.returnPotential}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Product Wedges for E-Learning */}
            {paper.content.productWedges && (
              <div>
                <h3 className="text-xl font-semibold mb-4">III. Defensible Product Wedges in Healthcare E-Learning</h3>
                <div className="space-y-8">
                  {paper.content.productWedges.map((wedge: { name: string; description: string; buyer: string; market: string; pricing: string; acv: string; competitiveWhitespace: string; verdict: string }, index: number) => (
                    <div
                      key={index}
                      className={`p-6 rounded-lg border-2 ${
                        wedge.verdict.includes("High conviction")
                          ? "bg-green-50 border-green-200"
                          : wedge.verdict.includes("Viable")
                            ? "bg-blue-50 border-blue-200"
                            : wedge.verdict.includes("Strong")
                              ? "bg-purple-50 border-purple-200"
                              : "bg-red-50 border-red-200"
                      }`}
                    >
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">
                        {String.fromCharCode(65 + index)}. {wedge.name}
                      </h4>
                      <p className="text-gray-700 mb-4">{wedge.description}</p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div><span className="font-semibold text-gray-800">Buyer: </span><span className="text-gray-700">{wedge.buyer}</span></div>
                        <div><span className="font-semibold text-gray-800">Market: </span><span className="text-gray-700">{wedge.market}</span></div>
                        <div><span className="font-semibold text-gray-800">Pricing: </span><span className="text-gray-700">{wedge.pricing}</span></div>
                        <div><span className="font-semibold text-gray-800">ACV: </span><span className="text-gray-700">{wedge.acv}</span></div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div><span className="font-semibold text-gray-800">Competitive whitespace: </span><span className="text-gray-700">{wedge.competitiveWhitespace}</span></div>
                        <div><span className="font-semibold text-gray-800">Verdict: </span><span className={`font-medium ${
                          wedge.verdict.includes("High conviction")
                            ? "text-green-700"
                            : wedge.verdict.includes("Viable") || wedge.verdict.includes("Strong")
                              ? "text-blue-700"
                              : "text-red-700"
                        }`}>{wedge.verdict}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary Table for E-Learning */}
            {paper.content.summaryTable && (
              <div>
                <h3 className="text-xl font-semibold mb-4">IV. Summary Table: Studio Suitability by Wedge</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Wedge</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Market Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Buyer Strength</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Competitive White Space</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Studio Fit?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paper.content.summaryTable.map((row: { wedge: string; marketSize: string; buyerStrength: string; competitiveWhiteSpace: string; studioFit: string }, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.wedge}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center"><span className={`px-2 py-1 rounded text-sm font-medium ${
                            row.marketSize === "Large"
                              ? "bg-green-100 text-green-800"
                              : row.marketSize === "Mid"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}>{row.marketSize}</span></td>
                          <td className="border border-gray-300 px-4 py-3 text-center"><span className={`px-2 py-1 rounded text-sm font-medium ${
                            row.buyerStrength === "High"
                              ? "bg-green-100 text-green-800"
                              : row.buyerStrength === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}>{row.buyerStrength}</span></td>
                          <td className="border border-gray-300 px-4 py-3 text-center"><span className={`px-2 py-1 rounded text-sm font-medium ${
                            row.competitiveWhiteSpace === "Yes"
                              ? "bg-green-100 text-green-800"
                              : row.competitiveWhiteSpace === "Partial"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}>{row.competitiveWhiteSpace}</span></td>
                          <td className="border border-gray-300 px-4 py-3 text-center"><span className={`px-2 py-1 rounded text-sm font-medium ${
                            row.studioFit === "Yes"
                              ? "bg-green-100 text-green-800"
                              : row.studioFit.includes("Yes")
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                          }`}>{row.studioFit}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Conclusion for E-Learning thesis */}
            {paper.content.conclusion && paper.content.marketSubsegmentation && (
              <div>
                <h3 className="text-xl font-semibold mb-4">V. Conclusion: Build the Infrastructure, Not the Content</h3>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{paper.content.conclusion}</p>
                </div>
              </div>
            )}

            {/* Conclusion for DTC thesis */}
            {paper.content.conclusion && !paper.content.marketSubsegmentation && (
              <div>
                <h3 className="text-xl font-semibold mb-4">VI. Conclusion: Research Path Forward</h3>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{paper.content.conclusion}</p>

                  {paper.content.nextSteps && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Next Steps: Research Process Framework
                      </h4>
                      <p className="text-gray-700 mb-4">
                        To validate whether longitudinal personalization has sufficient market pull, we will undertake:
                      </p>
                      <ol className="space-y-3">
                        {paper.content.nextSteps.map((step: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-900 text-base">
                          This research sequence is designed to separate consumer preference from theoretical clinical appeal. The opportunity may be structurally valid but commercially narrow, broad, or segment-dependent. The studio will maintain optionality until validated signal emerges.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Default conclusion for other papers */}
            {!paper.content.conclusion && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Conclusion</h3>
                <p className="text-gray-700">
                  This research provides actionable insights for investors, entrepreneurs, and industry stakeholders
                  looking to understand and capitalize on emerging opportunities in this rapidly evolving sector. Our
                  analysis continues to inform our investment strategy and portfolio company development.
                </p>
              </div>
            )}

            <Separator />

          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
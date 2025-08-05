"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"

// Define types for decompositionData
interface DecompositionContent {
  criteriaScoring: {
    title: string;
    data: Array<{
      filter: string;
      score: number;
      justification: string;
    }>;
  };
  subsegmentation: {
    title: string;
    subtitle: string;
    data: Array<{
      subsegment: string;
      description: string;
      notes: string;
    }>;
  };
  workflowDecomposition: {
    title: string;
    masterWorkflowList: {
      title: string;
      data: Array<{
        workflow: string;
        description: string;
        currentTooling: string;
        vendors: string;
      }>;
    };
    functionalGroupings: {
      title: string;
      groups: string[];
    };
    workflowMatrices: {
      title: string;
      categories: Array<{
        title: string;
        workflows: Array<{
          workflow: string;
          snfs: string;
          al: string;
          boardCare: string;
          homeHealth: string;
          hospice: string;
          competitors: string;
        }>;
      }>;
    };
  };
  topPairs: {
    title: string;
    pairs: Array<{
      title: string;
      criteria: Array<{
        item: string;
        notes: string;
      }>;
    }>;
  };
  buyerPersonas: {
    title: string;
    personas: Array<{
      buyer: string;
      workflowOwned: string;
      contextOfPain: string;
      budgetControl: string;
      notes: string;
    }>;
  };
  // Add other sections as needed, using 'unknown' for now if structure is unclear
  [key: string]: unknown;
}

interface DecompositionData {
  [key: string]: {
    title: string;
    subtitle?: string;
    industry: string;
    publishDate?: string;
    readTime?: string;
    tags?: string[];
    summary?: string;
    content?: DecompositionContent;
  };
}

// Dynamic data fetching instead of hardcoded data
const [decompositionData, setDecompositionData] = useState<DecompositionData>({})
const [loading, setLoading] = useState(true)

// Fetch data from API
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/thesis')
      if (response.ok) {
        const data = await response.json()
        // Filter for decomposition entries only
        const decompositionEntries: DecompositionData = {}
        Object.keys(data).forEach(key => {
          if (data[key].type === 'decomposition') {
            decompositionEntries[key] = data[key]
          }
        })
        setDecompositionData(decompositionEntries)
      }
    } catch (error) {
      console.error('Failed to fetch decomposition data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  fetchData()
}, [])

// Fallback to hardcoded data if API fails
const fallbackData: DecompositionData = {
  "long-term-care": {
    title: "Industry Decomposition: Long Term Care",
    industry: "Long Term Care",
    publishDate: "2025-01-01",
    readTime: "30 min read",
    tags: ["Long Term Care", "Industry Analysis", "Market Segmentation"],
    content: {
      criteriaScoring: {
        title: "I. InVitro Criteria Scoring",
        data: [
          {
            filter: "Tech-starved",
            score: 3,
            justification:
              "Most LTC providers still operate on paper or use generic tools like Excel. Purpose-built software penetration is low, especially outside skilled nursing.",
          },
          {
            filter: "Labor-intensive",
            score: 3,
            justification:
              "The sector is heavily dependent on human labor for daily care, administration, compliance, and communication. Labor shortages are a persistent issue.",
          },
          {
            filter: "Fragmented",
            score: 3,
            justification:
              "Includes thousands of independent facilities (e.g. RCFE, assisted living, home health). No dominant national platforms outside large SNFs or REITs.",
          },
          {
            filter: "Overlooked",
            score: 2,
            justification:
              "While private equity is active in SNFs, smaller segments (e.g. board & care, independent assisted living) receive little venture or product attention.",
          },
          {
            filter: "Capital-efficient",
            score: 2,
            justification:
              "Software purchases are often small-ticket and cash-constrained, but operators are willing to spend if the ROI is clear and staffing time is saved.",
          },
        ],
      },
      subsegmentation: {
        title: "II. MECE Subsegmentation of the Industry",
        subtitle: "Subsegmentation by Setting",
        data: [
          {
            subsegment: "Skilled Nursing Facilities (SNFs)",
            description: "Medical care + custodial care, often reimbursed via Medicare/Medicaid. Heavily regulated.",
            notes: "Large PE-backed operators exist; most tooling targets this group.",
          },
          {
            subsegment: "Assisted Living Communities (AL)",
            description: "Non-medical support for ADLs. Usually private-pay. Wide range of facility sizes.",
            notes: "Fragmented. Staff-constrained.",
          },
          {
            subsegment: "Board & Care Homes",
            description: "Small (6–10 beds), residential facilities often run by independent owners.",
            notes: "Typically paper-based. Nearly zero software penetration.",
          },
          {
            subsegment: "Home Health Agencies",
            description: "Provide care in a patient&apos;s home (e.g. nursing, therapy).",
            notes: "Heavily regulated. Some workflow digitization exists.",
          },
          {
            subsegment: "Hospice & Palliative Care",
            description: "End-of-life care, often delivered in-home or within LTC facilities.",
            notes: "Specialized workflows. Less tooling outside billing.",
          },
        ],
      },
      workflowDecomposition: {
        title: "III. Workflow Decomposition",
        masterWorkflowList: {
          title: "A. Master Workflow List",
          data: [
            {
              workflow: "Care Plan Documentation",
              description: "Create and update individual care plans.",
              currentTooling: "Paper, EHRs, Word Docs",
              vendors: "PointClickCare (SNF), ALIS, ClearCare",
            },
            {
              workflow: "Staff Scheduling",
              description: "Match caregivers to shifts, handle last-minute call-outs.",
              currentTooling: "Paper, Excel",
              vendors: "OnShift, Smartlinx, When I Work",
            },
            {
              workflow: "Medication Management",
              description: "Track prescriptions, administer meds, refill requests.",
              currentTooling: "Paper MARs, basic EMRs",
              vendors: "MedPass, QuickMAR",
            },
            {
              workflow: "Incident Reporting",
              description: "Record falls, adverse events, notify families.",
              currentTooling: "Paper, email",
              vendors: "iCareManager, internal forms",
            },
            {
              workflow: "Family Communication",
              description: "Share updates, schedule visits, message family members.",
              currentTooling: "Phone, email, SMS",
              vendors: "CareMerge, LifeLoop, Cubigo",
            },
            {
              workflow: "Intake & Assessment",
              description: "Admit new residents, complete initial evaluations.",
              currentTooling: "Paper packets, PDFs",
              vendors: "Yardi, PointClickCare",
            },
            {
              workflow: "Billing & Collections",
              description: "Generate invoices, handle Medicaid/Medicare, follow up on payments.",
              currentTooling: "Excel, legacy billing software",
              vendors: "MatrixCare, Netsmart, AlayaCare",
            },
            {
              workflow: "Staff Onboarding & Training",
              description: "Hire, train, and certify care workers.",
              currentTooling: "Manual, LMS",
              vendors: "Relias, CareAcademy, IntelyCare",
            },
            {
              workflow: "Inventory / Supply Ordering",
              description: "Track supplies (e.g., gloves, meds, food) and reorder.",
              currentTooling: "Clipboards, paper logs",
              vendors: "Vikor Scientific, Medline",
            },
            {
              workflow: "Regulatory Compliance",
              description: "Survey readiness, policy updates, form management.",
              currentTooling: "Binders, generic doc storage",
              vendors: "PolicyStat, Symplr",
            },
          ],
        },
        functionalGroupings: {
          title: "B. Functional Groupings",
          groups: [
            "1. Care Delivery & Resident Management",
            "2. Labor & Scheduling",
            "3. Compliance & Documentation",
            "4. Admin Ops (Billing, Inventory, Intake)",
            "5. Family & External Communication",
          ],
        },
        workflowMatrices: {
          title: "C. Workflow Matrices by Subsegment",
          categories: [
            {
              title: "Category: Care Delivery & Resident Management",
              workflows: [
                {
                  workflow: "Care Plan Documentation",
                  snfs: "Vertical SaaS",
                  al: "Manual/PDF",
                  boardCare: "Paper",
                  homeHealth: "Vertical SaaS",
                  hospice: "Vertical SaaS",
                  competitors: "PointClickCare, ClearCare",
                },
                {
                  workflow: "Medication Management",
                  snfs: "Vertical SaaS",
                  al: "Excel/paper",
                  boardCare: "Paper",
                  homeHealth: "Vertical SaaS",
                  hospice: "Vertical SaaS",
                  competitors: "QuickMAR, MedPass",
                },
                {
                  workflow: "Intake & Assessment",
                  snfs: "SaaS or hybrid",
                  al: "Paper",
                  boardCare: "Paper",
                  homeHealth: "SaaS",
                  hospice: "SaaS",
                  competitors: "Yardi, MatrixCare",
                },
                {
                  workflow: "Incident Reporting",
                  snfs: "Vertical SaaS",
                  al: "Paper/email",
                  boardCare: "Paper",
                  homeHealth: "SaaS",
                  hospice: "SaaS",
                  competitors: "iCareManager",
                },
              ],
            },
            {
              title: "Category: Labor & Scheduling",
              workflows: [
                {
                  workflow: "Staff Scheduling",
                  snfs: "OnShift-type",
                  al: "Excel, manual",
                  boardCare: "Manual",
                  homeHealth: "Some SaaS",
                  hospice: "SaaS",
                  competitors: "OnShift, Smartlinx, IntelyCare",
                },
                {
                  workflow: "Staff Onboarding",
                  snfs: "LMS / HRIS",
                  al: "Ad hoc",
                  boardCare: "Not done",
                  homeHealth: "SaaS",
                  hospice: "SaaS",
                  competitors: "Relias, CareAcademy",
                },
                {
                  workflow: "Training Compliance",
                  snfs: "SaaS or HRIS",
                  al: "Manual",
                  boardCare: "Not done",
                  homeHealth: "LMS",
                  hospice: "LMS",
                  competitors: "Relias, HCP",
                },
              ],
            },
            {
              title: "Category: Compliance & Documentation",
              workflows: [
                {
                  workflow: "Regulatory Compliance",
                  snfs: "Vertical SaaS",
                  al: "Binders",
                  boardCare: "Binders",
                  homeHealth: "SaaS",
                  hospice: "SaaS",
                  competitors: "PolicyStat, SimpleLTC",
                },
                {
                  workflow: "Incident Reporting",
                  snfs: "SaaS",
                  al: "Manual/email",
                  boardCare: "Paper",
                  homeHealth: "SaaS",
                  hospice: "SaaS",
                  competitors: "iCareManager, in-house",
                },
              ],
            },
            {
              title: "Category: Admin Ops & Communication",
              workflows: [
                {
                  workflow: "Billing & Collections",
                  snfs: "SaaS",
                  al: "Manual",
                  boardCare: "Manual",
                  homeHealth: "SaaS",
                  hospice: "SaaS",
                  competitors: "AlayaCare, MatrixCare",
                },
                {
                  workflow: "Inventory Management",
                  snfs: "SaaS/manual",
                  al: "Manual",
                  boardCare: "Manual",
                  homeHealth: "Manual",
                  hospice: "Manual",
                  competitors: "Medline (not software)",
                },
                {
                  workflow: "Family Communication",
                  snfs: "Cubigo-type",
                  al: "Phone/SMS",
                  boardCare: "Phone only",
                  homeHealth: "Manual",
                  hospice: "Manual",
                  competitors: "Cubigo, LifeLoop, CareMerge",
                },
              ],
            },
          ],
        },
      },
      topPairs: {
        title: "IV. Evaluate Top Subsegment × Workflow Pairs",
        pairs: [
          {
            title: "1. Board & Care × Staff Scheduling",
            criteria: [
              {
                item: "Product whitespace",
                notes: "No purpose-built tools; most use paper calendars or ad hoc texting.",
              },
              {
                item: "Business whitespace",
                notes: "Not targeted by incumbents due to small ACVs.",
              },
              {
                item: "Operational leverage",
                notes: "High — saves hours weekly and improves shift coverage.",
              },
              {
                item: "ACV estimate $",
                notes: "$500–$2,000 annually depending on feature depth.",
              },
              {
                item: "# customers at scale",
                notes: "~10,000+ board & care homes in U.S.",
              },
              {
                item: "Market size",
                notes: "$5M–$20M (conservative)",
              },
              {
                item: "Price sensitivity",
                notes: "High, but willingness if tied to labor cost savings.",
              },
              {
                item: "Known competitors",
                notes: "None that serve this specific niche.",
              },
            ],
          },
          {
            title: "2. Assisted Living × Family Communication",
            criteria: [
              {
                item: "Product whitespace",
                notes: "Weak penetration; mostly phone/email.",
              },
              {
                item: "Business whitespace",
                notes: "Families are a key differentiator — customer satisfaction hinges on communication.",
              },
              {
                item: "Operational leverage",
                notes: "Medium. Automates a stressful, manual process.",
              },
              {
                item: "ACV estimate $",
                notes: "$3,000–$6,000 annually depending on size.",
              },
              {
                item: "# customers at scale",
                notes: "~30,000 facilities",
              },
              {
                item: "Market size",
                notes: "$100M–$200M",
              },
              {
                item: "Price sensitivity",
                notes: "Moderate. Framed as retention tool.",
              },
              {
                item: "Known competitors",
                notes: "Cubigo, LifeLoop (but adoption is light outside large chains).",
              },
            ],
          },
          {
            title: "3. Home Health × Regulatory Compliance",
            criteria: [
              {
                item: "Product whitespace",
                notes: "Some tools exist but often built for SNFs.",
              },
              {
                item: "Business whitespace",
                notes: "Operators juggle multiple portals, requirements.",
              },
              {
                item: "Operational leverage",
                notes: "High — audit prep, inspection avoidance.",
              },
              {
                item: "ACV estimate $",
                notes: "$4,000–$8,000 annually.",
              },
              {
                item: "# customers at scale",
                notes: "~11,000 Medicare-certified agencies",
              },
              {
                item: "Market size",
                notes: "~$50M–$90M",
              },
              {
                item: "Price sensitivity",
                notes: "Low-medium — tied to reimbursement.",
              },
              {
                item: "Known competitors",
                notes: "SimpleLTC, PointClickCare (partial coverage).",
              },
            ],
          },
        ],
      },
      buyerPersonas: {
        title: "V. Buyer Personas",
        personas: [
          {
            buyer: "Owner-Operator (Board & Care)",
            workflowOwned: "Staff Scheduling",
            contextOfPain: "Constant call-offs, can&apos;t find coverage, no software",
            budgetControl: "Yes",
            notes: "Tech-averse but open to low-friction tools.",
          },
          {
            buyer: "Executive Director (Assisted Living)",
            workflowOwned: "Family Communication",
            contextOfPain: "Pressure from families, calls interrupt operations",
            budgetControl: "Yes",
            notes: "Seeks differentiation via family satisfaction.",
          },
          {
            buyer: "Compliance Manager (Home Health)",
            workflowOwned: "Regulatory Compliance",
            contextOfPain: "Frequent audits, overwhelmed by documentation tasks",
            budgetControl: "Partial",
            notes: "Wants integrations with EMR and billing.",
          },
        ],
      },
    },
  },
  // Keep existing allrx data as fallback
  allrx: {
    title: "Digital Health Industry Decomposition",
    industry: "Pharmacy Operations",
    summary: "Comprehensive breakdown of the digital health market segments and opportunities.",
  },
}

const getScoreColor = (score: number) => {
  if (score === 3) return "bg-green-100 text-green-800 border-green-200"
  if (score === 2) return "bg-yellow-100 text-yellow-800 border-yellow-200"
  return "bg-red-100 text-red-800 border-red-200"
}

const getToolingColor = (tooling: string) => {
  if (tooling.includes("SaaS") || tooling.includes("Vertical")) return "bg-green-100 text-green-800"
  if (tooling.includes("Excel") || tooling.includes("Manual")) return "bg-yellow-100 text-yellow-800"
  if (tooling.includes("Paper") || tooling.includes("Binders")) return "bg-red-100 text-red-800"
  return "bg-gray-100 text-gray-800"
}

export default function IndustryDecomposition() {
  const router = useRouter()
  const params = useParams()
  const dealId = params.dealId as string
  
  // Use dynamic data if available, otherwise fall back to hardcoded data
  const decomposition = decompositionData[dealId] || fallbackData[dealId] || fallbackData["long-term-care"]
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading decomposition...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header matching other decomposition pages */}
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
            width={180}
            height={48}
            className="h-16 w-auto"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-3 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]"
          onClick={() => {
            // PDF mapping for decomposition pages
            const pdfMap: { [key: string]: string } = {
              "long-term-care": "/Industry Decomposition - Long Term Care (LTC).pdf",
              "construction-tech": "/Industry Decomposition Construction Tech.pdf",
              "dtc-healthcare": "/Industry Decomposition- DTC Healthcare.pdf",
              "accounting-services": "/Industry Decomposition - Accounting Services.pdf",
              "b2b-sales-marketing-software": "/Industry Decomposition- B2B Sales & Marketing Technology.pdf",
              "healthcare-e-learning": "/Industry Decomposition - Healthcare E-Learning.pdf"
            }
            const pdfLink = pdfMap[dealId] || "#"
            if (pdfLink !== "#") {
              window.open(pdfLink, '_blank');
            }
          }}
          aria-label="Download PDF"
        >
          <Download className="w-7 h-7" />
        </Button>
      </div>
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{decomposition.title}</h1>
          {decomposition.subtitle && (
            <p className="text-lg text-gray-600 mt-2">{decomposition.subtitle}</p>
          )}
        </div>
        {decomposition.content ? (
          <div className="space-y-12">
            {/* InVitro Criteria Scoring */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {decomposition.content.criteriaScoring.title}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Filter</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900 min-w-[120px]">
                        Score (1–3)
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        Justification
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {decomposition.content.criteriaScoring.data.map((row: { filter: string; score: number; justification: string }, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.filter}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center min-w-[120px]">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${getScoreColor(row.score)}`}
                          >
                            {row.score}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.justification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* MECE Subsegmentation */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {decomposition.content.subsegmentation.title}
              </h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                {decomposition.content.subsegmentation.subtitle}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        Subsegment
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        Description
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {decomposition.content.subsegmentation.data.map((row: { subsegment: string; description: string; notes: string }, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
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
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {decomposition.content.workflowDecomposition.title}
              </h2>

              {/* Master Workflow List */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {decomposition.content.workflowDecomposition.masterWorkflowList.title}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Workflow Name
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Description
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Current Tooling
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Known Vendors / Tools
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {decomposition.content.workflowDecomposition.masterWorkflowList.data.map(
                        (row: { workflow: string; description: string; currentTooling: string; vendors: string }, index: number) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                              {row.workflow}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.description}</td>
                            <td className="border border-gray-300 px-4 py-3">
                              <span className={`px-2 py-1 rounded text-sm ${getToolingColor(row.currentTooling)}`}>
                                {row.currentTooling}
                              </span>
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.vendors}</td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Functional Groupings */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {decomposition.content.workflowDecomposition.functionalGroupings.title}
                </h3>
                <div className="bg-accent/10 p-6 rounded-lg">
                  <ul className="space-y-2">
                    {decomposition.content.workflowDecomposition.functionalGroupings.groups.map(
                      (group: string, index: number) => (
                        <li key={index} className="text-gray-700 font-medium">
                          {group}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              {/* Workflow Matrices */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {decomposition.content.workflowDecomposition.workflowMatrices.title}
                </h3>
                <div className="space-y-8">
                  {decomposition.content.workflowDecomposition.workflowMatrices.categories.map(
                    (category: { title: string; workflows: Array<{ workflow: string; snfs: string; al: string; boardCare: string; homeHealth: string; hospice: string; competitors: string }> }, categoryIndex: number) => (
                      <div key={categoryIndex} className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.title}</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-300 bg-white">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900 text-sm">
                                  Workflow
                                </th>
                                <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-900 text-sm">
                                  SNFs
                                </th>
                                <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-900 text-sm">
                                  AL
                                </th>
                                <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-900 text-sm">
                                  Board & Care
                                </th>
                                <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-900 text-sm">
                                  Home Health
                                </th>
                                <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-900 text-sm">
                                  Hospice
                                </th>
                                <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900 text-sm">
                                  Competitors
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.workflows.map((workflow: { workflow: string; snfs: string; al: string; boardCare: string; homeHealth: string; hospice: string; competitors: string }, workflowIndex: number) => (
                                <tr key={workflowIndex} className={workflowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                  <td className="border border-gray-300 px-3 py-2 font-medium text-gray-800 text-sm">
                                    {workflow.workflow}
                                  </td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">
                                    <span className={`px-2 py-1 rounded text-xs ${getToolingColor(workflow.snfs)}`}>
                                      {workflow.snfs}
                                    </span>
                                  </td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">
                                    <span className={`px-2 py-1 rounded text-xs ${getToolingColor(workflow.al)}`}>
                                      {workflow.al}
                                    </span>
                                  </td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">
                                    <span
                                      className={`px-2 py-1 rounded text-xs ${getToolingColor(workflow.boardCare)}`}
                                    >
                                      {workflow.boardCare}
                                    </span>
                                  </td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">
                                    <span
                                      className={`px-2 py-1 rounded text-xs ${getToolingColor(workflow.homeHealth)}`}
                                    >
                                      {workflow.homeHealth}
                                    </span>
                                  </td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">
                                    <span className={`px-2 py-1 rounded text-xs ${getToolingColor(workflow.hospice)}`}>
                                      {workflow.hospice}
                                    </span>
                                  </td>
                                  <td className="border border-gray-300 px-3 py-2 text-gray-700 text-sm">
                                    {workflow.competitors}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </section>

            {/* Top Subsegment × Workflow Pairs */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {decomposition.content.topPairs.title}
              </h2>
              <div className="space-y-8">
                {decomposition.content.topPairs.pairs.map((pair: { title: string; criteria: Array<{ item: string; notes: string }> }, index: number) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-accent/10 to-indigo-50 p-6 rounded-lg border border-accent/20"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">{pair.title}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300 bg-white">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                              Criteria
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                              Notes
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pair.criteria.map((criterion: { item: string; notes: string }, criterionIndex: number) => (
                            <tr key={criterionIndex} className={criterionIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                                {criterion.item}
                              </td>
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
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {decomposition.content.buyerPersonas.title}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        Buyer Title / Role
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        Workflow Owned
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        Context of Pain
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">
                        Budget Control
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {decomposition.content.buyerPersonas.personas.map((persona: { buyer: string; workflowOwned: string; contextOfPain: string; budgetControl: string; notes: string }, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{persona.buyer}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{persona.workflowOwned}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{persona.contextOfPain}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 rounded text-sm font-medium ${
                              persona.budgetControl === "Yes"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {persona.budgetControl}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{persona.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                For inquiries, detailed materials, or follow-up discussions, please contact:
              </h3>
              <div className="text-gray-700">
                <p className="font-medium">Jonathan Schroeder</p>
                <p>Director of Investments</p>
                <p>InVitro Capital</p>
                <p className="text-blue-600">jonathan.schroeder@invitrocapital.com</p>
              </div>
            </section>
          </div>
        ) : (
          // Fallback for other deals
          <div>Fallback content for other deals...</div>
        )}
      </div>
    </div>
  )
} 
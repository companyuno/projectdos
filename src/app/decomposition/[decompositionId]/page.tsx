"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface DecompositionData {
  title: string
  industry: string
  publishDate: string
  readTime: string
  tags: string[]
  live: boolean
  featured: boolean
}

export default function DynamicDecompositionPage() {
  const params = useParams()
  const decompositionId = params.decompositionId as string
  const [decompositionData, setDecompositionData] = useState<DecompositionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDecompositionData = async () => {
      try {
        const response = await fetch('/api/thesis')
        const thesisData = await response.json()
        
        // Find the decomposition by ID
        const decomposition = thesisData[decompositionId]
        if (decomposition && decomposition.type === 'decomposition') {
          setDecompositionData({
            title: decomposition.title,
            industry: decomposition.industry,
            publishDate: decomposition.publishDate,
            readTime: decomposition.readTime,
            tags: decomposition.tags || [],
            live: decomposition.live || false,
            featured: decomposition.featured || false
          })
        }
      } catch (error) {
        console.error('Error fetching decomposition data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDecompositionData()
  }, [decompositionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!decompositionData || !decompositionData.live) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">This decomposition page is not available or not live.</p>
        </div>
      </div>
    )
  }

  // Render the appropriate decomposition component based on ID
  const renderDecompositionContent = () => {
    switch (decompositionId) {
      case 'long-term-care':
        return <LongTermCareDecomposition />
      case 'construction-tech':
        return <ConstructionTechDecomposition />
      case 'healthcare-e-learning':
        return <HealthcareELearningDecomposition />
      case 'accounting-services':
        return <AccountingServicesDecomposition />
      case 'b2b-sales-marketing-software':
        return <B2BSalesMarketingDecomposition />
      case 'dtc-healthcare':
        return <DTCHealthcareDecomposition />
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Decomposition Not Found</h2>
            <p className="text-gray-600">The requested decomposition page does not exist.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 w-full shadow-sm flex items-center justify-between h-20 px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
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
            // Dynamic PDF download based on decomposition ID
            const pdfName = `${decompositionData.title.replace(/\s+/g, '-')}.pdf`
            window.open(`/${pdfName}`, '_blank')
          }}
          aria-label="Download PDF"
        >
          <Download className="w-7 h-7" />
        </Button>
      </div>
      
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Industry Decomposition: {decompositionData.title.replace(' Industry Decomposition', '')}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
            <span>{decompositionData.industry}</span>
            <span>•</span>
            <span>{decompositionData.publishDate}</span>
            <span>•</span>
            <span>{decompositionData.readTime}</span>
          </div>
          
          {decompositionData.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {decompositionData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Render the specific decomposition content */}
        {renderDecompositionContent()}
      </div>
    </div>
  )
}

// Import the actual decomposition components with their rich content
function LongTermCareDecomposition() {
  const criteriaScoring = [
    {
      filter: "Tech-starved",
      score: 3,
      justification: "Most LTC providers still operate on paper or use generic tools like Excel. Purpose-built software penetration is low, especially outside skilled nursing.",
    },
    {
      filter: "Labor-intensive",
      score: 3,
      justification: "The sector is heavily dependent on human labor for daily care, administration, compliance, and communication. Labor shortages are a persistent issue.",
    },
    {
      filter: "Fragmented",
      score: 3,
      justification: "Includes thousands of independent facilities (e.g. RCFE, assisted living, home health). No dominant national platforms outside large SNFs or REITs.",
    },
    {
      filter: "Overlooked",
      score: 2,
      justification: "While private equity is active in SNFs, smaller segments (e.g. board & care, independent assisted living) receive little venture or product attention.",
    },
    {
      filter: "Capital-efficient",
      score: 2,
      justification: "Software purchases are often small-ticket and cash-constrained, but operators are willing to spend if the ROI is clear and staffing time is saved.",
    },
  ];

  const subsegmentation = [
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
      description: "Provide care in a patient's home (e.g. nursing, therapy).",
      notes: "Heavily regulated. Some workflow digitization exists.",
    },
    {
      subsegment: "Hospice & Palliative Care",
      description: "End-of-life care, often delivered in-home or within LTC facilities.",
      notes: "Specialized workflows. Less tooling outside billing.",
    },
  ];

  const masterWorkflowList = [
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
      workflow: "Family Communication",
      description: "Update families on resident status, events, care changes.",
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
  ];

  const functionalGroupings = [
    "1. Care Delivery & Resident Management",
    "2. Labor & Scheduling",
    "3. Compliance & Documentation",
    "4. Admin Ops (Billing, Inventory, Intake)",
    "5. Family & External Communication",
  ];

  const workflowMatrices = [
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
  ];

  const topPairs = [
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
  ];

  const buyerPersonas = [
    {
      buyer: "Owner-Operator (Board & Care)",
      workflowOwned: "Staff Scheduling",
      contextOfPain: "Constant call-offs, can't find coverage, no software",
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
  ];

  const getScoreColor = (score: number) => {
    if (score >= 3) return "bg-green-100 text-green-800";
    if (score === 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getToolingColor = (tooling: string) => {
    if (tooling.includes("SaaS")) return "bg-blue-100 text-blue-800";
    if (tooling.includes("Manual") || tooling.includes("Paper")) return "bg-red-100 text-red-800";
    if (tooling.includes("Excel")) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Industry Decomposition: Long Term Care</h1>
        
        {/* I. InVitro Criteria Scoring */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">I. InVitro Criteria Scoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {criteriaScoring.map((criteria, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{criteria.filter}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(criteria.score)}`}>
                    Score: {criteria.score}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{criteria.justification}</p>
              </div>
            ))}
          </div>
        </div>

        {/* II. MECE Subsegmentation of the Industry */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">II. MECE Subsegmentation of the Industry</h2>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Subsegmentation by Setting</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsegmentation.map((segment, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{segment.subsegment}</h3>
                <p className="text-gray-700 text-sm mb-3">{segment.description}</p>
                <p className="text-gray-600 text-xs italic">{segment.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* III. Workflow Decomposition */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">III. Workflow Decomposition</h2>
          
          {/* A. Master Workflow List */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">A. Master Workflow List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Tooling</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendors</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {masterWorkflowList.map((workflow, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workflow.workflow}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{workflow.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{workflow.currentTooling}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{workflow.vendors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. Functional Groupings */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">B. Functional Groupings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {functionalGroupings.map((group, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900">{group}</p>
                </div>
              ))}
            </div>
          </div>

          {/* C. Workflow Matrices by Subsegment */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">C. Workflow Matrices by Subsegment</h3>
            {workflowMatrices.map((matrix, matrixIndex) => (
              <div key={matrixIndex} className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{matrix.title}</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SNFs</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AL</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Board Care</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Home Health</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospice</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitors</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {matrix.workflows.map((workflow, workflowIndex) => (
                        <tr key={workflowIndex}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workflow.workflow}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getToolingColor(workflow.snfs)}`}>
                              {workflow.snfs}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getToolingColor(workflow.al)}`}>
                              {workflow.al}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getToolingColor(workflow.boardCare)}`}>
                              {workflow.boardCare}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getToolingColor(workflow.homeHealth)}`}>
                              {workflow.homeHealth}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getToolingColor(workflow.hospice)}`}>
                              {workflow.hospice}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{workflow.competitors}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IV. Evaluate Top Subsegment × Workflow Pairs */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">IV. Evaluate Top Subsegment × Workflow Pairs</h2>
          <div className="space-y-8">
            {topPairs.map((pair, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{pair.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pair.criteria.map((criterion, criterionIndex) => (
                    <div key={criterionIndex} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{criterion.item}</h4>
                      <p className="text-sm text-gray-700">{criterion.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* V. Buyer Personas */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">V. Buyer Personas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow Owned</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Context of Pain</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget Control</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {buyerPersonas.map((persona, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{persona.buyer}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{persona.workflowOwned}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{persona.contextOfPain}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{persona.budgetControl}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{persona.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConstructionTechDecomposition() {
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
        { item: "Market timing", notes: "Labor shortages driving urgency, regulatory pressure for compliance" },
        { item: "Competitive moat", notes: "Network effects from crew adoption, switching costs from training" },
      ],
    },
    {
      title: "Opportunity 2: Residential Builders x Procurement",
      criteria: [
        { item: "Product whitespace", notes: "Phone/email procurement, no integrated solutions for small builders" },
        { item: "Business whitespace", notes: "Transaction-based revenue model, supplier network effects" },
        { item: "Market timing", notes: "Supply chain disruptions creating urgency, material cost volatility" },
        { item: "Competitive moat", notes: "Supplier relationships, payment terms, volume discounts" },
      ],
    },
    {
      title: "Opportunity 3: Equipment Tracking x Fleet Management",
      criteria: [
        { item: "Product whitespace", notes: "Manual tracking, no integrated solution for mixed owned/rented fleets" },
        { item: "Business whitespace", notes: "Hardware + SaaS model, rental company partnerships" },
        { item: "Market timing", notes: "Equipment shortages, rising rental costs, insurance pressure" },
        { item: "Competitive moat", notes: "Hardware integration, rental company relationships, data moats" },
      ],
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 3) return "bg-green-100 text-green-800";
    if (score === 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getToolingColor = (tooling: string) => {
    if (tooling.includes("SaaS")) return "bg-blue-100 text-blue-800";
    if (tooling.includes("Manual") || tooling.includes("Paper")) return "bg-red-100 text-red-800";
    if (tooling.includes("Excel")) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Construction Technology Industry Decomposition</h1>
        
        {/* Executive Summary */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The construction industry represents a massive, fragmented market with significant software opportunities. 
            While large contractors have adopted project management platforms, many workflows remain manual and underserved. 
            Key opportunities exist in labor management for subcontractors, procurement for residential builders, and 
            equipment tracking across the industry.
          </p>
        </div>

        {/* Industry Criteria Scoring */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Industry Criteria Scoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {criteriaScoring.map((criteria, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{criteria.filter}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(criteria.score)}`}>
                    Score: {criteria.score}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{criteria.justification}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Subsegmentation */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Market Subsegmentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsegmentation.map((segment, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{segment.subsegment}</h3>
                <p className="text-gray-700 text-sm mb-3">{segment.description}</p>
                <p className="text-gray-600 text-xs italic">{segment.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Master Workflow List */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Master Workflow List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Tooling</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendors</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {masterWorkflowList.map((workflow, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workflow.workflow}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{workflow.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{workflow.currentTooling}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{workflow.vendors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Workflow Matrices */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Workflow Adoption Matrix</h2>
          {workflowMatrices.map((matrix, matrixIndex) => (
            <div key={matrixIndex} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{matrix.title}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commercial GC</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Residential Builder</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcontractor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suppliers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Developers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitors</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {matrix.workflows.map((workflow, workflowIndex) => (
                      <tr key={workflowIndex}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workflow.workflow}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getToolingColor(workflow.commercialGC)}`}>
                            {workflow.commercialGC}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getToolingColor(workflow.residentialBuilder)}`}>
                            {workflow.residentialBuilder}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getToolingColor(workflow.subcontractor)}`}>
                            {workflow.subcontractor}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getToolingColor(workflow.suppliers)}`}>
                            {workflow.suppliers}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getToolingColor(workflow.developers)}`}>
                            {workflow.developers}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{workflow.competitors}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Top Opportunity Pairs */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Top Opportunity Pairs</h2>
          <div className="space-y-8">
            {topPairs.map((pair, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{pair.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pair.criteria.map((criterion, criterionIndex) => (
                    <div key={criterionIndex} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{criterion.item}</h4>
                      <p className="text-sm text-gray-700">{criterion.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function HealthcareELearningDecomposition() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Healthcare E-Learning Industry Decomposition</h1>
        
        {/* Executive Summary */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The Healthcare E-Learning industry represents a growing market for digital education solutions in healthcare. 
            The industry is driven by regulatory requirements, continuing education needs, and the shift toward digital learning. 
            Key opportunities exist in compliance training, clinical skills development, and continuing medical education.
          </p>
        </div>

        {/* Industry Criteria Scoring */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Industry Criteria Scoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Tech-starved</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Score: 2
                </span>
              </div>
              <p className="text-gray-700 text-sm">Many healthcare organizations still use outdated training methods.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Labor-intensive</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Score: 3
                </span>
              </div>
              <p className="text-gray-700 text-sm">Training requires significant instructor time and resources.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Fragmented</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Score: 3
                </span>
              </div>
              <p className="text-gray-700 text-sm">Highly fragmented across specialties, institutions, and regions.</p>
            </div>
          </div>
        </div>

        {/* Market Subsegmentation */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Market Subsegmentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Continuing Medical Education</h3>
              <p className="text-gray-700 text-sm mb-3">CME credits for physicians and healthcare professionals</p>
              <p className="text-gray-600 text-xs italic">Regulatory requirements, accreditation standards</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Compliance Training</h3>
              <p className="text-gray-700 text-sm mb-3">HIPAA, OSHA, and other regulatory training</p>
              <p className="text-gray-600 text-xs italic">Mandatory requirements, audit trails</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Clinical Skills Development</h3>
              <p className="text-gray-700 text-sm mb-3">Hands-on training for clinical procedures</p>
              <p className="text-gray-600 text-xs italic">Simulation-based learning, competency assessment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AccountingServicesDecomposition() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Accounting Services Industry Decomposition</h1>
        
        {/* Executive Summary */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The Accounting Services industry is undergoing significant digital transformation with opportunities for automation 
            and workflow optimization. The industry is characterized by manual processes, regulatory compliance requirements, 
            and the need for real-time financial insights.
          </p>
        </div>

        {/* Industry Criteria Scoring */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Industry Criteria Scoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Tech-starved</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Score: 2
                </span>
              </div>
              <p className="text-gray-700 text-sm">Many firms still rely on legacy systems and manual processes.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Labor-intensive</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Score: 3
                </span>
              </div>
              <p className="text-gray-700 text-sm">Heavily dependent on skilled accountants and bookkeepers.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Fragmented</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Score: 3
                </span>
              </div>
              <p className="text-gray-700 text-sm">Highly fragmented across firm sizes and specialties.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function B2BSalesMarketingDecomposition() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">B2B Sales & Marketing Technology Decomposition</h1>
        
        {/* Executive Summary */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The B2B Sales & Marketing Technology industry represents a mature but evolving market with opportunities 
            for integration, automation, and AI-driven insights. The industry is characterized by complex sales cycles, 
            data silos, and the need for measurable ROI.
          </p>
        </div>

        {/* Industry Criteria Scoring */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Industry Criteria Scoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Tech-starved</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  Score: 1
                </span>
              </div>
              <p className="text-gray-700 text-sm">Well-established technology stack with many mature solutions.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Labor-intensive</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Score: 2
                </span>
              </div>
              <p className="text-gray-700 text-sm">Sales and marketing processes still require significant human input.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Fragmented</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Score: 3
                </span>
              </div>
              <p className="text-gray-700 text-sm">Highly fragmented across tools, channels, and use cases.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DTCHealthcareDecomposition() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">DTC Healthcare Industry Decomposition</h1>
        
        {/* Executive Summary */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The Direct-to-Consumer Healthcare industry represents a rapidly growing market for consumer-facing healthcare 
            solutions. The industry is characterized by regulatory complexity, consumer expectations for convenience, 
            and the need for seamless digital experiences.
          </p>
        </div>

        {/* Industry Criteria Scoring */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Industry Criteria Scoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Tech-starved</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Score: 2
                </span>
              </div>
              <p className="text-gray-700 text-sm">Many healthcare providers lack modern consumer-facing technology.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Labor-intensive</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Score: 2
                </span>
              </div>
              <p className="text-gray-700 text-sm">Healthcare delivery requires significant human interaction.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Fragmented</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Score: 3
                </span>
              </div>
              <p className="text-gray-700 text-sm">Highly fragmented across providers, specialties, and regions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
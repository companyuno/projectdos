"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

const memoData: Record<string, any> = {
  curenta: {
    title: "InVitro Curenta SPV Investment Memorandum",
    category: "Investment Memorandum",
    publishDate: "2025-08-07",
    readTime: "8 min read",
    tags: ["Curenta", "Assisted Living", "AI", "Healthcare"],
    summary: "Investment in Curenta - AI-powered operating system for Assisted Living Facilities",
    content: {
      executiveSummary: {
        title: "EXECUTIVE SUMMARY",
        termDetails: {
          transaction: "Investment in Curenta",
          spvName: "InVitro Curenta SPV",
          targetRaise: "$2,000,000",
          targetCloseDate: "August 7th 2025",
          preMoneyValuation: "$6,000,000",
          postMoneyValuation: "$8,000,000",
          targetOwnership: "25%",
        },
        companyOverview:
          "Curenta is building the first AI-powered operating system for Assisted Living Facilities — automating clinical tasks, compliance, and administrative work for an industry still reliant on paper and spreadsheets.",
        keyHighlights: [
          "41 facilities live; $224K ARR as of May 2025, tracking $348K by August 2025",
          "Highly sticky compliance-driven platform with minimal churn to date",
          "Sales cycle averaging 2-6 months; growing multi-site enterprise pipeline",
          "$1.7B SAM (serviceable market in ALFs), with expansion potential into broader LTC",
          "Experienced team with prior healthcare exits",
          "Compelling entry valuation relative to traction and long-term market opportunity",
        ],
        whyNow: [
          "Senior care remains fragmented: thousands of ALFs with no dominant vendor",
          "Legacy systems serve large skilled nursing but are too complex and costly for ALFs",
          "Labor shortages and stricter compliance are driving urgent automation demand",
          "AI now enables automation of workflows previously impossible",
          "Curenta is positioned to become the first scaled platform for this segment",
        ],
      },
      companySnapshot: {
        title: "COMPANY SNAPSHOT",
        data: [
          { category: "Company Name", details: "Curenta" },
          { category: "Headquarters", details: "Irvine, California" },
          { category: "Founded", details: "2024" },
          {
            category: "Business Model",
            details: "B2B SaaS platform delivering AI-powered workflow automation for Assisted Living Facilities (ALF)",
          },
          {
            category: "Primary Customer Profile",
            details:
              "Assisted Living Facilities (ALFs); operational buyer is Director of Nursing & Administrators; economic buyer is regional operator / multi-site ownership groups",
          },
          {
            category: "Core Pain Point Solved",
            details: "Labor shortages, compliance risk, and administrative inefficiency in senior care workflows",
          },
          { category: "Product Maturity", details: "Commercial, with 41 facilities live as of May 2025" },
          {
            category: "Key Metrics",
            details: "ARR: $224K as of May 2025; Projected $348K by August 2025; Minimal churn post onboarding",
          },
          {
            category: "Unit Economics",
            details: "CAC falling rapidly; payback under 6 months; sales cycle 2 to 6 months",
          },
          { category: "Sales Model", details: "Direct sales with land-and-expand enterprise sales motion" },
          {
            category: "Competitive Advantage",
            details:
              "Fully embedded compliance-driven automation; real-time task orchestration reduces staff workload, improves compliance, and creates highly sticky adoption; no scaled competitor focused on ALFs",
          },
          { category: "Regulatory Exposure", details: "Moderate — governed by state-level ALF compliance standards" },
          {
            category: "Key Management Team",
            details:
              "Ramy Barsoum (CEO); Shona Herbert (VP Sales); Peter Tran (Product Manager); Usama Atteya (Director of Engineering)",
          },
          {
            category: "Board Composition",
            details: "Ramy Barsoum (CEO), InVitro Capital (Board Seat / Voting Control)",
          },
          {
            category: "Key Risks",
            details:
              "Sales execution risk as enterprise sales motion scales; fragmentation of ALF operator landscape; regulatory complexity across state compliance regimes; operational scaling of sales and customer success infrastructure",
          },
          {
            category: "Key Catalysts / Unlocks",
            details:
              "Buildout of enterprise sales team; national expansion across multi-state ALF groups; near-term entry into SNF and Home Health segments; continued compliance automation feature expansion",
          },
        ],
      },
      dealSnapshot: {
        title: "DEAL SNAPSHOT",
        terms: [
          { item: "Target Company", terms: "Curenta" },
          { item: "Target Round Size", terms: "$2,000,000" },
          { item: "Pre-Money Valuation", terms: "$6,000,000" },
          { item: "Post-Money Valuation", terms: "$8,000,000" },
          { item: "SPV Target Raise", terms: "$2,000,000" },
          { item: "SPV Ownership % (Post-Money)", terms: "25%" },
          { item: "Use of Proceeds", terms: "Enterprise Sales Expansion, Family Engagement Product Development" },
          { item: "SPV Structure", terms: "Delaware LLC" },
          { item: "Management Fee", terms: "2% (paid upfront)" },
          { item: "GP Carry", terms: "20% (on profits above return of capital)" },
          { item: "Preferred Return (if any)", terms: "8%" },
          { item: "Minimum Commitment", terms: "$50,000" },
          { item: "Close Date", terms: "August 7th 2025" },
          { item: "Distributions", terms: "As liquidity events occur; subject to waterfall" },
        ],
        returnScenarios: [
          { exitValue: "3x ($24M)", grossReturn: "~$300,000", facilitiesLive: "~960" },
          { exitValue: "5x ($40M)", grossReturn: "~$500,000", facilitiesLive: "~1,600" },
          { exitValue: "10x ($80M)", grossReturn: "~$1,000,000", facilitiesLive: "~3,200" },
          { exitValue: "20x ($160M)", grossReturn: "~$2,000,000", facilitiesLive: "~6,400" },
        ],
      },
      industryFraming: {
        title: "INDUSTRY FRAMING",
        marketSize: [
          { segment: "Total Market", tam: "$20B", sam: "$1.7B", som: "~50M ARR (obtainable near-term segment)" },
        ],
        competitive: [
          {
            competitor: "PointClickCare",
            status: "Scaled",
            positioning: "Legacy skilled nursing platform; heavy, expensive for ALFs",
          },
          { competitor: "Yardi", status: "Scaled", positioning: "Back-office & billing; weak on clinical workflows" },
          {
            competitor: "August Health",
            status: "Early-stage",
            positioning: "Digital charting & assessments for ALFs",
          },
          { competitor: "Eldermark", status: "Mid-tier", positioning: "Legacy ALF EMR; limited workflow automation" },
          {
            competitor: "Curenta",
            status: "Your target",
            positioning: "Real-time compliance automation & workflow orchestration",
          },
        ],
        workflowGaps: [
          {
            workflow: "Daily Task Management",
            pain: "Missed care tasks, inconsistent staff follow-through",
            solution: "AI prompts caregivers & tracks task completion",
          },
          {
            workflow: "Regulatory Compliance",
            pain: "Complex, multi-portal, audit risk",
            solution: "Complex documentation, audit risk, staff burden",
          },
          {
            workflow: "Staff Scheduling",
            pain: "Manual, ad hoc, labor-intensive",
            solution: "Automated shift management and real-time coverage tools",
          },
          {
            workflow: "Family Communication",
            pain: "Fragmented, phone-based, reactive",
            solution: "Centralized digital platform improving transparency and engagement",
          },
        ],
        positioning:
          "Curenta goes beyond digital documentation to automate daily operations inside Assisted Living Facilities. Its AI-powered agent generates personalized resident service plans, prompts caregivers for daily tasks, and automatically documents compliance activities as they occur. This streamlines regulatory compliance, reduces administrative burden, and improves care quality, while embedding deeply into daily staff workflows. No scaled platform offers this level of real-time operational automation for ALFs today.",
      },
      keyRisks: [
        "Sales Execution Risk: Curenta is transitioning from early pilot adoption into enterprise-level multi-site sales. Success depends on the team's ability to scale enterprise sales motion across fragmented regional operators with complex buying processes.",
        "Market Fragmentation: The Assisted Living Facility (ALF) segment remains highly fragmented across small operators, which may create variability in sales cycles, pricing power, and expansion consistency.",
        "Regulatory Complexity: State-by-state regulatory variance requires continuous compliance rule updates embedded into the platform, creating operational complexity as the company expands nationally.",
        "Operational Scaling: Rapid growth will require expansion of sales, customer success, product, and regulatory teams to sustain service levels across diverse operator footprints.",
        "Capital Requirements: Additional financing may be required to support national expansion plans and continued product development.",
      ],
      nextSteps: [
        "Subscription documents available upon request.",
        "Target close by August 7th 2025",
        "Minimum commitment: $50,000",
        "Please contact Jonathan Schroeder at jonathan.schroeder@invitrocapital.com to discuss allocation.",
      ],
    },
  },
  // Keep existing allrx data as fallback
  allrx: {
    title: "AllRx Investment Memo",
    industry: "Digital Health",
    summary: "AllRx is revolutionizing prescription management through AI-powered medication adherence solutions.",
    keyPoints: [
      "Market size: $50B+ prescription management market",
      "Proprietary AI algorithms with 95% accuracy in predicting non-adherence",
      "Strong partnerships with 3 major pharmacy chains",
      "Proven revenue model with $2M ARR and 40% month-over-month growth",
    ],
  },
}

export default function InvestmentMemo() {
  const router = useRouter()
  const params = useParams()
  const dealId = params.dealId as string
  const memo = memoData[dealId] || memoData.allrx

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Deals
        </Button>

        {memo.content ? (
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center border-b pb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{memo.title}</h1>
              <div className="flex justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Executive Summary */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                {memo.content.executiveSummary.title}
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Term Details</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(memo.content.executiveSummary.termDetails).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                        <span className="font-semibold text-gray-900">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Overview</h3>
                <p className="text-gray-700 leading-relaxed">{memo.content.executiveSummary.companyOverview}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Investment Highlights</h3>
                <ul className="space-y-3">
                  {memo.content.executiveSummary.keyHighlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Why Now</h3>
                <ul className="space-y-3">
                  {memo.content.executiveSummary.whyNow.map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Company Snapshot */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                {memo.content.companySnapshot.title}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        Category
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {memo.content.companySnapshot.data.map((row: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.category}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Deal Snapshot */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                {memo.content.dealSnapshot.title}
              </h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Item</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Terms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memo.content.dealSnapshot.terms.map((row: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.item}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.terms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Illustrative Return Scenarios (Example $100K Investment)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Exit Value
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Gross Investor Return
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Facilities Live
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {memo.content.dealSnapshot.returnScenarios.map((scenario: any, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                            {scenario.exitValue}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">
                            {scenario.grossReturn}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{scenario.facilitiesLive}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-2 italic">
                  Returns shown before fund fees and carry. Illustrative, assumes $5K ARR per facility and ~10x revenue
                  multiple. Note: There are ~30,000 Assisted Living Facilities in the U.S.
                </p>
              </div>
            </section>

            {/* Industry Framing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                {memo.content.industryFraming.title}
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Size</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Segment
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">TAM</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">SAM</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">SOM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memo.content.industryFraming.marketSize.map((row: any, index: number) => (
                        <tr key={index} className="bg-white">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.segment}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.tam}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.sam}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.som}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Competitive Landscape Summary</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Competitor
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Positioning
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {memo.content.industryFraming.competitive.map((row: any, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                            {row.competitor}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.status}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.positioning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Workflow Gaps Addressed</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Workflow Category
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Current Pain Point
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Company Solution
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {memo.content.industryFraming.workflowGaps.map((row: any, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.workflow}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.pain}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.solution}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Why Curenta Is Uniquely Positioned</h3>
                <p className="text-gray-700 leading-relaxed">{memo.content.industryFraming.positioning}</p>
              </div>
            </section>

            {/* Key Risks */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-red-600 pb-2">KEY RISKS</h2>
              <ul className="space-y-4">
                {memo.content.keyRisks.map((risk: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700">{risk}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Next Steps */}
            <section className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">NEXT STEPS</h2>
              <ul className="space-y-3">
                {memo.content.nextSteps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          // Fallback for other deals
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{memo.title}</CardTitle>
                  <CardDescription className="text-lg">{memo.industry}</CardDescription>
                </div>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Executive Summary
                </h3>
                <p className="text-gray-700 leading-relaxed">{memo.summary}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Key Investment Highlights</h3>
                <ul className="space-y-2">
                  {memo.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Investment Recommendation</h3>
                <p className="text-gray-700">
                  Based on our comprehensive analysis, we recommend proceeding with this investment opportunity. The
                  company demonstrates strong market positioning, proven traction, and significant growth potential
                  within the target market segment.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 
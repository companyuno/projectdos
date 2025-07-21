"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Download,
  Calendar,
  BookOpen,
  Building2,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  DollarSign,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function InVitroInvestmentBuildProcess() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Polished, Responsive Sticky Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 mb-8 px-2 py-3 shadow-sm">
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-[hsl(212,74%,15%)] text-[hsl(212,74%,15%)] rounded-full px-4 py-2 text-sm font-medium hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)] transition"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Research
              </Button>
            </div>
            <div className="flex justify-center items-center py-1">
              <img
                src="/logo.png"
                alt="InVitro Capital Logo"
                className="h-12 w-auto sm:h-16"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Button
                className="bg-white text-[hsl(212,74%,15%)] border border-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)]"
                asChild
              >
                <a
                  href="/IVC%20--%20Investment%20&%20Build%20Thesis.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">InVitro Capital – Investment & Build Thesis</h1>
        </div>
        <div className="space-y-12">
          {/* Executive Summary */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2" style={{ borderColor: '#0a2e4e' }}>
              <span className="flex items-center"><Building2 className="w-6 h-6 mr-2 text-blue-600" />I. Executive Summary</span>
            </h2>
            <div className="bg-blue-50 p-8 rounded-lg">
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                InVitro Capital is a venture studio fund purpose-built to generate alpha through structural control,
                capital discipline, and operational focus.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Company Creation</h3>
                  <p className="text-sm text-gray-700">
                    Integrated company creation and early validation under one roof
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Capital Discipline</h3>
                  <p className="text-sm text-gray-700">Milestone-based capital deployment with structural control</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Superior Returns</h3>
                  <p className="text-sm text-gray-700">Earlier liquidity and higher IRR in stagnant private markets</p>
                </div>
              </div>
            </div>
          </section>

          {/* Market Backdrop */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2" style={{ borderColor: '#0a2e4e' }}>
              II. Market Backdrop
            </h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Structural Headwinds in Private Equity and Venture Capital
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Private company investing has become foundational in allocator portfolios, but the playbook is changing.
                In both venture and private equity, the ability to source and exit deals is under pressure:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-3">Performance Decline</h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Median IRRs for PE dropped below 13%</li>
                    <li>• VC median IRRs fell below 10%</li>
                    <li>• IRR compression across vintages</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-3">Capital Inefficiency</h4>
                  <ul className="space-y-2 text-sm text-orange-700">
                    <li>• $2T+ dry powder in PE</li>
                    <li>• $300B+ dry powder in VC</li>
                    <li>• Higher entry multiples</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-3">Extended Timelines</h4>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li>• VC companies: 10-12 years to liquidity</li>
                    <li>• Growing &quot;zombie&quot; startup population</li>
                    <li>• Capital-draining, unexitable assets</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-3">Liquidity Constraints</h4>
                  <ul className="space-y-2 text-sm text-purple-700">
                    <li>• Pacing mismatches</li>
                    <li>• Portfolio construction strain</li>
                    <li>• Denominator risk</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mt-6">
                <p className="text-blue-800 font-medium">
                  In this context, allocators are increasingly seeking upstream exposure—models that offer tighter
                  control, lower capital burn, and earlier time to value.
                </p>
              </div>
            </div>
          </section>

          {/* The Case for Venture Studio Model */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2" style={{ borderColor: '#0a2e4e' }}>
              III. The Case for a Venture Studio Model
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Structural Advantages</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                InVitro&apos;s approach is built on three pillars: create, control, and compound.
              </p>

              <div className="grid gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-blue-900 mb-2">Create</h4>
                      <p className="text-blue-800">
                        The fund doesn&apos;t chase deals, it builds them. By identifying overlooked sectors with high labor
                        intensity, low tech penetration, and fragmentation, InVitro launches companies with embedded
                        operational leverage and consolidation potential.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-green-900 mb-2">Control</h4>
                      <p className="text-green-800">
                        Each portfolio company is majority-owned post-dilution through a combination of fund and studio
                        equity, preserving strategic control and exit flexibility.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-purple-900 mb-2">Compound</h4>
                      <p className="text-purple-800">
                        Centralized tech and talent infrastructure reduce marginal build cost and increase execution
                        speed. Investments are staged across 3–4 tranches based on live commercial traction, ensuring
                        capital only scales what&apos;s working.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Allocator Benefits:</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Governance Alignment</p>
                    <p className="text-sm text-gray-600">Majority equity ensures value realization focus</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Capital Efficiency</p>
                    <p className="text-sm text-gray-600">Controlled burn and milestone funding</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Early Validation</p>
                    <p className="text-sm text-gray-600">Products tested before outside capital</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Market Fit */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2" style={{ borderColor: '#0a2e4e' }}>
              IV. Market Fit: Where InVitro Operates
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              InVitro targets sectors with four common characteristics:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Labor-Intensive
                </h4>
                <p className="text-red-700">High OpEx from manual work, ripe for AI-driven automation</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Fragmented
                </h4>
                <p className="text-orange-700">No dominant incumbents, enabling consolidation plays</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Tech-Starved
                </h4>
                <p className="text-yellow-700">{"<50% software penetration, presenting greenfield opportunity"}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Overlooked
                </h4>
                <p className="text-green-700">&quot;Boring&quot; industries neglected by traditional venture despite large TAM</p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Initial Target Verticals:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-blue-700">
                  <li>• Senior care</li>
                  <li>• Healthcare services</li>
                </ul>
                <ul className="space-y-2 text-blue-700">
                  <li>• Local logistics</li>
                  <li>• Home maintenance</li>
                </ul>
              </div>
              <p className="text-blue-700 mt-4 italic">Markets with real unit economics and systemic inefficiencies</p>
            </div>
          </section>

          {/* Portfolio Construction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2" style={{ borderColor: '#0a2e4e' }}>
              V. Portfolio Construction and Liquidity Engineering
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Investment Framework</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Each venture is launched from scratch using a proprietary build methodology:
              </p>

              <div className="space-y-4">
                {[
                  {
                    step: "Discovery",
                    description: "Market identification, thesis development, and pain point validation",
                  },
                  {
                    step: "Validation",
                    description: "Product built in-house and tested with early users to confirm real demand",
                  },
                  { step: "Assembly", description: "Team formation centered around traction—not theory" },
                  {
                    step: "Funding",
                    description: "Capital deployed in tranches tied to revenue milestones ($10K → $30K → $250K MRR)",
                  },
                  {
                    step: "Scale",
                    description: "Companies reach profitability within 3–4 years with only one institutional round",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.step}</h4>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 p-6 rounded-lg mt-6">
                <p className="text-green-800 font-medium">
                  This framework is designed to front-load proof and back-load capital, enabling a higher return per
                  dollar deployed.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Liquidity Outlook</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                In contrast to traditional VC&apos;s 10+ year cycles, InVitro targets exit readiness within 3–5 year windows.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 text-center">
                  <h4 className="font-semibold text-blue-800 mb-3">Strategic Acquisition</h4>
                  <p className="text-blue-700 text-sm">By incumbents seeking automation or market access</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                  <h4 className="font-semibold text-green-800 mb-3">Private Equity Buyout</h4>
                  <p className="text-green-700 text-sm">Of profitable, de-risked assets</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 text-center">
                  <h4 className="font-semibold text-purple-800 mb-3">Recapitalization</h4>
                  <p className="text-purple-700 text-sm">Via structured exits or secondary sales</p>
                </div>
              </div>
            </div>
          </section>

          {/* Validation Process */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2" style={{ borderColor: '#0a2e4e' }}>
              VI. How We Validate and Build Companies
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  A. Industry List Construction and Filtering
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Industry Mapping</h4>
                      <p className="text-sm text-gray-700">
                        Build longlists of 50–100 U.S. industries from NAICS codes, census data, and PE patterns
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Criteria Scoring</h4>
                      <p className="text-sm text-gray-700">
                        Score against labor-intensive, tech-starved, and fragmented criteria
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Shortlist Creation</h4>
                      <p className="text-sm text-gray-700">
                        Filter to 10–15 &quot;fertile ground&quot; sectors for deeper analysis
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">B. Problem Validation and Signal Testing</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Only after whitespace is mapped do we move into problem validation. The goal is to answer one clear
                  question before building anything: &quot;Will you buy?&quot;
                </p>

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-4">Key Validation Metrics:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-yellow-700">
                      <li>
                        • <strong>Adoption velocity:</strong> 30-50% switch rate signals strong fit
                      </li>
                      <li>
                        • <strong>Purchase intent:</strong> ≥25% showing buying intent
                      </li>
                      <li>
                        • <strong>Retention:</strong> High 30-day retention rates
                      </li>
                    </ul>
                    <ul className="space-y-2 text-yellow-700">
                      <li>
                        • <strong>Blended CAC:</strong> Lower CAC from warm channels
                      </li>
                      <li>
                        • <strong>Early value:</strong> Tangible ROI in 2-3 weeks
                      </li>
                      <li>
                        • <strong>Workflow fit:</strong> Fast integration and setup
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">C. Tranche-Based Funding Structure</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Stage
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Revenue Target
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Focus
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                          Timeline
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">Validation</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">$0–10K MRR</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">
                          Problem and solution validation
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Studio capital</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">Seed</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">$10K–30K MRR</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">
                          Refine GTM and improve margins
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Year 1-2</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">Scale</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">$30K–250K MRR</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">
                          Scale if profitable and automated
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Year 2-3</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">Exit</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">$250K+ MRR</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">
                          Strategic acquisition or PE recap
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Year 4-5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Performance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2" style={{ borderColor: '#0a2e4e' }}>
              VII. Performance and Team
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">First Fund Performance</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">$13M+</p>
                        <p className="text-sm text-green-700">Combined annualized revenue</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-semibold text-blue-800">37.2%</p>
                        <p className="text-sm text-blue-700">Gross IRR (mature companies)</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-semibold text-purple-800">3 Years</p>
                        <p className="text-sm text-purple-700">Idea to exit-readiness</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Team Expertise</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">The leadership team combines experience across:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Healthcare and SaaS</li>
                    <li>• Venture investing</li>
                    <li>• Operational scaling</li>
                  </ul>
                  <p className="text-gray-700 mt-4 font-medium">
                    Collectively driving over $500M in enterprise value creation
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Allocator Fit */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2" style={{ borderColor: '#0a2e4e' }}>
              VIII. Allocator Fit
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 text-center">
                <h4 className="font-semibold text-blue-800 mb-3">Pacing Buffer</h4>
                <p className="text-blue-700 text-sm">
                  Venture building absorbs capital during dry PE/VC deployment cycles
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                <h4 className="font-semibold text-green-800 mb-3">Liquidity Bridge</h4>
                <p className="text-green-700 text-sm">Faster outcomes than VC, with lower volatility than seed funds</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 text-center">
                <h4 className="font-semibold text-purple-800 mb-3">Return Amplifier</h4>
                <p className="text-purple-700 text-sm">
                  Capital-efficient building with equity control drives IRR uplift
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Recommended Allocation:</h4>
              <p className="text-yellow-700 mb-2">
                <strong>2–4%</strong> of total portfolio capital, or <strong>10–20%</strong> of private company
                ownership sleeve
              </p>
              <p className="text-yellow-700 text-sm">
                Especially well-suited for allocators with domain expertise in operating businesses and appetite for
                active governance
              </p>
            </div>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2" style={{ borderColor: '#0a2e4e' }}>IX. Conclusion</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                InVitro Capital is not just a response to structural inefficiencies in private markets—it&apos;s a strategy
                designed to thrive in them.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By building companies with discipline, holding majority ownership, and targeting earlier profitability,
                InVitro unlocks a new path to venture-scale returns without the venture-style chaos.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium">
                This is not venture capital rebranded. It&apos;s a new category: a capital-controlled, outcome-aligned,
                execution-driven platform for building the next generation of enduring companies.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">X. Contact</h2>
            <p className="text-gray-700 mb-6">
              For inquiries, detailed materials, or follow-up discussions, please contact:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Jonathan Schroeder</h4>
                <p className="text-gray-600 mb-2">Director of Investments</p>
                <p className="text-gray-600 mb-2">InVitro Capital</p>
                <p className="text-blue-600">jonathan.schroeder@invitrocapital.com</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Amir Barsoum</h4>
                <p className="text-gray-600 mb-2">Managing Partner</p>
                <p className="text-gray-600 mb-2">InVitro Capital</p>
                <p className="text-blue-600">amir.barsoum@invitrocapital.com</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 
"use client"

import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Download,
  Building2,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  DollarSign,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function InVitroInvestmentBuildProcess() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 w-full shadow-sm flex items-center justify-between h-20 px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full p-3 text-[#0a2e4e] hover:bg-[#f0f6fc]"
          aria-label="Back"
        >
          <ArrowLeft className="w-7 h-7" />
        </Button>
        <div className="flex-1 flex justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-shlzMTEcKSNu9d3nfRlo4Lr2ixbYXL.png"
            alt="InVitro Capital Logo"
            width={180}
            height={48}
            className="h-16 w-auto"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-3 text-[#0a2e4e] hover:bg-[#f0f6fc]"
          asChild
          aria-label="Download PDF"
        >
          <a href="/IVC%20--%20Investment%20&%20Build%20Thesis.pdf" download target="_blank" rel="noopener noreferrer">
            <Download className="w-7 h-7" />
          </a>
        </Button>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">InVitro Capital – Investment & Build Thesis</h1>
        </div>

        <div className="space-y-12">
          {/* Executive Summary */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0a2e4e] pb-2">
              <span className="flex items-center">
                <Building2 className="w-6 h-6 mr-2 text-[#0a2e4e]" />
                I. Executive Summary
              </span>
            </h2>
            <div className="bg-[#f0f6fc] p-8 rounded-lg border border-[#6ba3d6]/20">
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                InVitro Capital is a venture studio fund purpose-built to generate alpha through
                structural control, capital discipline, and operational focus. It integrates company
                creation, early validation, and funding under one roof—bridging gaps left by
                traditional venture capital and private equity models. With a disciplined portfolio
                construction approach and milestone-based capital deployment, InVitro is
                positioned to deliver superior returns and earlier liquidity in an increasingly stagnant
                private markets environment. While InVitro is focused on company creation, much of
                the framework herein can be applied to evaluate early-stage startups and
                overlooked sectors through a capital-efficient lens.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0a2e4e] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Company Creation</h3>
                  <p className="text-sm text-gray-700">
                    Integrated company creation and early validation under one roof
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#6ba3d6] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Capital Discipline</h3>
                  <p className="text-sm text-gray-700">Milestone-based capital deployment with structural control</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0a2e4e] rounded-full flex items-center justify-center mx-auto mb-3">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0a2e4e] pb-2">
              II. Market Backdrop
            </h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Structural Headwinds in Private Equity and Venture Capital
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Private company investing has become foundational in allocator portfolios, but the
                playbook is changing. In both venture and private equity, the ability to source and
                exit deals is under pressure:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-3">Performance Decline</h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• IRR compression is eroding long-term outperformance across vintages. Median IRRs for PE and VC have dropped below 13% and 10%, respectively, over the past decade.</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-3">Capital Inefficiency</h4>
                  <ul className="space-y-2 text-sm text-orange-700">
                    <li>• Dry powder buildup—over $2 trillion in PE and $300 billion in VC—has outpaced quality deal flow, driving entry multiples higher and dragging down return efficiency.</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-3">Extended Timelines</h4>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li>• Exit timelines have extended. VC companies now take 10–12 years to reach liquidity, with a growing population of &quot;zombie&quot; startups—stagnant, capital-draining, and unexitable.</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-3">Liquidity Constraints</h4>
                  <ul className="space-y-2 text-sm text-purple-700">
                    <li>• Liquidity constraints and pacing mismatches are straining portfolio construction, particularly for allocators who must navigate capital calls, return profiles, and denominator risk.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f0f6fc] p-6 rounded-lg mt-6 border border-[#6ba3d6]/20">
                <p className="text-[#0a2e4e] font-medium">
                  In this context, allocators are increasingly seeking upstream exposure—models that offer tighter
                  control, lower capital burn, and earlier time to value.
                </p>
              </div>
            </div>
          </section>

          {/* The Case for Venture Studio Model */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0a2e4e] pb-2">
              III. The Case for a Venture Studio Model
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Structural Advantages</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                InVitro&#39;s approach is built on three pillars: create, control, and compound.
              </p>

              <div className="grid gap-6">
                <div className="bg-gradient-to-r from-[#f0f6fc] to-[#e6f2ff] p-6 rounded-lg border border-[#6ba3d6]/30">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0a2e4e] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a2e4e] mb-2">Create</h4>
                      <p className="text-gray-800">
                        The fund doesn&#39;t chase deals, it builds them. By identifying overlooked sectors with high labor intensity, low tech penetration, and fragmentation, InVitro launches companies with embedded operational leverage and consolidation potential.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#f0f6fc] to-[#e6f2ff] p-6 rounded-lg border border-[#6ba3d6]/30">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#6ba3d6] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a2e4e] mb-2">Control</h4>
                      <p className="text-gray-800">
                        Each portfolio company is majority-owned post-dilution through a combination of fund and studio equity, preserving strategic control and exit flexibility.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#f0f6fc] to-[#e6f2ff] p-6 rounded-lg border border-[#6ba3d6]/30">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0a2e4e] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a2e4e] mb-2">Compound</h4>
                      <p className="text-gray-800">
                        Centralized tech and talent infrastructure reduce marginal build cost and increase execution speed. Investments are staged across 3–4 tranches based on live commercial traction, ensuring capital only scales what&#39;s working.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">This model addresses key allocator pain points:</h4>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-[#6ba3d6] flex-shrink-0" />
                    <span className="font-semibold text-lg text-gray-900">Governance Alignment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-[#6ba3d6] flex-shrink-0" />
                    <span className="font-semibold text-lg text-gray-900">Capital Efficiency</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-[#6ba3d6] flex-shrink-0" />
                    <span className="font-semibold text-lg text-gray-900">Early Validation</span>
                  </div>
                </div>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Governance alignment:</strong> Majority equity and infrastructure alignment ensure decisions are made for value realization—not just fund-mark optimization. While shared infrastructure is used to accelerate initial build and reduce cost, each company owns and controls its own IP from inception—critical for downstream financing and defensibility.</li>
                  <li><strong>Capital efficiency:</strong> Controlled burn, milestone funding, and early profitability targets reduce time-to-liquidity and increase IRR.</li>
                  <li><strong>Early validation:</strong> Products are launched and tested before outside capital enters, de-risking venture exposure at the earliest stage.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Market Fit */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0a2e4e] pb-2">
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

            <div className="bg-[#f0f6fc] p-6 rounded-lg border border-[#6ba3d6]/20">
              <h4 className="font-semibold text-[#0a2e4e] mb-3">Initial Target Verticals:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-[#0a2e4e]">
                  <li>• Senior care</li>
                  <li>• Healthcare services</li>
                </ul>
                <ul className="space-y-2 text-[#0a2e4e]">
                  <li>• Local logistics</li>
                  <li>• Home maintenance</li>
                </ul>
              </div>
              <p className="text-[#0a2e4e] mt-4 italic">Markets with real unit economics and systemic inefficiencies</p>
            </div>
          </section>

          {/* Portfolio Construction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0a2e4e] pb-2">
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
                    <div className="w-8 h-8 bg-[#0a2e4e] rounded-full flex items-center justify-center flex-shrink-0">
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
                In contrast to traditional VC&#39;s 10+ year cycles, InVitro targets exit readiness within 3–5 year windows.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#f0f6fc] p-6 rounded-lg border border-[#6ba3d6]/30 text-center">
                  <h4 className="font-semibold text-[#0a2e4e] mb-3">Strategic Acquisition</h4>
                  <p className="text-gray-700 text-sm">By incumbents seeking automation or market access</p>
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
              <p className="text-gray-700 leading-relaxed mt-8">
                By building with exit in mind from day one—and retaining controlling equity—liquidity events are more frequent, earlier, and less dependent on public market conditions. This flexibility allows us to pursue an exit when it aligns with the company&#39;s strategic trajectory, not just fund timelines. It also creates the opportunity for partial or full liquidity in a variety of market environments, whether through buyouts, strategic interest, or investor-driven secondaries.
              </p>
            </div>
          </section>

          {/* Validation Process */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0a2e4e] pb-2">
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
                      <div className="w-12 h-12 bg-[#0a2e4e] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Industry Mapping</h4>
                      <p className="text-sm text-gray-700 text-left break-words">
                        We build longlists of 50–100 U.S. industries and verticals, drawing from NAICS codes, census labor data, private equity acquisition patterns, and vertical-specific SaaS penetration.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#6ba3d6] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Criteria Scoring</h4>
                      <div className="text-sm text-gray-700 text-left break-words">
                        <div className="mb-1">Each industry is scored against three non-negotiable investment criteria:</div>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Labor-Intensive:</strong> Human cost must exceed 40% of OpEx.</li>
                          <li><strong>Tech-Starved:</strong> &lt;50% software penetration or workflow automation.</li>
                          <li><strong>Fragmented:</strong> No single player holds &gt;10% market share; room for consolidation.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#0a2e4e] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Shortlist Creation</h4>
                      <p className="text-sm text-gray-700 text-left break-words">
                        Industries that fail to meet all three criteria are removed. The goal is to identify sectors that are both ripe for automation and structurally inefficient enough to support outsized returns through operational leverage. This leads to a shortlist of 10–15 “fertile ground” sectors for deeper analysis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">B. Subsegment Decomposition and Whitespace Identification</h3>
                <div className="bg-gray-50 p-6 rounded-lg text-base">
                  <p className="text-base text-gray-700 mb-2 text-left break-words">
                    Once an industry is shortlisted, we deconstruct it into 5–10 subsegments based on job role, use case, geography, and spend intensity. Within each subsegment, we identify:
                  </p>
                  <ul className="list-disc pl-8 space-y-1 text-base text-gray-700 mb-4">
                    <li><strong>Product whitespace:</strong> (tools or workflows missing software entirely)</li>
                    <li><strong>Business model whitespace:</strong> (monetizable pain points not served by incumbents)</li>
                    <li><strong>Operational leverage opportunities:</strong> (where AI or automation can replace human overhead)</li>
                  </ul>
                  <p className="text-base text-gray-700 mb-2 text-left break-words">
                    In addition to subsegment-level analysis, we break down each subsegment into major workflows and assess whether they can be impacted by software or automation.
                  </p>
                  <ul className="list-disc pl-10 space-y-1 mt-1 mb-4">
                    <li><strong>Level of human involvement:</strong> (manual effort, decision-making, coordination)</li>
                    <li><strong>Technology penetration:</strong> (existence and adoption of workflow-specific tools)</li>
                  </ul>
                  <p className="text-base text-gray-700 mb-2 text-left break-words">
                    Workflows that are both highly manual and under-digitized are prioritized for problem validation and signal testing. We also perform a competitive scan of the subsegment, evaluating:
                  </p>
                  <ul className="list-disc pl-8 space-y-1 text-base text-gray-700 mb-4">
                    <li><strong>Presence and maturity:</strong> of both incumbent vendors and early-stage startups</li>
                    <li><strong>Funding levels, GTM strategy, and product coverage</strong></li>
                    <li><strong>Overall saturation and opportunity:</strong> for a wedge entry</li>
                  </ul>
                  <p className="text-base text-gray-700 mb-2 text-left break-words">
                    We then prioritize one or two pain points that meet all of the following:
                  </p>
                  <ul className="list-disc pl-8 space-y-1 text-base text-gray-700 mb-4">
                    <li><strong>Expensive and manual today</strong></li>
                    <li><strong>Recurring and frequent</strong></li>
                    <li><strong>Easily measured by time, cost, or error</strong></li>
                    <li><strong>Solvable with a software + services hybrid</strong></li>
                  </ul>
                  <p className="text-base text-gray-700 text-left break-words mt-4">
                    This ensures we go deep, not wide—focusing on solvable, high-signal wedges rather than trying to boil the ocean.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">C. Problem Validation and Signal Testing</h3>
                <p className="text-base text-gray-700 mb-4 text-left break-words">
                  Only after whitespace is mapped do we move into problem validation. The goal is to answer one clear question before building anything: <strong>&quot;Will you buy?&quot;</strong>
                </p>
                <ul className="list-disc pl-8 space-y-2 text-base text-gray-700 mb-4">
                  <li>We build a qualified customer list early by identifying decision-makers within the subsegment, then run simple demand tests with 30 to 50 end users and buyers to evaluate willingness to pay and urgency of need.</li>
                  <li>We launch no-code MVPs, landing pages, or email-driven service tests to simulate the offering and assess direct buying interest.</li>
                  <li>We test both the problem and the proposed solution, tracking willingness to pay, solution desirability, switching costs, and workflow compatibility.</li>
                </ul>
                <p className="text-base text-gray-700 mb-4 text-left break-words font-semibold">
                  Examples of real metrics we evaluate:
                </p>
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-4">Key Validation Metrics:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-3 text-base text-yellow-700 text-left">
                      <li><strong>Adoption velocity:</strong> % of users switching from manual to MVP within 30 days. <span className="font-normal">Indicates urgency of pain and ease of onboarding. A 30–50% switch rate signals strong fit.</span></li>
                      <li><strong>Purchase intent:</strong> LOIs, payment captures, or pre-payments for a prototype. <span className="font-normal">≥25% of early users showing buying intent is a strong signal.</span></li>
                      <li><strong>Retention and workflow fit:</strong> 30-day retention and setup friction. <span className="font-normal">High retention and fast integration imply essential value.</span></li>
                    </ul>
                    <ul className="space-y-3 text-base text-yellow-700 text-left">
                      <li><strong>Blended CAC by channel:</strong> Cold outbound vs. referrals/inbound. <span className="font-normal">Lower CAC from warm channels suggests message-market fit and organic pull.</span></li>
                      <li><strong>Early value realized:</strong> Hours saved, errors reduced, or cost avoided in 2–3 weeks. <span className="font-normal">Tangible ROI supports pricing power and B2B sales readiness.</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-base text-gray-700 mt-6 mb-8 text-left break-words font-semibold">
                The rule is simple: <span className="font-bold">no product gets built until market demand is proven.</span>
              </p>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">D. Product Prototyping and Internal Build</h3>
                <p className="text-base text-gray-700 mb-4 text-left break-words">
                  Once a validated problem is greenlit:
                </p>
                <ul className="list-disc pl-8 space-y-2 text-base text-gray-700 mb-4">
                  <li>Our in-house team builds a production-grade MVP in under 60 days.</li>
                  <li>Every product leverages shared infrastructure: authentication, billing, routing, NLP agents, and analytics.</li>
                  <li>We focus on revenue-generating use cases, not vanity engagement.</li>
                </ul>
                <p className="text-base text-gray-700 mb-4 text-left break-words">
                  Each MVP is deployed with paying customers before hiring a founding team. We measure retention, upsell, and margin before moving to scale.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">E. Team Formation and Structured Launch</h3>
                <ul className="list-disc pl-8 space-y-2 text-base text-gray-700 mb-4">
                  <li>Founding teams are assembled only after MVP traction is demonstrated with paying customers.</li>
                  <li>CEOs are recruited from vertical-specific operator pools—leaders with domain expertise and a bias toward execution.</li>
                  <li>Compensation is aligned to EBITDA growth and capital efficiency, not fundraising milestones.</li>
                  <li>Once spun out, each company receives initial support from the studio across finance, compliance, and operations—designed to accelerate setup, not create dependency. As the company scales, these functions are internalized to ensure autonomy and long-term ownership.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">F. Tranche-Based Funding and Exit Design</h3>
                <div className="overflow-x-auto">
                  <p className="text-base text-gray-700 mb-4 text-left break-words">
                    Each venture is funded through 3–4 staged capital deployments:
                  </p>
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
                <p className="text-base text-gray-700 mt-4 mb-4 text-left break-words">
                  We target exit in 4–5 years with a portfolio-wide target of $50–250M outcomes per company.
                </p>
                <ul className="list-disc pl-8 space-y-2 text-base text-gray-700 mb-4">
                  <li>This range reflects the sweet spot for strategic acquirers and growth-stage private equity buyers—large enough to deliver meaningful returns, yet small enough to transact efficiently without relying on IPOs or secondary markets for liquidity.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Performance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0a2e4e] pb-2">
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
                        <p className="text-sm text-green-700">Combined annualized revenue across the initial portfolio.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f6fc] p-4 rounded-lg border border-[#6ba3d6]/30">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-[#0a2e4e]" />
                      <div>
                        <p className="font-semibold text-[#0a2e4e]">37.2%</p>
                        <p className="text-sm text-gray-700">Gross IRR (mature companies)</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-semibold text-purple-800">3 Years</p>
                        <p className="text-sm text-purple-700 font-normal">Profitable companies within 3 years from idea to exit-readiness</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Team Expertise</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">Margin scalability supported by a centralized engineering layer at inception, with teams in Egypt, Mexico, and Panama City.</p>
                  <ul className="list-disc pl-8 space-y-2 text-base text-gray-700 mb-4">
                    <li>Designed solely to accelerate early builds, not to create shared infrastructure or IP.</li>
                  </ul>
                  <p className="text-gray-700 mb-0">The leadership team combines experience across healthcare, SaaS, venture investing, and operational scaling—collectively driving over $500M in enterprise value creation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Allocator Fit */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0a2e4e] pb-2">
              VIII. Allocator Fit
            </h2>
            <p className="text-base text-gray-700 mb-6 text-left break-words">For allocators, InVitro functions as:</p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#f0f6fc] p-6 rounded-lg border border-[#6ba3d6]/30 text-center">
                <h4 className="font-semibold text-[#0a2e4e] mb-3">A pacing buffer</h4>
                <p className="text-gray-700 text-sm">
                  Venture building absorbs capital during dry PE/VC deployment cycles.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                <h4 className="font-semibold text-green-800 mb-3">A liquidity bridge</h4>
                <p className="text-green-700 text-sm">Faster outcomes than VC, with lower volatility than seed funds.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 text-center">
                <h4 className="font-semibold text-purple-800 mb-3">A return amplifier</h4>
                <p className="text-purple-700 text-sm">Capital-efficient building with equity control drives IRR uplift.</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Recommended allocation sizing for this model is 2–4% of total portfolio capital, or 10–20% of the private company ownership sleeve.</h4>
              <p className="text-yellow-700 mb-2">
                It is especially well-suited for allocators with:
              </p>
              <ul className="list-disc pl-8 space-y-1 text-base text-yellow-700 mb-2">
                <li>Domain expertise in operating businesses</li>
                <li>Appetite for active governance and milestone pacing</li>
              </ul>
            </div>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0a2e4e] pb-2">IX. Conclusion</h2>
            <div className="bg-gradient-to-r from-[#f0f6fc] to-[#e6f2ff] p-8 rounded-lg border border-[#6ba3d6]/30">
              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                InVitro Capital is not just a response to structural inefficiencies in private markets—it&#39;s a strategy designed to thrive in them. By building companies with discipline, holding majority ownership, and targeting earlier profitability, InVitro unlocks a new path to venture-scale returns without the venture-style chaos.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed font-medium">
                This is not venture capital rebranded. It&#39;s a new category: a capital-controlled, outcome-aligned, execution-driven platform for building the next generation of enduring companies.
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
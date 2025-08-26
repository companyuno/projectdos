"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, FileText, TrendingUp, Users, Globe } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Deal {
  id: string
  transactionName: string
  targetRaise: string
  preMoneyValuation: string
  postMoneyValuation: string
  targetOwnership: string
  targetCloseDate: string
  leadInvestor: string
  status: "closed" | "open" | "upcoming"
  industry: string
  website?: string
  links?: { name: string; url: string }[]
  memoRoute?: string | null
  thesisRoute?: string | null
  decompositionRoute?: string | null
  featured?: boolean
  live?: boolean
  traction?: string
  tractionNotes?: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "closed":
      return "bg-[#f8fafc] text-[#032a52] border-[#e2e8f0]"
    case "open":
      return "bg-[#f8fafc] text-[#032a52] border-[#e2e8f0]"
    case "upcoming":
      return "bg-[#f8fafc] text-[#032a52] border-[#e2e8f0]"
    default:
      return "bg-[#f8fafc] text-[#032a52] border-[#e2e8f0]"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "closed":
      return "Closed"
    case "open":
      return "Open"
    case "upcoming":
      return "Upcoming"
    default:
      return status
  }
}

export default function DealsShowcase() {
  const router = useRouter()
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    localStorage.setItem("invitro-doc-source", "deals")
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/deals')
        if (!res.ok) throw new Error('Failed to load deals')
        const data: Deal[] = await res.json()
        // Only show live deals
        const visible = (Array.isArray(data) ? data : []).filter(d => d.live !== false)
        setDeals(visible)
      } catch (e) {
        setDeals([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const closedDeals = deals.filter((deal) => deal.status === "closed")
  const openDeals = deals.filter((deal) => deal.status === "open")
  const upcomingDeals = deals.filter((deal) => deal.status === "upcoming")

  const handleDocumentClick = (deal: Deal, type: "memo" | "thesis" | "decomposition") => {
    const route = type === 'memo'
      ? (deal.memoRoute || deal.id)
      : type === 'thesis'
        ? (deal.thesisRoute || deal.id)
        : (deal.decompositionRoute || deal.id)
    router.push(`/${type}/${route}`)
  }

  if (loading) {
    return null
  }

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Open Deals */}
      {openDeals.length > 0 && (
        <section>
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#6ea9f4] rounded-full"></div>
            <h2 className="font-bold text-xl sm:text-2xl text-[#032a52]">Open Deals ({openDeals.length})</h2>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {openDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} onDocumentClick={handleDocumentClick} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Deals */}
      {upcomingDeals.length > 0 && (
        <section>
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#6ea9f4] rounded-full"></div>
            <h2 className="font-bold text-xl sm:text-2xl text-[#032a52]">Upcoming Deals ({upcomingDeals.length})</h2>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} onDocumentClick={handleDocumentClick} />
            ))}
          </div>
        </section>
      )}

      {/* Closed Deals */}
      {closedDeals.length > 0 && (
        <section>
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#6ea9f4] rounded-full"></div>
            <h2 className="font-bold text-xl sm:text-2xl text-[#032a52]">Closed Deals ({closedDeals.length})</h2>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {closedDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} onDocumentClick={handleDocumentClick} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function DealCard({
  deal,
  onDocumentClick,
}: {
  deal: Deal
  onDocumentClick: (deal: Deal, type: "memo" | "thesis" | "decomposition") => void
}) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-gray-200 bg-white">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">{deal.transactionName}</CardTitle>
          <Badge className={`${getStatusColor(deal.status)} font-semibold text-xs sm:text-sm`}>{getStatusText(deal.status)}</Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm font-medium text-[hsl(212,74%,35%)]">{deal.industry}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-gray-500 font-medium">{deal.status === "closed" ? "Capital Raised" : "Target Raise"}</p>
            <p className="font-semibold text-base sm:text-lg">{deal.targetRaise}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">{deal.status === "closed" ? "Round Ownership" : "Target Ownership"}</p>
            <p className="font-semibold text-base sm:text-lg">{deal.targetOwnership}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Traction:</span>
            <span className="font-medium">{deal.traction || 'TBD'}</span>
          </div>
          {deal.tractionNotes && (
            <div className="flex justify-between">
              <span className="text-gray-500">Traction Notes:</span>
              <span className="font-medium">{deal.tractionNotes}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">Pre-Money Valuation:</span>
            <span className="font-medium">{deal.preMoneyValuation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Post-Money Valuation:</span>
            <span className="font-medium">{deal.postMoneyValuation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{deal.status === "closed" ? "Close Date:" : "Target Close Date:"}</span>
            <span className="font-medium">{deal.targetCloseDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Lead Investor:</span>
            <span className="font-medium">{deal.leadInvestor}</span>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-1.5 sm:gap-2">
          {deal.website && (
            <Button
              variant="outline"
              size="sm"
              className="justify-start bg-transparent cursor-pointer text-xs sm:text-sm h-8 sm:h-9"
              asChild
            >
              <a href={deal.website} target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Company Website
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto" />
              </a>
            </Button>
          )}
          {(deal.links || []).map((lnk, i) => (
            <Button
              key={`${deal.id}-link-${i}`}
              variant="outline"
              size="sm"
              className="justify-start bg-transparent cursor-pointer text-xs sm:text-sm h-8 sm:h-9"
              asChild
            >
              <a href={lnk.url} target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                {lnk.name || 'Link'}
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto" />
              </a>
            </Button>
          ))}
          {deal.status === "open" ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="justify-start bg-transparent cursor-pointer text-xs sm:text-sm h-8 sm:h-9"
                onClick={() => onDocumentClick(deal, "memo")}
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Investment Memo
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start bg-transparent cursor-pointer text-xs sm:text-sm h-8 sm:h-9"
                onClick={() => onDocumentClick(deal, "thesis")}
              >
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Industry Thesis
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start bg-transparent cursor-pointer text-xs sm:text-sm h-8 sm:h-9"
                asChild
              >
                <a href="mailto:jonathan.schroeder@invitrocapital.com?subject=Interest%20in%20Deal%20-%20" className="flex items-center w-full">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Submit Interest
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto" />
                </a>
              </Button>
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
} 
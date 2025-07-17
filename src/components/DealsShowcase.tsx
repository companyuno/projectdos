"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExternalLink, FileText, TrendingUp, Users } from "lucide-react"
import { useState, useEffect } from "react"
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
}

const deals: Deal[] = [
  {
    id: "allrx",
    transactionName: "AllRx",
    targetRaise: "$15M",
    preMoneyValuation: "$35M",
    postMoneyValuation: "$50M",
    targetOwnership: "30%",
    targetCloseDate: "Q2 2023",
    leadInvestor: "InVitro Capital",
    status: "closed",
    industry: "Digital Health",
  },
  {
    id: "curenta",
    transactionName: "Curenta",
    targetRaise: "$2M",
    preMoneyValuation: "$6M",
    postMoneyValuation: "$8M",
    targetOwnership: "25%",
    targetCloseDate: "August 7th 2025",
    leadInvestor: "InVitro Capital",
    status: "open",
    industry: "Long-Term Care",
  },
  {
    id: "osta",
    transactionName: "Osta",
    targetRaise: "$12M",
    preMoneyValuation: "$28M",
    postMoneyValuation: "$40M",
    targetOwnership: "30%",
    targetCloseDate: "Q2 2025",
    leadInvestor: "Sequoia Capital",
    status: "open",
    industry: "PropTech",
  },
  {
    id: "allcare",
    transactionName: "AllCare",
    targetRaise: "$18M",
    preMoneyValuation: "$42M",
    postMoneyValuation: "$60M",
    targetOwnership: "30%",
    targetCloseDate: "Q1 2025",
    leadInvestor: "InVitro Capital",
    status: "open",
    industry: "Healthcare",
  },
  {
    id: "needles",
    transactionName: "Needles",
    targetRaise: "$20M",
    preMoneyValuation: "$55M",
    postMoneyValuation: "$75M",
    targetOwnership: "27%",
    targetCloseDate: "Q3 2025",
    leadInvestor: "Andreessen Horowitz",
    status: "upcoming",
    industry: "MedTech",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "closed":
      return "bg-green-100 text-green-800 border-green-200"
    case "open":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "upcoming":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
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
  const [showForm, setShowForm] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<{ dealId: string; type: string } | null>(null)
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "" })
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedInfo = localStorage.getItem("invitro-user-info")
    if (savedInfo) {
      setHasSubmittedInfo(true)
      setUserInfo(JSON.parse(savedInfo))
    }
  }, [])

  const closedDeals = deals.filter((deal) => deal.status === "closed")
  const openDeals = deals.filter((deal) => deal.status === "open")
  const upcomingDeals = deals.filter((deal) => deal.status === "upcoming")

  const handleDocumentClick = (dealId: string, type: "memo" | "thesis" | "decomposition") => {
    if (hasSubmittedInfo) {
      router.push(`/${type}/${dealId}`)
    } else {
      setPendingNavigation({ dealId, type })
      setShowForm(true)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("invitro-user-info", JSON.stringify(userInfo))
    setHasSubmittedInfo(true)
    setShowForm(false)

    if (pendingNavigation) {
      router.push(`/${pendingNavigation.type}/${pendingNavigation.dealId}`)
      setPendingNavigation(null)
    }
  }

    return (
    <div className="space-y-16">
      {/* Investment Philosophy */}
      <section className="mb-12">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Investment Philosophy</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            InVitro curates and creates high-conviction investment opportunities across both internally built ventures and select external startups. Every deal—whether homegrown or sourced—is vetted for capital efficiency, real traction, and clear paths to liquidity. We focus on sectors others overlook, prioritizing structural advantage and execution speed. This is where disciplined company building meets disciplined investing.
          </p>
        </div>
      </section>

      {/* Open Deals */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-900">Open Deals ({openDeals.length})</h2>
        </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {openDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} onDocumentClick={handleDocumentClick} />
            ))}
          </div>
        </section>

              {/* Upcoming Deals */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-900">Upcoming Deals ({upcomingDeals.length})</h2>
        </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} onDocumentClick={handleDocumentClick} />
            ))}
          </div>
        </section>

              {/* Closed Deals */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-900">Closed Deals ({closedDeals.length})</h2>
        </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {closedDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} onDocumentClick={handleDocumentClick} />
            ))}
          </div>
        </section>

      {/* User Info Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Access Investment Documents</DialogTitle>
            <DialogDescription>
              Please provide your information to access our investment research and documentation.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={userInfo.firstName}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={userInfo.lastName}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Continue to Documents
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DealCard({
  deal,
  onDocumentClick,
}: {
  deal: Deal
  onDocumentClick: (dealId: string, type: "memo" | "thesis" | "decomposition") => void
}) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-gray-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl font-bold text-gray-900">{deal.transactionName}</CardTitle>
          <Badge className={`${getStatusColor(deal.status)} font-semibold`}>{getStatusText(deal.status)}</Badge>
        </div>
        <CardDescription className="text-sm font-medium text-blue-600">{deal.industry}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 font-medium">Target Raise</p>
            <p className="font-semibold text-lg">{deal.targetRaise}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Target Ownership</p>
            <p className="font-semibold text-lg">{deal.targetOwnership}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Pre-Money Valuation:</span>
            <span className="font-medium">{deal.preMoneyValuation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Post-Money Valuation:</span>
            <span className="font-medium">{deal.postMoneyValuation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Target Close Date:</span>
            <span className="font-medium">{deal.targetCloseDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Lead Investor:</span>
            <span className="font-medium">{deal.leadInvestor}</span>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="justify-start bg-transparent cursor-pointer"
            onClick={() => onDocumentClick(deal.id, "memo")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Investment Memo
            <ExternalLink className="w-3 h-3 ml-auto" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="justify-start bg-transparent cursor-pointer"
            onClick={() => onDocumentClick(deal.id, "thesis")}
          >
            <Users className="w-4 h-4 mr-2" />
            Industry Thesis
            <ExternalLink className="w-3 h-3 ml-auto" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="justify-start bg-transparent cursor-pointer"
            onClick={() => onDocumentClick(deal.id, "decomposition")}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Industry Decomposition
            <ExternalLink className="w-3 h-3 ml-auto" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 
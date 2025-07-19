"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExternalLink, FileText, TrendingUp, Users, Lightbulb } from "lucide-react"
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
    targetRaise: "$2.1M",
    preMoneyValuation: "$10M",
    postMoneyValuation: "$12M",
    targetOwnership: "14%",
    targetCloseDate: "Q3 2021",
    leadInvestor: "InVitro Capital",
    status: "closed",
    industry: "Pharmacy Operations",
  },
  {
    id: "curenta",
    transactionName: "Curenta",
    targetRaise: "$2M",
    preMoneyValuation: "$6M",
    postMoneyValuation: "$8M",
    targetOwnership: "25%",
    targetCloseDate: "September 15th 2025",
    leadInvestor: "InVitro Capital",
    status: "open",
    industry: "Long-Term Care",
  },
  {
    id: "osta",
    transactionName: "Osta",
    targetRaise: "$1M",
    preMoneyValuation: "$4M",
    postMoneyValuation: "$5M",
    targetOwnership: "25%",
    targetCloseDate: "Q4 2025",
    leadInvestor: "InVitro Capital",
    status: "upcoming",
    industry: "ConstructionTech",
  },
  {
    id: "allcare",
    transactionName: "AllCare",
    targetRaise: "$2M",
    preMoneyValuation: "$4M",
    postMoneyValuation: "$5M",
    targetOwnership: "25%",
    targetCloseDate: "Q4 2025",
    leadInvestor: "InVitro Capital",
    status: "upcoming",
    industry: "In-Home Care",
  },
  {
    id: "needles",
    transactionName: "Needles",
    targetRaise: "$500k",
    preMoneyValuation: "$1.5M",
    postMoneyValuation: "$2M",
    targetOwnership: "25%",
    targetCloseDate: "Q1 2026",
    leadInvestor: "InVitro Capital",
    status: "upcoming",
    industry: "SalesTech",
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
    localStorage.setItem("invitro-doc-source", "deals");
    if (hasSubmittedInfo) {
      router.push(`/${type}/${dealId}`)
    } else {
      setPendingNavigation({ dealId, type })
      setShowForm(true)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // First check if the email has permission
      const permissionResponse = await fetch('/api/permissions/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userInfo.email }),
      })

      const permissionData = await permissionResponse.json()
      
      if (!permissionData.hasPermission) {
        alert('Access denied. Your email is not authorized to view deal documents. Please contact the administrator.')
        return
      }

      // If permission granted, track visitor and proceed
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      })
      
      if (response.ok) {
        localStorage.setItem("invitro-user-info", JSON.stringify(userInfo))
        setHasSubmittedInfo(true)
        setShowForm(false)

        if (pendingNavigation) {
          router.push(`/${pendingNavigation.type}/${pendingNavigation.dealId}`)
          setPendingNavigation(null)
        }
      } else {
        console.error('Failed to track visitor')
      }
    } catch (error) {
      console.error('Error checking permission or tracking visitor:', error)
      alert('An error occurred. Please try again.')
    }
  }

    return (
    <div className="space-y-12 sm:space-y-16">
      {/* Open Deals */}
      <section>
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Open Deals ({openDeals.length})</h2>
        </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {openDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} onDocumentClick={handleDocumentClick} />
            ))}
          </div>
        </section>

              {/* Upcoming Deals */}
      <section>
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Upcoming Deals ({upcomingDeals.length})</h2>
        </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} onDocumentClick={handleDocumentClick} />
            ))}
          </div>
        </section>

              {/* Closed Deals */}
      <section>
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Closed Deals ({closedDeals.length})</h2>
        </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              Continue
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
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">{deal.transactionName}</CardTitle>
          <Badge className={`${getStatusColor(deal.status)} font-semibold text-xs sm:text-sm`}>{getStatusText(deal.status)}</Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm font-medium text-blue-600">{deal.industry}</CardDescription>
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
            <span className="font-medium">{deal.id === "curenta" ? "180K ARR" : deal.id === "osta" ? "600K AR" : deal.id === "allcare" ? "480K ARR" : deal.id === "needles" ? "Build Stage" : deal.id === "allrx" ? "$12M AR" : "TBD"}</span>
          </div>
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
          {deal.status === "open" ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="justify-start bg-transparent cursor-pointer text-xs sm:text-sm h-8 sm:h-9"
                onClick={() => onDocumentClick(deal.id, "memo")}
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Investment Memo
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start bg-transparent cursor-pointer text-xs sm:text-sm h-8 sm:h-9"
                onClick={() => onDocumentClick(deal.id === "curenta" ? "long-term-care" : deal.id, "thesis")}
              >
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Industry Thesis
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start bg-transparent cursor-pointer text-xs sm:text-sm h-8 sm:h-9"
                onClick={() => onDocumentClick(deal.id, "decomposition")}
              >
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Industry Decomposition
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto" />
              </Button>
            </>
          ) : null /* Document buttons hidden for closed and upcoming deals */}
        </div>
      </CardContent>
    </Card>
  )
} 
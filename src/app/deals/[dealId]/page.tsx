"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import PermissionGate from "@/components/PermissionGate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, FileText, Users, TrendingUp } from "lucide-react"

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

export default function DealPage() {
  const params = useParams<{ dealId: string }>()
  const router = useRouter()
  const [deal, setDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    try {
      const admin = typeof window !== 'undefined' && sessionStorage.getItem('admin-authenticated') === 'true'
      setIsAdmin(Boolean(admin))
    } catch {}
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/deals?id=${encodeURIComponent(params.dealId)}`)
        if (!res.ok) throw new Error('Failed to fetch deal')
        const data = await res.json()
        setDeal(data)
      } catch (e) {
        setDeal(null)
      } finally {
        setLoading(false)
      }
    }
    if (params?.dealId) load()
  }, [params?.dealId])

  if (loading) return null
  if (!deal || deal.live === false) return <div className="max-w-5xl mx-auto p-6 text-gray-600">Deal not found.</div>

  return (
    <PermissionGate>
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{deal.transactionName}</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge className={`${getStatusColor(deal.status)} font-semibold text-xs`}>{deal.status}</Badge>
                <span className="text-sm text-gray-600">{deal.industry}</span>
              </div>
            </div>
            {isAdmin && (
              <Button variant="outline" onClick={() => router.push('/admin/deals')}>
                Edit in Admin
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 font-medium">{deal.status === 'closed' ? 'Capital Raised' : 'Target Raise'}</p>
                  <p className="font-semibold text-lg">{deal.targetRaise}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">{deal.status === 'closed' ? 'Round Ownership' : 'Target Ownership'}</p>
                  <p className="font-semibold text-lg">{deal.targetOwnership}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Pre-Money Valuation</p>
                  <p className="font-semibold text-lg">{deal.preMoneyValuation}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Post-Money Valuation</p>
                  <p className="font-semibold text-lg">{deal.postMoneyValuation}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">{deal.status === 'closed' ? 'Close Date' : 'Target Close Date'}</p>
                  <p className="font-semibold text-lg">{deal.targetCloseDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Lead Investor</p>
                  <p className="font-semibold text-lg">{deal.leadInvestor}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-1.5 text-sm">
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
              </div>
            </div>

            <div className="space-y-3">
              {deal.website && (
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start bg-transparent cursor-pointer text-sm h-9"
                  asChild
                >
                  <a href={deal.website} target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Company Website
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                </Button>
              )}
              {(deal.links || []).map((lnk, i) => (
                <Button key={`${deal.id}-link-${i}`} variant="outline" size="sm" className="justify-start bg-transparent cursor-pointer text-sm h-9" asChild>
                  <a href={lnk.url} target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {lnk.name || 'Link'}
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                </Button>
              ))}
              {deal.status === "open" ? (
                <>
                  <Button variant="outline" size="sm" className="justify-start bg-transparent cursor-pointer text-sm h-9" onClick={() => router.push(`/memo/${deal.memoRoute || deal.id}`)}>
                    <FileText className="w-4 h-4 mr-2" />
                    Investment Memo
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start bg-transparent cursor-pointer text-sm h-9" onClick={() => router.push(`/thesis/${deal.thesisRoute || deal.id}`)}>
                    <Users className="w-4 h-4 mr-2" />
                    Industry Thesis
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start bg-transparent cursor-pointer text-sm h-9" asChild>
                    <a href="mailto:jonathan.schroeder@invitrocapital.com?subject=Interest%20in%20Deal%20-%20" className="flex items-center w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Submit Interest
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </PermissionGate>
  )
} 
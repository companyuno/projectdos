"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import InvestorGate from "@/components/InvestorGate"

interface InvestorUpdate {
  slug: string
  title: string
  audience: "public" | "investors"
  live: boolean
  publishDate?: string | null
  linkedSlug?: string | null
}

export default function InvestorUpdatesHub() {
  const [updates, setUpdates] = useState<InvestorUpdate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/investor-updates')
        if (!res.ok) throw new Error('Failed to load updates')
        const data = await res.json()
        const list: InvestorUpdate[] = Array.isArray(data) ? data : []
        setUpdates(list.filter(u => u.live !== false))
      } catch {
        setUpdates([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return null

  return (
    <InvestorGate>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Investor Updates</h1>
            <p className="text-gray-600">Company communications for investors.</p>
          </div>

          <section>
            <div className="space-y-3">
              {updates.length === 0 ? (
                <div className="text-gray-600">No updates yet.</div>
              ) : (
                updates.map(u => {
                  const href = u.linkedSlug || `/investor-updates/${encodeURIComponent(u.slug)}`
                  return (
                    <Link key={u.slug} href={href} className="block p-4 border rounded-md hover:bg-gray-50">
                      <div className="font-medium text-gray-900">{u.title}</div>
                      {u.publishDate && <div className="text-xs text-gray-500 mt-1">{u.publishDate}</div>}
                    </Link>
                  )
                })
              )}
            </div>
          </section>
        </div>
      </div>
    </InvestorGate>
  )
} 
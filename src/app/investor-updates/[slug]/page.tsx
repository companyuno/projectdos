"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import InvestorGate from "@/components/InvestorGate"

interface InvestorUpdate {
  slug: string
  title: string
  audience: "public" | "investors"
  live: boolean
  publishDate?: string | null
  linkedSlug?: string | null
}

function Redirector({ to }: { to: string }) {
  const router = useRouter()
  useEffect(() => {
    const href = to.startsWith('/') ? to : `/${to}`
    router.replace(href)
  }, [router, to])
  return null
}

export default function InvestorUpdateDetail() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const [update, setUpdate] = useState<InvestorUpdate | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/investor-updates?slug=${encodeURIComponent(slug)}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setUpdate(data)
      } catch {
        setUpdate(null)
      } finally {
        setLoading(false)
      }
    }
    if (slug) load()
  }, [slug])

  if (loading) return null
  if (!update || update.live === false || !update.linkedSlug) return <div className="max-w-4xl mx-auto px-6 py-10 text-gray-600">Update not found.</div>

  const dest = update.linkedSlug

  if (update.audience === 'investors') {
    return (
      <InvestorGate redirectOnGrant={dest} />
    )
  }

  // Non-investor audience (not expected in current flow): direct redirect
  return <Redirector to={dest} />
} 
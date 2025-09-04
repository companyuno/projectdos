"use client"

import InvestorGate from "@/components/InvestorGate"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function InvestorLoginInner() {
  const sp = useSearchParams()
  const returnTo = sp?.get('from') || '/investor-updates'
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Investor Login</h1>
      <p className="text-gray-600 mb-6">Sign in with your investor email to access Investor Updates.</p>
      <InvestorGate redirectOnGrant={returnTo} />
    </div>
  )
}

export default function InvestorLoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<div className="max-w-2xl mx-auto px-6 py-12">Loading…</div>}>
        <InvestorLoginInner />
      </Suspense>
    </div>
  )
} 
"use client"

import InvestorGate from "@/components/InvestorGate"
import { useSearchParams } from "next/navigation"

export default function InvestorLoginPage() {
  const sp = useSearchParams()
  const returnTo = sp?.get('from') || '/investor-updates'
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Investor Login</h1>
        <p className="text-gray-600 mb-6">Sign in with your investor email to access Investor Updates.</p>
        <InvestorGate redirectOnGrant={returnTo} />
      </div>
    </div>
  )
} 
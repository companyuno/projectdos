"use client"

import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Lock, Mail } from "lucide-react"
import { supabaseBrowser } from "@/lib/supabaseClient"

interface InvestorGateProps {
  children?: React.ReactNode
  message?: string
  redirectOnGrant?: string
}

const STORAGE_EMAIL = "invitro-investor-email"
const STORAGE_ALLOWED = "invitro-investor-permission"

export default function InvestorGate({ children, message, redirectOnGrant }: InvestorGateProps) {
  const [email, setEmail] = useState("")
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showBanner, setShowBanner] = useState(false)
  const [cooldown, setCooldown] = useState<number>(0)
  const [infoMsg, setInfoMsg] = useState<string>("")

  useEffect(() => {
    try {
      const se = localStorage.getItem(STORAGE_EMAIL) || ""
      const sa = localStorage.getItem(STORAGE_ALLOWED)
      const lastSend = Number(localStorage.getItem('iv_magic_last_sent') || '0')
      if (lastSend > 0) {
        const elapsed = Math.floor((Date.now() - lastSend) / 1000)
        const remain = Math.max(60 - elapsed, 0)
        if (remain > 0) setCooldown(remain)
      }
      if (se) setEmail(se)
      if (sa === "true") {
        setAllowed(true)
        setSubmitted(true)
      }
    } catch {}
  }, [])

  // tick down cooldown
  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown((c)=> (c>0? c-1 : 0)), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  // Revalidate permission on mount if we believe we are allowed, to handle revocations
  useEffect(() => {
    const recheck = async () => {
      if (!email) return
      if (!(submitted && allowed)) return
      try {
        const res = await fetch('/api/permissions/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, group: 'investor-login' })
        })
        const data = await res.json()
        const ok = Boolean(data?.hasPermission)
        if (!ok) {
          // Clear all state and cookies if revoked
          try {
            localStorage.removeItem(STORAGE_EMAIL)
            localStorage.removeItem(STORAGE_ALLOWED)
          } catch {}
          setAllowed(null)
          setSubmitted(false)
          await fetch('/api/permissions/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ logout: true })
          }).catch(()=>{})
        }
      } catch {}
    }
    recheck()
    // only run once after initial state hydrate
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  useEffect(() => {
    if (showBanner) {
      const t = setTimeout(() => setShowBanner(false), 2500)
      return () => clearTimeout(t)
    }
  }, [showBanner])

  // If a redirect target is provided and access is granted, navigate
  useEffect(() => {
    if (submitted && allowed && redirectOnGrant) {
      const to = redirectOnGrant.startsWith('/') ? redirectOnGrant : `/${redirectOnGrant}`
      window.location.replace(to)
    }
  }, [submitted, allowed, redirectOnGrant])

  useEffect(() => {
    if (!redirectOnGrant) return
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_ALLOWED && e.newValue === 'true') {
        // Update local state so gates without redirect can unlock immediately
        setAllowed(true)
        setSubmitted(true)
        const to = redirectOnGrant.startsWith('/') ? redirectOnGrant : `/${redirectOnGrant}`
        window.location.replace(to)
      }
      if (e.key === STORAGE_EMAIL && typeof e.newValue === 'string') {
        setEmail(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [redirectOnGrant])

  // Also listen for storage changes even when no redirect target is provided
  useEffect(() => {
    if (redirectOnGrant) return
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_ALLOWED && e.newValue === 'true') {
        setAllowed(true)
        setSubmitted(true)
      }
      if (e.key === STORAGE_EMAIL && typeof e.newValue === 'string') {
        setEmail(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [redirectOnGrant])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    setSubmitted(false)
    try {
      const res = await fetch("/api/permissions/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, group: "investor-login" }),
      })
      const data = await res.json()
      const ok = Boolean(data?.hasPermission)
      setAllowed(ok)
      setSubmitted(true)
      try {
        if (ok) {
          localStorage.setItem(STORAGE_EMAIL, email)
          localStorage.setItem(STORAGE_ALLOWED, "true")
          setShowBanner(true)
        } else {
          localStorage.setItem(STORAGE_EMAIL, email)
          localStorage.setItem(STORAGE_ALLOWED, "false")
        }
      } catch {}
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem(STORAGE_EMAIL)
      localStorage.removeItem(STORAGE_ALLOWED)
    } catch {}
    setEmail("")
    setAllowed(null)
    setSubmitted(false)
    setError("")
    // Clear cookie session as well
    fetch('/api/permissions/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logout: true })
    }).catch(()=>{})
  }

  if (submitted && allowed && !redirectOnGrant) {
    return (
      <>
        {showBanner && (
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 shadow flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-800 text-sm font-medium">Access Granted</span>
            </div>
          </div>
        )}
        {children || null}
      </>
    )
  }

  // Removed the Request Received screen for Investor login; keep the same form with inline guidance

  return (
    <div className="max-w-md mx-auto py-12">
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lock className="w-5 h-5" /> Access Required
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {message ? <p className="text-gray-600 mb-4 text-sm">{message}</p> : null}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@company.com" required disabled={loading} className="mt-1" />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" disabled={!email.trim() || cooldown>0} onClick={async ()=>{
                setError("")
                setInfoMsg('You will receive an email with a login link if you are registered as an investor in our database')
                // Start optimistic cooldown immediately for snappier UX
                if (cooldown <= 0) setCooldown(60)
                try {
                  const from = redirectOnGrant || '/investor-updates'
                  // Only send magic link if email is allowlisted for the investor-login group
                  const allowRes = await fetch('/api/permissions/check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, group: 'investor-login' })
                  })
                  const allowData = await allowRes.json()
                  const isAllowed = Boolean(allowData?.hasPermission)
                  if (!isAllowed) {
                    setSubmitted(false)
                    setAllowed(null)
                    setShowBanner(false)
                    setError("")
                    // keep infoMsg as-is
                    // Reset cooldown since no email will be sent
                    setCooldown(0)
                    return
                  }
                  if (!supabaseBrowser) { setError('Email login is not configured'); setCooldown(0); return; }
                  const { error } = await supabaseBrowser.auth.signInWithOtp({ email, options: { emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback?from=${encodeURIComponent(from)}` : undefined }})
                  if (error) {
                    const msg = String(error?.message || '')
                    const m = msg.match(/after\s+(\d+)\s*seconds?/i)
                    if (m && m[1]) setCooldown(parseInt(m[1],10))
                    throw error
                  }
                  setSubmitted(true)
                  setAllowed(false)
                  setShowBanner(false)
                  try { localStorage.setItem('iv_magic_last_sent', String(Date.now())); setCooldown(60) } catch {}
                  // keep infoMsg persistent during flow
                } catch (e: unknown) {
                  const msg = typeof e === 'object' && e && 'message' in e ? String((e as { message?: unknown }).message) : 'Failed to send magic link'
                  setError(msg)
                  // drop cooldown on failure
                  setCooldown(0)
                } finally {
                  // no-op: avoid grey flicker; cooldown state controls disabled state
                }
              }}>Send Link{cooldown>0 ? ` (${cooldown}s)` : ''}</Button>
              <Button type="button" variant="outline" onClick={handleLogout}>Clear</Button>
            </div>
            {(infoMsg || cooldown > 0 || (submitted && allowed === false)) && (
              <p className="text-gray-600 text-sm mt-2">
                {infoMsg || 'You will receive an email with a login link if you are registered as an investor in our database'}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 
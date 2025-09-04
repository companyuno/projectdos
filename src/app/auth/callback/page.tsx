"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabaseClient'

export default function AuthCallbackPage() {
  const sp = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState<string>("")

  useEffect(() => {
    let mounted = true
    const run = async () => {
      try {
        const dest = sp?.get('from') || '/investor-updates'
        const code = sp?.get('code')
        const group = sp?.get('group') || 'investor-login'

        // Handle Supabase magic link in both modes:
        // 1) PKCE: ?code=...
        // 2) Hash tokens: #access_token=...&refresh_token=...
        if (supabaseBrowser) {
          if (code) {
            await supabaseBrowser.auth.exchangeCodeForSession(code)
          } else if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
            const params = new URLSearchParams(window.location.hash.replace(/^#/, ''))
            const access_token = params.get('access_token') || ''
            const refresh_token = params.get('refresh_token') || ''
            if (access_token) {
              await supabaseBrowser.auth.setSession({ access_token, refresh_token })
              // Clean the hash from the URL
              try { window.history.replaceState({}, '', window.location.pathname + window.location.search) } catch {}
            }
          }
        }

        // Get the signed-in user
        const userRes = supabaseBrowser ? await supabaseBrowser.auth.getUser() : null
        const email = userRes?.data?.user?.email
        if (!email) {
          setError('No user session found. Please try the link again or request a new one.')
          return
        }

        // Set our cookie session based on allowlist and persist local state for the gate
        await fetch('/api/permissions/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, group })
        })
        try {
          localStorage.setItem('invitro-investor-email', email)
          localStorage.setItem('invitro-investor-permission', 'true')
        } catch {}
        if (!mounted) return
        router.replace(dest.startsWith('/') ? dest : `/${dest}`)
      } catch (e: unknown) {
        const msg = typeof e === 'object' && e && 'message' in e ? String((e as { message?: unknown }).message) : 'Authentication failed'
        setError(msg)
      }
    }
    run()
    return () => { mounted = false }
  }, [router, sp])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-sm text-gray-700">
        {error ? error : 'Signing you in…'}
      </div>
    </div>
  )
} 
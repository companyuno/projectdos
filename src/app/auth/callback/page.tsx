"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabaseClient'

function AuthCallbackInner() {
  const sp = useSearchParams()
  const [error, setError] = useState<string>("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    let mounted = true
    const run = async () => {
      try {
        const code = sp?.get('code')
        const group = sp?.get('group') || 'investor-login'

        if (supabaseBrowser) {
          if (code) {
            await supabaseBrowser.auth.exchangeCodeForSession(code)
          } else if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
            const params = new URLSearchParams(window.location.hash.replace(/^#/, ''))
            const access_token = params.get('access_token') || ''
            const refresh_token = params.get('refresh_token') || ''
            if (access_token) {
              await supabaseBrowser.auth.setSession({ access_token, refresh_token })
              try { window.history.replaceState({}, '', window.location.pathname + window.location.search) } catch {}
            }
          }
        }

        const userRes = supabaseBrowser ? await supabaseBrowser.auth.getUser() : null
        const email = userRes?.data?.user?.email
        if (!email) {
          setError('No user session found. Please try the link again or request a new one.')
          return
        }

        // Set cookie session and local storage (used by the original tab)
        const permRes = await fetch('/api/permissions/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, group })
        })
        let hasPermission = false
        try {
          const payload = await permRes.json().catch(()=>({}))
          hasPermission = Boolean(payload?.hasPermission)
        } catch {}
        try {
          localStorage.setItem('invitro-investor-email', email)
          localStorage.setItem('invitro-investor-permission', hasPermission ? 'true' : 'false')
        } catch {}

        if (!mounted) return
        setDone(true)

        // Attempt to close the tab/window; if blocked, user will see confirmation below
        try { window.close() } catch {}
      } catch (e: unknown) {
        const msg = typeof e === 'object' && e && 'message' in e ? String((e as { message?: unknown }).message) : 'Authentication failed'
        setError(msg)
      }
    }
    run()
    return () => { mounted = false }
  }, [sp])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-sm text-gray-700 text-center space-y-2">
        {error ? (
          <>
            <div>{error}</div>
            <div className="text-gray-500">You can close this tab and try again.</div>
          </>
        ) : done ? (
          <>
            <div>Signed in. You can return to your original tab.</div>
            <div className="text-gray-500">If this tab didn’t close automatically, you may close it now.</div>
          </>
        ) : (
          <div>Signing you in…</div>
        )}
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-sm text-gray-700">Signing you in…</div></div>}>
      <AuthCallbackInner />
    </Suspense>
  )
} 
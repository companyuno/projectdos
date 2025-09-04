"use client"

import { Button } from "@/components/ui/button"
import { FileText, Users, Settings, Rocket } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const navItems = [
    { href: "/admin/thesis", label: "Content Editor", icon: FileText },
    { href: "/admin/deals", label: "Deals", icon: FileText },
    { href: "/admin/updates", label: "Updates", icon: FileText },
    { href: "/admin/submissions", label: "Submissions", icon: Rocket },
    { href: "/admin/visitors", label: "Visitors", icon: Users },
    { href: "/admin/permissions", label: "Permissions", icon: Settings },
  ]

  const [checked, setChecked] = useState(false)
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function check() {
      try {
        const res = await fetch('/api/admin/session', { cache: 'no-store' })
        const data = await res.json().catch(()=>({}))
        if (!cancelled) {
          setIsAuthed(Boolean(data?.ok))
          setChecked(true)
          if (!data?.ok && pathname !== '/admin/login') {
            const from = encodeURIComponent(pathname)
            router.replace(`/admin/login?from=${from}`)
          }
        }
      } catch {
        if (!cancelled) {
          setIsAuthed(false)
          setChecked(true)
          if (pathname !== '/admin/login') {
            const from = encodeURIComponent(pathname)
            router.replace(`/admin/login?from=${from}`)
          }
        }
      }
    }
    check()
    return () => { cancelled = true }
  }, [pathname, router])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(()=>{})
    window.location.href = '/admin/login'
  }

  // On the login page, render children only (no admin shell/navigation)
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!checked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthed) {
    return null
  }

  return (
    <div>
      <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-lg">Admin Panel</span>
          <nav className="flex items-center gap-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md">
          Logout
        </Button>
      </div>
      {children}
    </div>
  )
} 
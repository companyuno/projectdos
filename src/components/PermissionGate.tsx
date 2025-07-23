"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Lock, Mail, CheckCircle } from "lucide-react"

interface PermissionGateProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function PermissionGate({ children, fallback }: PermissionGateProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(() => {
    // Initialize with cached permission state if available
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem("invitro-user-email")
      if (savedEmail) {
        return null // Will be set after permission check
      }
    }
    return false
  })
  const [email, setEmail] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState("")
  const [requestSubmitted, setRequestSubmitted] = useState(false)
  const [showAccessBanner, setShowAccessBanner] = useState(false)

  const checkPermission = async (emailToCheck: string) => {
    // Check if we already have a cached result for this email
    const cachedPermission = localStorage.getItem(`invitro-permission-${emailToCheck}`)
    if (cachedPermission) {
      const hasPermission = cachedPermission === 'true'
      setHasPermission(hasPermission)
      setEmail(emailToCheck)
      return
    }

    setIsChecking(true)
    try {
      const response = await fetch('/api/permissions/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToCheck }),
      })

      const data = await response.json()
      setHasPermission(data.hasPermission)
      setError("")
      
      // Cache the permission result
      localStorage.setItem(`invitro-permission-${emailToCheck}`, String(data.hasPermission))
      
      if (data.hasPermission) {
        const wasAlreadyLoggedIn = localStorage.getItem("invitro-user-email") !== null
        localStorage.setItem("invitro-user-email", emailToCheck)
        
        // Only show banner if this is a new login (not a refresh)
        if (!wasAlreadyLoggedIn) {
          setShowAccessBanner(true)
          setTimeout(() => setShowAccessBanner(false), 3000)
        }
      } else {
        // If access denied, show request submitted message only if this was a form submission
        if (emailToCheck !== "") {
          setRequestSubmitted(true)
        }
      }
      
      // Log the access attempt
      await logAccessAttempt(emailToCheck, data.hasPermission)
    } catch (error) {
      console.error('Error checking permission:', error)
      setError("Error checking permission")
      setHasPermission(false)
      
      // Log failed attempt
      await logAccessAttempt(emailToCheck, false)
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    // Check if user already has permission from localStorage
    const savedEmail = localStorage.getItem("invitro-user-email")
    if (savedEmail) {
      setEmail(savedEmail)
      // Only check permission if we haven't already determined it
      if (hasPermission === null) {
        checkPermission(savedEmail)
      }
    } else {
      setHasPermission(false)
      setRequestSubmitted(false)
    }
  }, [hasPermission, checkPermission]) // Add hasPermission to dependency array

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    await checkPermission(email.trim())
  }

  const logAccessAttempt = async (email: string, hasAccess: boolean) => {
    try {
      await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: hasAccess ? 'Investment' : 'Access',
          lastName: hasAccess ? 'Access' : 'Request',
          email: email,
          accessAttempt: true,
          hasAccess: hasAccess,
          accessType: hasAccess ? 'investments_tab' : 'access_request',
          requestType: hasAccess ? 'authorized_access' : 'unauthorized_request'
        }),
      })
    } catch (error) {
      console.error('Error logging access attempt:', error)
    }
  }

  const handleLogout = () => {
    const savedEmail = localStorage.getItem("invitro-user-email")
    if (savedEmail) {
      localStorage.removeItem(`invitro-permission-${savedEmail}`)
    }
    localStorage.removeItem("invitro-user-email")
    setHasPermission(false)
    setEmail("")
    setRequestSubmitted(false)
    setShowAccessBanner(false)
  }

  // Show loading state while checking permission
  if (hasPermission === null) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Checking access...</div>
      </div>
    )
  }

  // Show access granted banner
  if (showAccessBanner) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Access Granted</span>
          </div>
        </div>
      </div>
    )
  }

  // Show content if user has permission
  if (hasPermission === true) {
    return (
      <div>
        {children}
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="bg-white shadow-lg"
          >
            Logout
          </Button>
        </div>
      </div>
    )
  }

  // Show request submitted message
  if (requestSubmitted) {
    return (
      <div className="max-w-md mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Request Submitted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-700 text-sm">
                Thank you for your interest in our InVitro Capital&apos;s investment opportunities. 
                We&apos;ll review your request and contact you if access is granted.
              </p>
            </div>
            <Button 
              onClick={() => {
                setRequestSubmitted(false)
                setEmail("")
              }}
              className="w-full"
            >
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show access form if user doesn't have permission
  return (
    <div className="max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Access Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Please enter your email address to access investment opportunities.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mt-1"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isChecking || !email.trim()}
            >
              {isChecking ? "Checking..." : "Request Access"}
            </Button>
          </form>
          {fallback && (
            <div className="mt-6 pt-6 border-t">
              {fallback}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 
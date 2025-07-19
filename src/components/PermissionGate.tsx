"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Lock, Mail } from "lucide-react"

interface PermissionGateProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function PermissionGate({ children, fallback }: PermissionGateProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [email, setEmail] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState("")
  const [requestSubmitted, setRequestSubmitted] = useState(false)
  const [showAccessBanner, setShowAccessBanner] = useState(false)

  useEffect(() => {
    // Check if user already has permission from localStorage
    const savedInfo = localStorage.getItem("invitro-user-info")
    if (savedInfo) {
      try {
        const userInfo = JSON.parse(savedInfo)
        if (userInfo.email) {
          checkPermission(userInfo.email)
        } else {
          setHasPermission(false)
        }
      } catch (error) {
        console.error('Error parsing saved user info:', error)
        localStorage.removeItem("invitro-user-info")
        setHasPermission(false)
      }
    } else {
      setHasPermission(false)
    }
  }, [])

  const checkPermission = async (emailToCheck: string) => {
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
      
      // If access granted, save to localStorage
      if (data.hasPermission) {
        const wasAlreadyLoggedIn = localStorage.getItem("invitro-user-info") !== null
        localStorage.setItem("invitro-user-info", JSON.stringify({
          email: emailToCheck,
          timestamp: new Date().toISOString()
        }))
        
        // Only show banner if this is a new login (not a refresh)
        if (!wasAlreadyLoggedIn) {
          setShowAccessBanner(true)
          setTimeout(() => setShowAccessBanner(false), 3000) // Hide after 3 seconds
        }
      } else {
        // If access denied, show request submitted message
        setRequestSubmitted(true)
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
    localStorage.removeItem("invitro-user-info")
    setHasPermission(false)
    setEmail("")
    setRequestSubmitted(false)
    setShowAccessBanner(false)
  }

  // Show loading state
  if (hasPermission === null) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Checking access...</div>
      </div>
    )
  }

  // Show content if user has permission
  if (hasPermission) {
    return (
      <div>
        {showAccessBanner && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-600" />
                <span className="text-green-800 font-medium">Access Granted</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-green-700 border-green-300 hover:bg-green-100"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
        {children}
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
                Thank you for your interest in our InVitro Capital's investment opportunities. 
                We'll review your request and contact you if access is granted.
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
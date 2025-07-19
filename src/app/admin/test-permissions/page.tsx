"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"

export default function TestPermissionsPage() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<{ hasPermission: boolean; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testPermission = async () => {
    if (!email.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/permissions/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()
      
      if (data.hasPermission) {
        setResult({
          hasPermission: true,
          message: "✅ This email has permission to access deal documents"
        })
      } else {
        setResult({
          hasPermission: false,
          message: "❌ This email does NOT have permission to access deal documents"
        })
      }
    } catch (error) {
      setResult({
        hasPermission: false,
        message: "❌ Error checking permission"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test Permissions System</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Check Email Permission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email to test"
                  className="flex-1"
                />
                <Button 
                  onClick={testPermission} 
                  disabled={isLoading || !email.trim()}
                >
                  {isLoading ? "Checking..." : "Test"}
                </Button>
              </div>
            </div>

            {result && (
              <div className={`p-4 rounded-lg border ${
                result.hasPermission 
                  ? "bg-green-50 border-green-200 text-green-800" 
                  : "bg-red-50 border-red-200 text-red-800"
              }`}>
                <div className="flex items-center gap-2">
                  {result.hasPermission ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-medium">{result.message}</span>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Testing Instructions:</h3>
              <ol className="text-blue-700 text-sm space-y-1">
                <li>1. Go to <a href="/admin/permissions" className="underline">Permissions Page</a> and add your email</li>
                <li>2. Come back here and test your email (should show ✅)</li>
                <li>3. Test with a different email (should show ❌)</li>
                <li>4. Try accessing deals with both emails to verify</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
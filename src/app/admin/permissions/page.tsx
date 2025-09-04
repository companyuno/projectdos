"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Trash2, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Permission {
  email: string
  addedAt: string
  addedBy: string
  groupName?: string
}

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [newEmail, setNewEmail] = useState("")
  const [newGroup, setNewGroup] = useState<string>("investments")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadPermissions()
  }, [])

  const loadPermissions = async () => {
    try {
      const response = await fetch('/api/permissions')
      if (response.ok) {
        const data = await response.json()
        const mapped: Permission[] = Array.isArray(data) ? data.map((p: any) => ({
          email: p.email,
          addedAt: p.added_at,
          addedBy: p.added_by,
          groupName: p.group_name || 'investments',
        })) : []
        setPermissions(mapped)
      }
    } catch (error) {
      console.error('Error loading permissions:', error)
    }
  }

  const addPermission = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/permissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newEmail.trim(), group: newGroup }),
      })

      if (response.ok) {
        setNewEmail("")
        await loadPermissions()
      } else {
        console.error('Failed to add permission')
      }
    } catch (error) {
      console.error('Error adding permission:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const removePermission = async (email: string, group?: string) => {
    try {
      const response = await fetch('/api/permissions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, group }),
      })

      if (response.ok) {
        await loadPermissions()
      } else {
        console.error('Failed to remove permission')
      }
    } catch (error) {
      console.error('Error removing permission:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-[hsl(212,74%,15%)] text-[hsl(212,74%,15%)] rounded-full px-5 py-2 text-sm font-medium hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)] transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Deal Access Permissions</h1>
          <p className="text-gray-600">Manage which email addresses can access deal documents</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Add New Permission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addPermission} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Group</Label>
                  <Select value={newGroup} onValueChange={(v)=>setNewGroup(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investments">Investments (default)</SelectItem>
                      <SelectItem value="investor-login">Investor Login</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Button type="submit" disabled={isLoading || !newEmail.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <Card>
          <CardHeader>
            <CardTitle>Current Permissions ({permissions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {permissions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No permissions added yet</p>
            ) : (
              <div className="space-y-3">
                {permissions.map((permission, index) => (
                  <div key={`${permission.email}-${permission.groupName}-${index}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{permission.email}</p>
                      <p className="text-sm text-gray-500">
                        Group: {permission.groupName || 'investments'} • Added: {permission.addedAt ? new Date(permission.addedAt).toLocaleDateString() : '—'}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePermission(permission.email, permission.groupName)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
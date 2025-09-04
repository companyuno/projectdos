"use client"
// @ts-nocheck
/* eslint-disable */

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Plus, RefreshCw, Save, Trash2 } from "lucide-react"

interface UpdateForm {
  slug: string
  title: string
  audience: "public" | "investors"
  live: boolean
  publishDate?: string | null
  linkedSlug?: string | null
}

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState<UpdateForm[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [thesisOptions, setThesisOptions] = useState<{ id: string; title: string }[]>([])

  const [showEditor, setShowEditor] = useState(false)
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [form, setForm] = useState<UpdateForm>({
    slug: "",
    title: "",
    audience: "investors",
    live: true,
    publishDate: "",
    linkedSlug: "",
  })

  const slugify = (s: string) =>
    (s || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

  const fetchUpdates = async () => {
    try {
      const res = await fetch('/api/investor-updates')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setUpdates(Array.isArray(data) ? data : [])
    } catch {
      setUpdates([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUpdates()
  }, [])

  useEffect(() => {
    const fetchThesis = async () => {
      try {
        const res = await fetch('/api/thesis')
        if (!res.ok) return
        const data = await res.json()
        const list = Object.keys(data || {}).map((id) => ({ id, title: (data?.[id]?.title as string) || id }))
        setThesisOptions(list)
      } catch {}
    }
    fetchThesis()
  }, [])

  const resetForm = () => {
    setEditingSlug(null)
    setForm({ slug: "", title: "", audience: "investors", live: true, publishDate: "", linkedSlug: "" })
  }

  const startEdit = (u: UpdateForm) => {
    setEditingSlug(u.slug)
    setForm({ ...u, publishDate: u.publishDate || "", linkedSlug: u.linkedSlug || "" })
    setShowEditor(true)
  }

  const handleCreate = async () => {
    if (!form.slug || !form.title || !form.linkedSlug) {
      alert('Please fill slug, title, and link to content')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/investor-updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: form.slug, title: form.title, audience: form.audience, live: form.live, publishDate: form.publishDate || null, linkedSlug: form.linkedSlug })
      })
      if (!res.ok) throw new Error('Create failed')
      await fetchUpdates()
      resetForm()
      setShowEditor(false)
      alert('Update created')
    } catch (e) {
      alert('Failed to create update')
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    if (!editingSlug) return
    setSaving(true)
    try {
      const { slug: _omit, ...rest } = form
      const res = await fetch('/api/investor-updates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: editingSlug, ...rest, publishDate: form.publishDate || null })
      })
      if (!res.ok) throw new Error('Save failed')
      await fetchUpdates()
      resetForm()
      setShowEditor(false)
      alert('Saved')
    } catch {
      alert('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this update?')) return
    try {
      const res = await fetch('/api/investor-updates', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      })
      if (!res.ok) throw new Error('Delete failed')
      await fetchUpdates()
      alert('Deleted')
    } catch {
      alert('Failed to delete')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 w-full shadow-sm flex items-center justify-between h-16 px-6">
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold">Investor Updates</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={fetchUpdates} className="rounded-full p-3 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]" aria-label="Refresh">
            <RefreshCw className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10 space-y-8">
        {/* Create / Edit Update */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{editingSlug ? 'Edit Update' : 'Create New Update'}</CardTitle>
              <Button variant="outline" size="sm" onClick={() => { setShowEditor(!showEditor); if (!showEditor) resetForm() }} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {showEditor ? 'Hide' : (editingSlug ? 'Show Editor' : 'New Update')}
              </Button>
            </div>
          </CardHeader>
          {showEditor && (
            <CardContent className="space-y-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={form.title} onChange={(e)=>{
                    const nextTitle = e.target.value
                    // Auto-generate slug only if not editing an existing update, and slug is empty or still matches previous auto
                    setForm(prev => {
                      const prevAuto = slugify(prev.title)
                      const shouldUpdateSlug = !editingSlug && (prev.slug === "" || prev.slug === prevAuto)
                      return {
                        ...prev,
                        title: nextTitle,
                        slug: shouldUpdateSlug ? slugify(nextTitle) : prev.slug,
                      }
                    })
                  }} placeholder="Update title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" value={form.slug} onChange={(e)=>setForm({...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'')})} placeholder="unique-slug" disabled={!!editingSlug} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Link to Content</Label>
                  <Select onValueChange={(v)=>setForm({...form, linkedSlug: v ? `/thesis/${v}` : ''})}>
                    <SelectTrigger><SelectValue placeholder="Choose page" /></SelectTrigger>
                    <SelectContent className="z-50">
                      {thesisOptions.map((t)=> (
                        <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.linkedSlug ? (<div className="text-xs text-gray-500">Linked to: {form.linkedSlug}</div>) : null}
                </div>
                <div className="space-y-2">
                  <Label>Publish Date</Label>
                  <Input type="date" value={form.publishDate || ''} onChange={(e)=>setForm({...form, publishDate: e.target.value || ''})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Audience</Label>
                  <Select value={form.audience} onValueChange={(v)=>setForm({...form, audience: (v as 'public'|'investors')})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investors">Investors</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div></div>
                <div className="space-y-2 flex items-center gap-2 pt-6">
                  <input id="live" type="checkbox" checked={!!form.live} onChange={(e)=>setForm({...form, live: e.target.checked})} />
                  <Label htmlFor="live" className="text-sm">Live</Label>
                </div>
              </div>

              <div className="pt-2">
                {editingSlug ? (
                  <Button onClick={handleSave} disabled={saving} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                ) : (
                  <Button onClick={handleCreate} disabled={saving || !form.slug || !form.title || !form.linkedSlug} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    {saving ? 'Creating...' : 'Create Update'}
                  </Button>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Updates List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Existing Updates ({updates.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {updates.length === 0 ? (
              <div className="text-sm text-gray-500">No updates found.</div>
            ) : (
              updates.map((u) => (
                <div key={u.slug} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 truncate">{u.title} <span className="text-xs text-gray-500">({u.slug})</span></div>
                    <div className="text-xs text-gray-600">{u.audience === 'investors' ? 'Investors' : 'Public'} • {u.live ? 'Live' : 'Hidden'} {u.publishDate ? `• ${u.publishDate}` : ''} {u.linkedSlug ? `• ${u.linkedSlug}` : ''}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={()=>startEdit(u)}>✏️ Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={()=>handleDelete(u.slug)}>🗑️ Delete</Button>
                    <Button variant="outline" size="sm" onClick={()=>window.open(u.linkedSlug || `/investor-updates/${u.slug}`, '_blank')}>
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
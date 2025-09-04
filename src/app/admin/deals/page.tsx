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
import { useRouter } from "next/navigation"

interface DealForm {
  id: string
  transactionName: string
  status: "closed" | "open" | "upcoming"
  industry: string
  targetRaise: string
  preMoneyValuation: string
  postMoneyValuation: string
  targetOwnership: string
  targetCloseDate: string
  leadInvestor: string
  detailRoute?: string | null
  featured?: boolean
  live?: boolean
  orderIndex?: number | null
  links?: { name: string; url: string }[] | null
  traction?: string | null
  tractionNotes?: string | null
  sections?: Record<string, { title?: string; content?: string }>
}

// Auto-generate a URL-safe slug from the transaction name
const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")

export default function DealsAdminPage() {
  const router = useRouter()
  const [deals, setDeals] = useState<DealForm[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [thesisOptions, setThesisOptions] = useState<{ id: string; title: string }[]>([])

  // Create/edit form state
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [form, setForm] = useState<DealForm>({
    id: "",
    transactionName: "",
    status: "upcoming",
    industry: "",
    targetRaise: "",
    preMoneyValuation: "",
    postMoneyValuation: "",
    targetOwnership: "",
    targetCloseDate: "",
    leadInvestor: "InVitro Capital",
    detailRoute: "",
    featured: false,
    live: true,
    orderIndex: null,
    links: [],
    traction: "",
    tractionNotes: "",
    sections: {},
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  // Sections editor state (like Thesis)
  const [selectedSectionKey, setSelectedSectionKey] = useState<string>("")
  const [newSectionKey, setNewSectionKey] = useState<string>("")
  const [sectionTitle, setSectionTitle] = useState<string>("")
  const [sectionContent, setSectionContent] = useState<string>("")

  const loadSectionIntoEditor = (key: string) => {
    setSelectedSectionKey(key)
    const sec = (form.sections || {})[key] || { title: "", content: "" }
    setSectionTitle(sec.title || "")
    setSectionContent(sec.content || "")
  }
  const saveCurrentSection = () => {
    if (!selectedSectionKey) return
    const next = { ...(form.sections || {}) }
    next[selectedSectionKey] = { title: sectionTitle || undefined, content: sectionContent || "" }
    setForm({ ...form, sections: next })
  }
  const addNewSection = () => {
    const key = slugify(newSectionKey || `section-${Object.keys(form.sections || {}).length + 1}`)
    if (!key) return
    if ((form.sections || {})[key]) {
      alert('Section key already exists')
      return
    }
    const next = { ...(form.sections || {}) }
    next[key] = { title: newSectionKey, content: "" }
    setForm({ ...form, sections: next })
    setNewSectionKey("")
    loadSectionIntoEditor(key)
  }
  const removeSection = (key: string) => {
    const next = { ...(form.sections || {}) }
    delete next[key]
    setForm({ ...form, sections: next })
    if (selectedSectionKey === key) {
      setSelectedSectionKey("")
      setSectionTitle("")
      setSectionContent("")
    }
  }

  const fetchDeals = async () => {
    try {
      const res = await fetch('/api/deals')
      if (!res.ok) throw new Error('Failed to fetch deals')
      const data = await res.json()
      setDeals(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      setDeals([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeals()
  }, [])

  useEffect(() => {
    const fetchThesisOptions = async () => {
      try {
        const res = await fetch('/api/thesis')
        if (!res.ok) return
        const data = await res.json()
        const list = Object.keys(data || {}).map((id) => ({ id, title: (data?.[id]?.title as string) || id }))
        setThesisOptions(list)
      } catch {}
    }
    fetchThesisOptions()
  }, [])

  const resetForm = () => {
    setForm({
      id: "",
      transactionName: "",
      status: "upcoming",
      industry: "",
      targetRaise: "",
      preMoneyValuation: "",
      postMoneyValuation: "",
      targetOwnership: "",
      targetCloseDate: "",
      leadInvestor: "InVitro Capital",
      detailRoute: "",
      featured: false,
      live: true,
      orderIndex: null,
      links: [],
      traction: "",
      tractionNotes: "",
      sections: {},
    })
    setEditingId(null)
    setSelectedSectionKey("")
    setNewSectionKey("")
    setSectionTitle("")
    setSectionContent("")
  }

  const handleCreate = async () => {
    if (!form.id || !form.transactionName) {
      alert('Please provide an ID and Transaction Name')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Create failed')
      await fetchDeals()
      resetForm()
      setShowCreateForm(false)
      alert('Deal created')
    } catch (e) {
      console.error(e)
      alert('Failed to create deal')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async () => {
    if (!editingId) return
    setSaving(true)
    try {
      const { id: _omit, ...updates } = form
      const res = await fetch('/api/deals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...updates })
      })
      if (!res.ok) throw new Error('Update failed')
      await fetchDeals()
      resetForm()
      alert('Deal updated')
    } catch (e) {
      console.error(e)
      alert('Failed to update deal')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this deal?')) return
    try {
      const res = await fetch('/api/deals', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (!res.ok) throw new Error('Delete failed')
      await fetchDeals()
      alert('Deal deleted')
    } catch (e) {
      console.error(e)
      alert('Failed to delete deal')
    }
  }

  const startEdit = (d: DealForm) => {
    setEditingId(d.id)
    setForm({ ...d, traction: d.traction ?? "", sections: d.sections || {} })
    setShowCreateForm(true)
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
          <h1 className="text-lg font-semibold">Deals Management</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={fetchDeals} className="rounded-full p-3 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]" aria-label="Refresh">
            <RefreshCw className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10 space-y-8">
        {/* Create / Edit Deal */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{editingId ? 'Edit Deal' : 'Create New Deal'}</CardTitle>
              <Button variant="outline" size="sm" onClick={() => { setShowCreateForm(!showCreateForm); if (!showCreateForm) resetForm() }} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {showCreateForm ? 'Hide' : (editingId ? 'Show Editor' : 'New Deal')}
              </Button>
            </div>
          </CardHeader>
          {showCreateForm && (
            <CardContent className="space-y-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="dealName">Transaction Name</Label>
                  <Input id="dealName" value={form.transactionName} onChange={(e)=>setForm(prev=>{ const name = e.target.value; const prevAuto = slugify(prev.transactionName || ""); const shouldUpdateId = !editingId && (prev.id === "" || prev.id === prevAuto); const nextId = shouldUpdateId ? slugify(name) : prev.id; return { ...prev, transactionName: name, id: nextId }; })} placeholder="Curenta" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealId">Deal ID (slug)</Label>
                  <Input id="dealId" value={form.id} onChange={(e)=>setForm({...form, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'')})} placeholder="curenta" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v)=>setForm({...form, status: v as any})}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Input value={form.industry} onChange={(e)=>setForm({...form, industry: e.target.value})} placeholder="Long-Term Care" />
                </div>
                <div className="space-y-2">
                  <Label>Target Raise</Label>
                  <Input value={form.targetRaise} onChange={(e)=>setForm({...form, targetRaise: e.target.value})} placeholder="$2M" />
                </div>
                <div className="space-y-2">
                  <Label>Target Ownership</Label>
                  <Input value={form.targetOwnership} onChange={(e)=>setForm({...form, targetOwnership: e.target.value})} placeholder="25%" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Pre-Money Valuation</Label>
                  <Input value={form.preMoneyValuation} onChange={(e)=>setForm({...form, preMoneyValuation: e.target.value})} placeholder="$6M" />
                </div>
                <div className="space-y-2">
                  <Label>Post-Money Valuation</Label>
                  <Input value={form.postMoneyValuation} onChange={(e)=>setForm({...form, postMoneyValuation: e.target.value})} placeholder="$8M" />
                </div>
                <div className="space-y-2">
                  <Label>Target Close Date</Label>
                  <Input value={form.targetCloseDate} onChange={(e)=>setForm({...form, targetCloseDate: e.target.value})} placeholder="Q4 2025" />
                </div>
                <div className="space-y-2">
                  <Label>Target Close Date</Label>
                  <Input value={form.targetCloseDate} onChange={(e)=>setForm({...form, targetCloseDate: e.target.value})} placeholder="Q4 2025" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Traction (short label)</Label>
                <Input value={form.traction || ''} onChange={(e)=>setForm({...form, traction: e.target.value})} placeholder="e.g., 180K ARR" />
              </div>

              <div className="space-y-2">
                <Label>Traction Notes</Label>
                <Input
                  value={form.tractionNotes || ''}
                  onChange={(e)=>setForm({...form, tractionNotes: e.target.value})}
                  placeholder="e.g., Subscription model; 80% gross margins"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Detail Route (where card navigates)</Label>
                  <Input value={form.detailRoute || ''} onChange={(e)=>setForm({...form, detailRoute: e.target.value})} placeholder="/deals/curenta or /thesis/osta-deal-page" />
                  <div className="text-xs text-gray-500">If empty, the card will not navigate.</div>
                </div>
                <div className="space-y-2">
                  <Label>Link to Content</Label>
                  <Select onValueChange={(v)=>{
                    if (v === '__none__') {
                      setForm({...form, detailRoute: ''})
                    } else {
                      setForm({...form, detailRoute: `/thesis/${v}`})
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose page" />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectItem value="__none__">None</SelectItem>
                      {thesisOptions.map((t)=> (
                        <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" size="sm" onClick={()=>{
                    const to = (form.detailRoute || '').trim()
                    if (!to) return
                    const href = to.startsWith('/') ? to : `/${to}`
                    window.open(href, '_blank')
                  }}>Preview</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Order Index</Label>
                  <Input type="number" value={form.orderIndex ?? ''} onChange={(e)=>setForm({...form, orderIndex: e.target.value === '' ? null : Number(e.target.value)})} placeholder="1" />
                </div>
                <div className="space-y-2 flex items-center gap-2 pt-6">
                  <input id="featured" type="checkbox" checked={!!form.featured} onChange={(e)=>setForm({...form, featured: e.target.checked})} />
                  <Label htmlFor="featured" className="text-sm">Featured</Label>
                </div>
                <div className="space-y-2 flex items-center gap-2 pt-6">
                  <input id="live" type="checkbox" checked={!!form.live} onChange={(e)=>setForm({...form, live: e.target.checked})} />
                  <Label htmlFor="live" className="text-sm">Live</Label>
                </div>
              </div>

              {/* Links Section */}
              <div className="space-y-3">
                <Label className="text-sm">Links</Label>
                {(form.links || []).map((lnk, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div className="md:col-span-2">
                      <Input placeholder="Name (e.g., Deck)" value={lnk.name} onChange={(e)=>{
                        const next = [...(form.links || [])]
                        next[idx] = { ...next[idx], name: e.target.value }
                        setForm({ ...form, links: next })
                      }} />
                    </div>
                    <div className="md:col-span-3">
                      <Input placeholder="https://..." value={lnk.url} onChange={(e)=>{
                        const next = [...(form.links || [])]
                        next[idx] = { ...next[idx], url: e.target.value }
                        setForm({ ...form, links: next })
                      }} />
                    </div>
                    <div className="md:col-span-5">
                      <Button type="button" variant="outline" size="sm" className="text-red-600" onClick={()=>{
                        const next = [...(form.links || [])]
                        next.splice(idx,1)
                        setForm({ ...form, links: next })
                      }}>Remove</Button>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={()=>{
                  const next = [...(form.links || [])]
                  next.push({ name: "", url: "" })
                  setForm({ ...form, links: next })
                }}>Add Link</Button>
              </div>

              <div className="pt-2">
                {editingId ? (
                  <Button onClick={handleUpdate} disabled={saving} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                ) : (
                  <Button onClick={handleCreate} disabled={saving || !form.id || !form.transactionName} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    {saving ? 'Creating...' : 'Create Deal'}
                  </Button>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Deals List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Existing Deals ({deals.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {deals.length === 0 ? (
              <div className="text-sm text-gray-500">No deals found.</div>
            ) : (
              deals.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 truncate">{d.transactionName} <span className="text-xs text-gray-500">({d.id})</span></div>
                    <div className="text-xs text-gray-600">{d.status} • {d.industry} • {d.targetRaise}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={()=>startEdit(d)}>✏️ Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={()=>handleDelete(d.id)}>🗑️ Delete</Button>
                    {d.live && (
                      <Button variant="outline" size="sm" onClick={()=>window.open('/investments', '_blank')}>
                        <Eye className="w-4 h-4 mr-1" /> View
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Sections Editor removed */}
      </div>
    </div>
  )
} 
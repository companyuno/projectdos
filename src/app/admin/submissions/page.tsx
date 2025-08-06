"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Calendar, 
  Mail, 
  Phone, 
  Building2, 
  Users, 
  DollarSign, 
  FileText, 
  ExternalLink,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react"

interface StartupSubmission {
  id: number
  company_name: string
  founder_names: string
  email: string
  phone?: string
  stage: string
  funding_sought: string
  problem_statement: string
  solution: string
  founder_description: string
  additional_materials_url?: string
  submitted_at: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  notes?: string
  reviewed?: boolean
  reviewed_at?: string
}

export default function StartupSubmissionsAdmin() {
  const [submissions, setSubmissions] = useState<StartupSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<StartupSubmission | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      } else {
        console.error('Failed to fetch submissions')
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (submissionId: number, status: string) => {
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          submissionId, 
          status, 
          notes: notes.trim() || undefined 
        })
      })

      if (response.ok) {
        await fetchSubmissions()
        setShowDetails(false)
        setSelectedSubmission(null)
        setNotes('')
      } else {
        alert('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'reviewed': return <Eye className="w-4 h-4" />
      case 'accepted': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredSubmissions = submissions.filter(submission => {
    if (statusFilter === 'all') return true
    return submission.status === statusFilter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Startup Submissions</h1>
          <p className="text-gray-600">Review and manage startup submissions</p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div>
              <Label htmlFor="status-filter">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Badge variant="secondary" className="ml-4">
              {filteredSubmissions.length} submissions
            </Badge>
          </div>
        </div>

        {/* Submissions Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{submission.company_name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{submission.founder_names}</p>
                  </div>
                  <Badge className={getStatusColor(submission.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(submission.status)}
                      {submission.status}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    {submission.email}
                  </div>
                  {submission.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {submission.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="w-4 h-4" />
                    {submission.stage}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    {submission.funding_sought}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(submission.submitted_at)}
                  </div>
                  {submission.additional_materials_url && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <FileText className="w-4 h-4" />
                      <a 
                        href={submission.additional_materials_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        View Materials
                      </a>
                    </div>
                  )}
                  <Button
                    onClick={() => {
                      setSelectedSubmission(submission)
                      setNotes(submission.notes || '')
                      setShowDetails(true)
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No submissions found</p>
          </div>
        )}
      </div>

      {/* Submission Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Company Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Company Name</Label>
                      <p className="text-gray-900">{selectedSubmission.company_name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Founders</Label>
                      <p className="text-gray-900">{selectedSubmission.founder_names}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-gray-900">{selectedSubmission.email}</p>
                    </div>
                    {selectedSubmission.phone && (
                      <div>
                        <Label className="text-sm font-medium">Phone</Label>
                        <p className="text-gray-900">{selectedSubmission.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Business Details</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Stage</Label>
                      <p className="text-gray-900">{selectedSubmission.stage}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Funding Sought</Label>
                      <p className="text-gray-900">{selectedSubmission.funding_sought}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Submitted</Label>
                      <p className="text-gray-900">{formatDate(selectedSubmission.submitted_at)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge className={getStatusColor(selectedSubmission.status)}>
                        {selectedSubmission.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem & Solution */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Problem & Solution</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Problem Statement</Label>
                    <p className="text-gray-900 mt-1 whitespace-pre-wrap">{selectedSubmission.problem_statement}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Solution</Label>
                    <p className="text-gray-900 mt-1 whitespace-pre-wrap">{selectedSubmission.solution}</p>
                  </div>
                </div>
              </div>

              {/* Founder Description */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Founder Description</h3>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.founder_description}</p>
              </div>

              {/* Additional Materials */}
              {selectedSubmission.additional_materials_url && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Additional Materials</h3>
                  <Button asChild>
                    <a 
                      href={selectedSubmission.additional_materials_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Materials
                    </a>
                  </Button>
                </div>
              )}

              {/* Review Section */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Review & Update Status</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add review notes..."
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => updateStatus(selectedSubmission.id, 'accepted')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                    <Button
                      onClick={() => updateStatus(selectedSubmission.id, 'rejected')}
                      variant="destructive"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => updateStatus(selectedSubmission.id, 'reviewed')}
                      variant="outline"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Mark Reviewed
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, FileText, Edit, Eye } from "lucide-react"

interface DecompositionPage {
  id: string
  title: string
  path: string
  description: string
  lastModified: string
  status: 'published' | 'draft'
}

const decompositionPages: DecompositionPage[] = [
  {
    id: 'long-term-care',
    title: 'Long Term Care Industry Decomposition',
    path: '/decomposition/long-term-care',
    description: 'Analysis of the long-term care industry structure and opportunities',
    lastModified: '2024-01-15',
    status: 'published'
  },
  {
    id: 'construction-tech',
    title: 'Construction Technology Industry Decomposition',
    path: '/decomposition/construction-tech',
    description: 'Comprehensive analysis of construction technology workflows and opportunities',
    lastModified: '2024-01-20',
    status: 'published'
  },
  {
    id: 'healthcare-e-learning',
    title: 'Healthcare E-Learning Industry Decomposition',
    path: '/decomposition/healthcare-e-learning',
    description: 'Analysis of healthcare education technology market',
    lastModified: '2024-01-10',
    status: 'published'
  },
  {
    id: 'accounting-services',
    title: 'Accounting Services Industry Decomposition',
    path: '/decomposition/accounting-services',
    description: 'Analysis of accounting services industry and automation opportunities',
    lastModified: '2024-01-12',
    status: 'published'
  },
  {
    id: 'b2b-sales-marketing-software',
    title: 'B2B Sales & Marketing Technology Decomposition',
    path: '/decomposition/b2b-sales-marketing-software',
    description: 'Analysis of B2B sales and marketing technology landscape',
    lastModified: '2024-01-18',
    status: 'published'
  },
  {
    id: 'dtc-healthcare',
    title: 'DTC Healthcare Industry Decomposition',
    path: '/decomposition/dtc-healthcare',
    description: 'Analysis of direct-to-consumer healthcare market',
    lastModified: '2024-01-14',
    status: 'published'
  }
]

export default function AdminDecompositionPage() {
  const [selectedPage, setSelectedPage] = useState<string>("")
  const [editContent, setEditContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!selectedPage) return
    
    setSaving(true)
    try {
      // For now, this would save to a file or database
      // You can implement the actual saving logic based on your needs
      console.log('Saving content for:', selectedPage, editContent)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Content saved successfully!')
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Failed to save content')
    } finally {
      setSaving(false)
    }
  }

  const handleLoadContent = async (pageId: string) => {
    setLoading(true)
    try {
      // For now, this would load from a file or database
      // You can implement the actual loading logic based on your needs
      console.log('Loading content for:', pageId)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // For demo purposes, set some sample content
      setEditContent(`# ${decompositionPages.find(p => p.id === pageId)?.title}

This is the content for the ${pageId} decomposition page.

## Overview
[Your content here...]

## Analysis
[Your analysis here...]

## Opportunities
[Your opportunities here...]`)
      
      setSelectedPage(pageId)
    } catch (error) {
      console.error('Error loading content:', error)
      alert('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Decomposition Management</h1>
          <p className="text-gray-600">Edit and manage industry decomposition pages</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Page List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Decomposition Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {decompositionPages.map((page) => (
                    <div
                      key={page.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedPage === page.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleLoadContent(page.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{page.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{page.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                              {page.status}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Modified: {page.lastModified}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(page.path, '_blank')
                            }}
                            title="View page"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  {selectedPage ? `Editing: ${decompositionPages.find(p => p.id === selectedPage)?.title}` : 'Select a page to edit'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPage ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="content">Page Content</Label>
                      <Textarea
                        id="content"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="Enter page content..."
                        className="min-h-[500px] font-mono text-sm"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleSave}
                        disabled={saving || loading}
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => {
                          const page = decompositionPages.find(p => p.id === selectedPage)
                          if (page) {
                            window.open(page.path, '_blank')
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a decomposition page from the list to start editing</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 
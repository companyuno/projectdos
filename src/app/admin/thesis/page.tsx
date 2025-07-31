"use client"
// @ts-nocheck
/* eslint-disable */

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, RefreshCw, Eye, Edit3, Plus, Trash2, Upload, Bold, Italic, Underline, List, Indent, AlignLeft, AlignCenter, AlignRight, Table, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

interface ThesisData {
  [key: string]: {
    title: string;
    subtitle?: string;
    industry: string;
    publishDate?: string;
    readTime?: string;
    tags?: string[];
    category?: string;
    featured?: boolean;
    content?: Record<string, unknown>;
    contact?: Record<string, unknown>;
    sources?: string[];
  };
}

export default function ThesisAdmin() {
  const router = useRouter()
  const [thesisData, setThesisData] = useState<ThesisData>({})
  const [loading, setLoading] = useState(true)
  const [selectedThesis, setSelectedThesis] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [editContent, setEditContent] = useState("")
  const [editSectionTitle, setEditSectionTitle] = useState("")
  const [editThesisTitle, setEditThesisTitle] = useState("")
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [newThesisId, setNewThesisId] = useState("")
  const [newThesisTitle, setNewThesisTitle] = useState("")
  
  // Auto-generate thesis ID from title
  const generateThesisId = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
  }
  const [newThesisSubtitle, setNewThesisSubtitle] = useState("")
  const [newThesisIndustry, setNewThesisIndustry] = useState("")
  const [newThesisPublishDate, setNewThesisPublishDate] = useState("")
  const [newThesisReadTime, setNewThesisReadTime] = useState("")
  const [newThesisTags, setNewThesisTags] = useState("")
  const [newThesisCategory, setNewThesisCategory] = useState("industry-theses")
  const [newThesisFeatured, setNewThesisFeatured] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [textAlignment, setTextAlignment] = useState<'left' | 'center' | 'right'>('left')

  // Text formatting functions
  const formatText = (format: 'bold' | 'italic' | 'underline') => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    if (!textarea) return

    // Store current scroll position
    const scrollTop = textarea.scrollTop

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = editContent.substring(start, end)
    
    let formattedText = ''
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'underline':
        formattedText = `__${selectedText}__`
        break
    }
    
    const newContent = editContent.substring(0, start) + formattedText + editContent.substring(end)
    setEditContent(newContent)
    
    // Set cursor position after the formatted text and restore scroll position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + formattedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
      textarea.scrollTop = scrollTop
    }, 100)
  }

  const addBullet = () => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    if (!textarea) return

    // Store current scroll position
    const scrollTop = textarea.scrollTop

    const cursorPos = textarea.selectionStart
    const textBefore = editContent.substring(0, cursorPos)
    const textAfter = editContent.substring(cursorPos)
    
    // Add bullet at cursor position
    const newContent = textBefore + '• ' + textAfter
    setEditContent(newContent)
    
    // Set cursor position after bullet and restore scroll position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = cursorPos + 2
      textarea.setSelectionRange(newCursorPos, newCursorPos)
      textarea.scrollTop = scrollTop
    }, 100)
  }

  const addIndent = () => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    if (!textarea) return

    // Store current scroll position
    const scrollTop = textarea.scrollTop

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = editContent.substring(start, end)
    
    if (!selectedText.trim()) {
      // If no text selected, just add indent at cursor position
      const textBefore = editContent.substring(0, start)
      const textAfter = editContent.substring(start)
      const newContent = textBefore + '    ' + textAfter
      setEditContent(newContent)
      
      // Set cursor position after indent and restore scroll position
      setTimeout(() => {
        textarea.focus()
        const newCursorPos = start + 4
        textarea.setSelectionRange(newCursorPos, newCursorPos)
        textarea.scrollTop = scrollTop
      }, 100)
    } else {
      // If text is selected, indent each line
      const lines = selectedText.split('\n')
      const indentedLines = lines.map(line => line.trim() === '' ? line : '    ' + line)
      const indentedText = indentedLines.join('\n')
      
      const newContent = editContent.substring(0, start) + indentedText + editContent.substring(end)
      setEditContent(newContent)
      
      // Set cursor position to select the indented text and restore scroll position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start, start + indentedText.length)
        textarea.scrollTop = scrollTop
      }, 100)
    }
  }

  const alignText = (alignment: 'left' | 'center' | 'right') => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    if (!textarea) return

    // Store current scroll position
    const scrollTop = textarea.scrollTop

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = editContent.substring(start, end)
    
    if (!selectedText.trim()) {
      // If no text selected, just set the alignment for future text
      setTextAlignment(alignment)
      return
    }
    
    // Wrap selected text with alignment div
    let alignedText = ''
    switch (alignment) {
      case 'center':
        alignedText = `<div class="text-center">${selectedText}</div>`
        break
      case 'right':
        alignedText = `<div class="text-right">${selectedText}</div>`
        break
      default:
        alignedText = selectedText
        break
    }
    
    const newContent = editContent.substring(0, start) + alignedText + editContent.substring(end)
    setEditContent(newContent)
    
    // Set cursor position after the aligned text and restore scroll position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + alignedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
      textarea.scrollTop = scrollTop
    }, 100)
  }

  const [showTableConverter, setShowTableConverter] = useState(false)
  const [tableData, setTableData] = useState("")
  const [tablePreview, setTablePreview] = useState("")
  const [tableStructure, setTableStructure] = useState({ columns: 4, rows: 2 })
  const [useStructure, setUseStructure] = useState(false)

  const generateTablePreview = () => {
    if (useStructure) {
      // Generate table based on structure
      let tableHTML = '<table class="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">\n'
      tableHTML += '  <thead>\n    <tr class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">\n'
      
      // Add headers
      for (let i = 0; i < tableStructure.columns; i++) {
        tableHTML += `      <th class="px-6 py-4 text-left font-semibold text-gray-900 text-sm tracking-wide">Header ${i + 1}</th>\n`
      }
      tableHTML += '    </tr>\n  </thead>\n  <tbody class="bg-white">\n'
      
      // Add data rows
      for (let row = 0; row < tableStructure.rows; row++) {
        const rowClass = row % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
        tableHTML += `    <tr class="${rowClass} hover:bg-gray-50 transition-colors duration-150">\n`
        
        for (let col = 0; col < tableStructure.columns; col++) {
          tableHTML += `      <td class="px-6 py-4 text-gray-700 text-sm border-b border-gray-100">Cell ${row + 1}-${col + 1}</td>\n`
        }
        tableHTML += '    </tr>\n'
      }
      
      tableHTML += '  </tbody>\n</table>'
      setTablePreview(tableHTML)
      return
    }

    if (!tableData.trim()) {
      setTablePreview("")
      return
    }

    // Parse the table data
    const lines = tableData.trim().split('\n').filter(line => line.trim())
    if (lines.length === 0) {
      setTablePreview("")
      return
    }

    // Split each line by tabs first, then by multiple spaces
    const rows = lines.map(line => {
      // Try tabs first
      if (line.includes('\t')) {
        return line.split('\t').map(cell => cell.trim())
      }
      // Then try multiple spaces
      return line.split(/\s{2,}/).map(cell => cell.trim())
    })

    if (rows.length === 0) {
      setTablePreview("")
      return
    }

    // Find the maximum number of columns
    const maxColumns = Math.max(...rows.map(row => row.length))

    // Create the table HTML
    let tableHTML = '<table class="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">\n'
    tableHTML += '  <thead>\n    <tr class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">\n'
    
    // Add headers (first row)
    const headers = rows[0] || []
    headers.forEach((header, index) => {
      tableHTML += `      <th class="px-6 py-4 text-left font-semibold text-gray-900 text-sm tracking-wide">${header || `Column ${index + 1}`}</th>\n`
    })
    tableHTML += '    </tr>\n  </thead>\n  <tbody class="bg-white">\n'
    
    // Add data rows (skip first row if it was used as headers)
    const dataRows = rows.slice(1)
    dataRows.forEach((row, rowIndex) => {
      const rowClass = rowIndex % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
      tableHTML += `    <tr class="${rowClass} hover:bg-gray-50 transition-colors duration-150">\n`
      
      // Fill cells for this row
      for (let i = 0; i < maxColumns; i++) {
        const cellData = row[i] || ''
        tableHTML += `      <td class="px-6 py-4 text-gray-700 text-sm border-b border-gray-100">${cellData}</td>\n`
      }
      tableHTML += '    </tr>\n'
    })
    
    tableHTML += '  </tbody>\n</table>'
    
    setTablePreview(tableHTML)
  }

  const convertTableData = () => {
    if (!tableData.trim()) return

    const textarea = document.getElementById('content') as HTMLTextAreaElement
    if (!textarea) return

    // Store current scroll position
    const scrollTop = textarea.scrollTop
    const start = textarea.selectionStart

    const newContent = editContent.substring(0, start) + tablePreview + editContent.substring(start)
    setEditContent(newContent)
    
    // Set cursor position after the table
    setTimeout(() => {
      if (textarea) {
        textarea.focus()
        const newCursorPos = start + tablePreview.length
        textarea.setSelectionRange(newCursorPos, newCursorPos)
        textarea.scrollTop = scrollTop
      }
    }, 200)
    
    // Close the converter
    setShowTableConverter(false)
    setTableData("")
    setTablePreview("")
  }

  const createTable = () => {
    setShowTableConverter(true)
  }

  const addCalloutBlock = () => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    if (!textarea) return

    // Store current scroll position
    const scrollTop = textarea.scrollTop

    const cursorPos = textarea.selectionStart
    const textBefore = editContent.substring(0, cursorPos)
    const textAfter = editContent.substring(cursorPos)
    
    // Add callout block at cursor position
    const calloutBlock = '\n\n<div class="callout-block">\n\nCallout content goes here...\n\n</div>\n\n'
    const newContent = textBefore + calloutBlock + textAfter
    setEditContent(newContent)
    
    // Set cursor position inside the callout block
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = cursorPos + calloutBlock.indexOf('Callout content goes here...')
      textarea.setSelectionRange(newCursorPos, newCursorPos + 'Callout content goes here...'.length)
      textarea.scrollTop = scrollTop
    }, 100)
  }

  // Generate preview when table data or structure changes
  useEffect(() => {
    generateTablePreview()
  }, [tableData, tableStructure, useStructure])





  useEffect(() => {
    fetchThesisData()
  }, [])

  const fetchThesisData = async () => {
    try {
      const response = await fetch('/api/thesis')
      if (response.ok) {
        const data = await response.json()
        setThesisData(data)
        if (Object.keys(data).length > 0) {
          setSelectedThesis(Object.keys(data)[0])
        }
      }
    } catch (error) {
      console.error('Failed to fetch thesis data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!selectedThesis || !selectedSection || (!editContent.trim() && !editSectionTitle.trim() && !editThesisTitle.trim())) return

    setSaving(true)
    try {
      let contentToSave: unknown = editContent
      
      // Handle different section types
      if (selectedSection === 'tags') {
        // Convert comma-separated string back to array
        contentToSave = editContent.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      } else if (selectedSection === 'title' || selectedSection === 'subtitle' || selectedSection === 'industry' || selectedSection === 'publishDate' || selectedSection === 'readTime') {
        // These are simple string fields, save directly
        contentToSave = editContent
      } else if (selectedSection === 'contact') {
        // Parse contact information (skip the intro text)
        const lines = editContent.split('\n').filter(line => line.trim())
        // Skip the intro text line and get the actual contact info
        const contactLines = lines.filter(line => !line.includes('For inquiries, detailed materials'))
        const contactData = {
          name: contactLines[0] || '',
          title: contactLines[1] || '',
          company: contactLines[2] || '',
          email: contactLines[3] || ''
        }
        
        // Save to both top-level and content object
        contentToSave = contactData
      } else if (selectedSection === 'sources') {
        // Parse sources
        const lines = editContent.split('\n').filter(line => line.trim())
        const sourcesData = lines.map(line => line.replace(/^\[\d+\]\s*/, ''))
        
        // Save to both top-level and content object
        contentToSave = sourcesData
      } else {
        // For content sections, maintain the structure
        const sectionData = (currentThesis?.content as Record<string, unknown>)?.[selectedSection]
        if (sectionData && typeof sectionData === 'object' && (sectionData as Record<string, unknown>).title) {
          // Update title if editSectionTitle is provided, otherwise preserve existing title
          const newTitle = editSectionTitle.trim() || (sectionData as Record<string, unknown>).title as string
          contentToSave = {
            ...sectionData,
            title: newTitle,
            content: editContent
          }
                  } else {
            // Create new structure with title and content
            const sectionTitles: { [key: string]: string } = {
              executiveSummary: "I. Executive Summary",
              narrative: "II. Narrative", 
              structuralObservations: "III. Structural Observations",
              fundingSignals: "IV. Funding Signals",
              workflowFit: "V. Workflow Fit",
              productStrategy: "VI. Product Strategy",
              segmentStrategy: "VII. Segment Strategy",
              salesRealities: "VIII. Sales Realities",
              conclusion: "IX. Conclusion"
            }
            
            // Update title if editSectionTitle is provided
            const newTitle = editSectionTitle.trim() || sectionTitles[selectedSection] || selectedSection
            
            // Special handling for complex sections
            if (selectedSection === 'structuralObservations') {
              // Parse the formatted text back into the observations structure
              const lines = editContent.split('\n\n')
              const observations = []
              let currentObservation = null
              
              for (const line of lines) {
                if (line.trim()) {
                  if (line.includes('.')) {
                    // This looks like a title (contains a number)
                    if (currentObservation) {
                      observations.push(currentObservation)
                    }
                    currentObservation = {
                      title: line.trim(),
                      content: ""
                    }
                  } else if (currentObservation) {
                    currentObservation.content += (currentObservation.content ? '\n' : '') + line.trim()
                  }
                }
              }
              
              if (currentObservation) {
                observations.push(currentObservation)
              }
              
              contentToSave = {
                title: newTitle,
                observations: observations
              }
            } else {
              contentToSave = {
                title: newTitle,
                content: editContent
              }
            }
          }
      }

              // Prepare the request body
        const requestBody: Record<string, unknown> = {
          thesisId: selectedThesis,
          section: selectedSection,
          content: contentToSave
        }

        // Add thesis title if it was changed
        if (editThesisTitle.trim() && editThesisTitle.trim() !== currentThesis?.title) {
          requestBody.thesisTitle = editThesisTitle.trim()
        }

        const response = await fetch('/api/thesis', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        })

      if (response.ok) {
        // Store current selections before refreshing data
        const currentThesis = selectedThesis
        const currentSection = selectedSection
        
        await fetchThesisData()
        
        // Restore selections after refresh
        setSelectedThesis(currentThesis)
        setSelectedSection(currentSection)
        
        // Manually load the content for the restored section
        const updatedThesisData = await fetch('/api/thesis').then(res => res.json())
        const currentThesisData = updatedThesisData[currentThesis]
        if (currentThesisData) {
          let content = ""
          
          // Get content based on section type
          if (currentSection === 'title') {
            content = currentThesisData.title || ""
          } else if (currentSection === 'subtitle') {
            content = currentThesisData.subtitle || ""
          } else if (currentSection === 'industry') {
            content = currentThesisData.industry || ""
          } else if (currentSection === 'publishDate') {
            content = currentThesisData.publishDate || ""
          } else if (currentSection === 'readTime') {
            content = currentThesisData.readTime || ""
          } else if (currentSection === 'tags') {
            content = Array.isArray(currentThesisData.tags) ? currentThesisData.tags.join(', ') : ""
          } else if (currentSection === 'contact') {
            const contact = currentThesisData.contact
            if (contact && typeof contact === 'object') {
              content = `${contact.name || ''}\n${contact.title || ''}\n${contact.company || ''}\n${contact.email || ''}`
            }
          } else if (currentSection === 'sources') {
            const sources = currentThesisData.sources
            if (Array.isArray(sources)) {
              content = sources.join('\n')
            }
          } else {
            // Content sections
            const sectionData = currentThesisData.content?.[currentSection]
            if (sectionData) {
              if (typeof sectionData === 'object' && sectionData.content) {
                content = sectionData.content
              } else if (typeof sectionData === 'string') {
                content = sectionData
              }
            }
          }
          
          setEditContent(content)
        }
        
        alert('Content updated successfully!')
      } else {
        const errorData = await response.json()
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to save:', error)
      alert('Failed to save content')
    } finally {
      setSaving(false)
    }
  }

  const handleCreateThesis = async () => {
    if (!newThesisId || !newThesisTitle) {
      alert('Please enter both thesis ID and title')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/thesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thesisId: newThesisId,
            title: newThesisTitle,
          subtitle: newThesisSubtitle,
          industry: newThesisIndustry || "New Industry",
          publishDate: newThesisPublishDate || new Date().toISOString().split('T')[0],
          readTime: newThesisReadTime || "10 min read",
          tags: newThesisTags ? newThesisTags.split(',').map((tag: string) => tag.trim()) : ["New", "Industry"],
          category: newThesisCategory,
          featured: newThesisFeatured,
            content: {
              executiveSummary: {
                title: "I. Executive Summary",
              content: ""
              },
              conclusion: {
              title: "II. Conclusion",
              content: ""
            },
            contact: {
              title: "III. Contact",
              content: {
                name: "",
                title: "",
                company: "",
                email: ""
              }
            },
            sources: {
              title: "IV. Sources",
              content: []
            }
          },
          contact: {
            name: "",
            title: "",
            company: "",
            email: ""
          },
          sources: []
        })
      })

      if (response.ok) {
        // Store the new thesis ID before refreshing data
        const newThesisIdToSelect = newThesisId
        
        await fetchThesisData()
        
        // Clear form and select the new thesis
        setNewThesisId("")
        setNewThesisTitle("")
        setNewThesisSubtitle("")
        setNewThesisIndustry("")
        setNewThesisPublishDate("")
        setNewThesisReadTime("")
        setNewThesisTags("")
        setNewThesisCategory("industry-theses")
        setNewThesisFeatured(false)
        setShowCreateForm(false)
        setSelectedThesis(newThesisIdToSelect)
        alert('New thesis created successfully!')
      }
    } catch (error) {
      console.error('Failed to create thesis:', error)
      alert('Failed to create thesis')
    } finally {
      setSaving(false)
    }
  }

  const sections = [
    { value: 'title', label: 'Title' },
    { value: 'industry', label: 'Industry' },
    { value: 'publishDate', label: 'Publish Date' },
    { value: 'readTime', label: 'Read Time' },
    { value: 'tags', label: 'Tags (comma separated)' },
    { value: 'executiveSummary', label: 'Executive Summary' },
    { value: 'narrative', label: 'Narrative' },
    { value: 'structuralObservations', label: 'Structural Observations' },
    { value: 'fundingSignals', label: 'Funding Signals' },
    { value: 'workflowFit', label: 'Workflow Fit' },
    { value: 'productStrategy', label: 'Product Strategy' },
    { value: 'segmentStrategy', label: 'Segment Strategy' },
    { value: 'salesRealities', label: 'Sales Realities' },
    { value: 'conclusion', label: 'Conclusion' },
  ]

  const currentThesis = thesisData[selectedThesis]

  // Convert number to Roman numeral
  const toRomanNumeral = (num: number): string => {
    if (num === 0) return ''
    
    const romanNumerals = [
      { value: 100, numeral: 'C' },
      { value: 90, numeral: 'XC' },
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' }
    ]
    
    let result = ''
    let remaining = num
    
    for (const { value, numeral } of romanNumerals) {
      while (remaining >= value) {
        result += numeral
        remaining -= value
      }
    }
    
    return result
  }

  const getCurrentContent = () => {
    if (!currentThesis || !selectedSection) return ""
    
    if (selectedSection === 'title') return currentThesis.title || ""
    if (selectedSection === 'subtitle') return currentThesis.subtitle || ""
    if (selectedSection === 'industry') return currentThesis.industry || ""
    if (selectedSection === 'publishDate') return currentThesis.publishDate || ""
    if (selectedSection === 'readTime') return currentThesis.readTime || ""
    if (selectedSection === 'tags') return currentThesis.tags?.join(', ') || ""
    if (selectedSection === 'contact') {
      const contact = currentThesis.contact
      if (!contact) return ""
      if (typeof contact === 'string') {
        return contact
      }
      return `${(contact as Record<string, unknown>).name}\n${(contact as Record<string, unknown>).title}\n${(contact as Record<string, unknown>).company}\n${(contact as Record<string, unknown>).email}`
    }
    if (selectedSection === 'sources') {
      const sources = currentThesis.sources
      if (!sources) return ""
      if (Array.isArray(sources)) {
        return sources.join('\n')
      }
      return JSON.stringify(sources, null, 2)
    }
    
    // Handle complex sections that have nested structures
    const sectionData = (currentThesis.content as Record<string, unknown>)?.[selectedSection]
    if (!sectionData) return ""
    
    // For Contact section in content object
    if (selectedSection === 'contact' && (sectionData as Record<string, unknown>).content) {
      const contact = (sectionData as Record<string, unknown>).content
      if (typeof contact === 'string') {
        return contact
      }
      return `${(contact as Record<string, unknown>).name}\n${(contact as Record<string, unknown>).title}\n${(contact as Record<string, unknown>).company}\n${(contact as Record<string, unknown>).email}`
    }
    
    // For Sources section in content object
    if (selectedSection === 'sources' && (sectionData as Record<string, unknown>).content) {
      const sources = (sectionData as Record<string, unknown>).content
      if (Array.isArray(sources)) {
        return sources.join('\n')
      }
      return JSON.stringify(sources, null, 2)
    }
    
    // For sections with complex structure, return a formatted version
    if (selectedSection === 'structuralObservations' && (sectionData as Record<string, unknown>).observations) {
      return ((sectionData as Record<string, unknown>).observations as Record<string, unknown>[]).map((obs: Record<string, unknown>, index: number) => 
        `${obs.title}\n\n${obs.content}`
      ).join('\n\n')
    }
    
    // For sections with intro, wins, failures, conclusion structure
    // @ts-expect-error
    if (selectedSection === 'fundingSignals' && (sectionData as unknown).intro) {
      // @ts-expect-error
      let content = (sectionData as unknown).intro + '\n\n'
      // @ts-expect-error
      if ((sectionData as unknown).wins) {
        // @ts-expect-error
        content += 'Wins:\n' + (sectionData as unknown).wins.map((win: string) => `• ${win}`).join('\n') + '\n\n'
      }
      // @ts-expect-error
      if ((sectionData as unknown).failures) {
        // @ts-expect-error
        content += 'Failures:\n' + (sectionData as unknown).failures.map((failure: string) => `• ${failure}`).join('\n') + '\n\n'
      }
      // @ts-expect-error
      if ((sectionData as unknown).conclusion) {
        // @ts-expect-error
        content += 'Conclusion:\n' + (sectionData as unknown).conclusion
      }
      return content
    }
    
    // For sections with intro and table structure
    if (selectedSection === 'workflowFit' && (sectionData as any).intro) {
      let content = (sectionData as any).intro + '\n\n'
      if ((sectionData as any).table) {
        content += 'Table:\n' + (sectionData as any).table.map((row: Record<string, unknown>) => 
          `${row.workflow} | ${row.segmentFit} | ${row.productFit} | ${row.reason}`
        ).join('\n') + '\n\n'
      }
      if ((sectionData as any).conclusion) {
        content += 'Conclusion:\n' + (sectionData as any).conclusion
      }
      return content
    }
    
    // For sections with intro and segments structure
    if (selectedSection === 'segmentStrategy' && (sectionData as any).intro) {
      let content = (sectionData as any).intro + '\n\n'
      if ((sectionData as any).segments) {
        content += 'Segments:\n' + (sectionData as any).segments.map((segment: Record<string, unknown>) => 
          `${segment.name}: ${segment.description}`
        ).join('\n\n') + '\n\n'
      }
      return content
    }
    
    // For sections with intro and keyPoints structure
    if (selectedSection === 'salesRealities' && (sectionData as any).intro) {
      let content = (sectionData as any).intro + '\n\n'
      if ((sectionData as any).keyPoints) {
        content += 'Key Points:\n' + (sectionData as any).keyPoints.map((point: string) => `• ${point}`).join('\n') + '\n\n'
      }
      if ((sectionData as any).timelines) {
        content += 'Timelines:\n' + (sectionData as any).timelines.map((timeline: Record<string, unknown>) => 
          `${timeline.segment}: ${timeline.timeline} - ${timeline.note}`
        ).join('\n') + '\n\n'
      }
      if ((sectionData as any).buyerPersonas) {
        content += 'Buyer Personas:\n' + (sectionData as any).buyerPersonas.map((persona: Record<string, unknown>) => 
          `${persona.title}: ${persona.description}`
        ).join('\n\n') + '\n\n'
      }
      if ((sectionData as any).conclusion) {
        content += 'Conclusion:\n' + (sectionData as any).conclusion
      }
      return content
    }
    
    // For sections with intro and table structure (product strategy)
    if (selectedSection === 'productStrategy' && (sectionData as any).intro) {
      let content = (sectionData as any).intro + '\n\n'
      if ((sectionData as any).table) {
        content += 'Table:\n' + (sectionData as any).table.map((row: Record<string, unknown>) => 
          `${row.startingPoint} | ${row.expansionPath} | ${row.conditions}`
        ).join('\n') + '\n\n'
      }
      if ((sectionData as any).whatNotToDo) {
        content += 'What Not To Do:\n' + (sectionData as any).whatNotToDo.map((item: string) => `• ${item}`).join('\n') + '\n\n'
      }
      return content
    }
    
    // Default fallback for simple content
    if (typeof sectionData === 'string') {
      return sectionData
    } else if ((sectionData as any).content) {
      return (sectionData as any).content
    } else if ((sectionData as any).title) {
      // For sections with title, always return the content (empty string for new sections)
      return (sectionData as any).content || ""
    } else {
      // If we can't parse it, return empty string for new sections
      return ""
    }
  }

  const handleLoadContent = () => {
    if (!currentThesis || !selectedSection) {
      alert('Please select a thesis and section first')
      return
    }
    
    const content = getCurrentContent()
    console.log('Loading content for section:', selectedSection, 'Content:', content)
    setEditContent(content)
  }

  const handleAddSection = async () => {
    if (!selectedThesis) {
      alert('Please select a thesis first')
      return
    }

    // Prompt for section title
    const sectionTitle = prompt('Enter section title:')
    if (!sectionTitle || sectionTitle.trim() === '') {
      return
    }

    // Prompt for section number
    const sectionNumberStr = prompt('Enter section number (e.g., 3, 4, 5):')
    if (!sectionNumberStr || sectionNumberStr.trim() === '') {
      return
    }

    const sectionNumber = parseInt(sectionNumberStr)
    if (isNaN(sectionNumber) || sectionNumber < 1) {
      alert('Please enter a valid number (1 or higher)')
      return
    }

    setSaving(true)
    try {
      // Generate a unique section ID
      const sectionId = `section-${Math.random().toString(36).substr(2, 9)}`
      
      // Get current thesis data
      const currentThesisData = thesisData[selectedThesis]
      const existingContent = currentThesisData.content || {}
      
      // Create new content object with proper ordering and updated Roman numerals
      const existingSections = Object.entries(existingContent)
      const newContent: Record<string, unknown> = {}
      
      // Insert the new section at the correct position and update numbering
      let inserted = false
      const currentRomanNum = 1
      
      // Convert existing sections to array with their positions (only numbered content sections)
      const sectionsWithPositions = existingSections
        .filter(([key, section]) => {
          const sectionData = section as Record<string, unknown>
          const existingSectionTitle = (sectionData.title as string) || key
          // Only include sections that have Roman numerals (numbered sections)
          return existingSectionTitle.match(/^[IVX]+\./)
        })
        .map(([key, section]) => {
          const sectionData = section as Record<string, unknown>
          const existingSectionTitle = (sectionData.title as string) || key
          // Extract the Roman numeral position (I=1, II=2, III=3, etc.)
          const romanMatch = existingSectionTitle.match(/^([IVX]+)\./)
          const position = romanMatch ? 
            (romanMatch[1] === 'I' ? 1 : 
             romanMatch[1] === 'II' ? 2 : 
             romanMatch[1] === 'III' ? 3 : 
             romanMatch[1] === 'IV' ? 4 : 
             romanMatch[1] === 'V' ? 5 : 
             romanMatch[1] === 'VI' ? 6 : 
             romanMatch[1] === 'VII' ? 7 : 
             romanMatch[1] === 'VIII' ? 8 : 
             romanMatch[1] === 'IX' ? 9 : 
             romanMatch[1] === 'X' ? 10 : 
             romanMatch[1] === 'XI' ? 11 : 
             romanMatch[1] === 'XII' ? 12 : 
             romanMatch[1] === 'XIII' ? 13 : 
             romanMatch[1] === 'XIV' ? 14 : 
             romanMatch[1] === 'XV' ? 15 : 999) : 999
          
          return { key, section: sectionData, position }
        }).sort((a, b) => a.position - b.position)
      
      // All sections with positions (including Contact and Sources from content)
      const allSectionsWithPositions = [...sectionsWithPositions]
      
      // Sort by position
      allSectionsWithPositions.sort((a, b) => a.position - b.position)
      
      // Find the maximum current position
      const maxPosition = allSectionsWithPositions.length > 0 ? Math.max(...allSectionsWithPositions.map(s => s.position)) : 0
      
      // If requested position is beyond current max, use max + 1
      const actualInsertPosition = sectionNumber > maxPosition ? maxPosition + 1 : sectionNumber
      
      // First, add all existing sections that don't have Roman numerals (top-level fields)
      for (const [key, section] of existingSections) {
        const sectionData = section as Record<string, unknown>
        const existingSectionTitle = (sectionData.title as string) || key
        if (!existingSectionTitle.match(/^[IVX]+\./)) {
          // This is a top-level field, keep it as is
          newContent[key] = sectionData
        }
      }
      
      // Then handle numbered sections (including Contact and Sources)
      for (const { key, section: sectionData, position } of allSectionsWithPositions) {
        const existingSectionTitle = (sectionData.title as string) || key
        
        if (!inserted && actualInsertPosition <= position) {
          // Insert new section with Roman numeral (simple form like Executive Summary)
          newContent[sectionId] = {
            title: `${toRomanNumeral(actualInsertPosition)}. ${sectionTitle}`,
            content: ""
          }
          inserted = true
        }
        
        // Update existing section with new Roman numeral
        const newPosition = inserted && position >= actualInsertPosition ? position + 1 : position
        newContent[key] = {
          ...sectionData,
          title: `${toRomanNumeral(newPosition)}. ${existingSectionTitle.replace(/^[IVX]+\.\s*/, '')}`
        }
      }
      
      // If not inserted yet, add at the end of numbered sections
      if (!inserted) {
        newContent[sectionId] = {
          title: `${toRomanNumeral(actualInsertPosition)}. ${sectionTitle}`,
          content: ""
        }
      }

      // Update the thesis with new content
      const response = await fetch('/api/thesis', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thesisId: selectedThesis,
          section: 'content',
          content: newContent
        })
      })

      if (response.ok) {
        // Store current selections before refreshing data
        const currentThesis = selectedThesis
        const newSectionId = sectionId
        
        // Add a small delay to ensure the server has processed the update
        await new Promise(resolve => setTimeout(resolve, 500))
        await fetchThesisData()
        
        // Restore selections and select the new section
        setSelectedThesis(currentThesis)
        setSelectedSection(newSectionId)
        // Clear content for the new section
        setEditContent("")
        alert('Section added successfully! You can now select it from the dropdown to edit.')
      } else {
        const errorData = await response.json()
        alert(`Failed to add section: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to add section:', error)
      alert('Failed to add section')
    } finally {
      setSaving(false)
    }
  }

  // Function to delete a section
  const handleDeleteSection = async () => {
    if (!selectedThesis || !selectedSection) {
      alert('Please select a thesis and section to delete')
      return
    }

    const confirmDelete = confirm(`Are you sure you want to delete "${selectedSection}"?`)
    if (!confirmDelete) return

    setSaving(true)
    try {
      const currentThesisData = thesisData[selectedThesis]
      const existingContent = currentThesisData.content || {}
      const newContent: Record<string, unknown> = {}
      
      // Remove the selected section and renumber the rest
      let currentRomanNum = 1
      for (const [key, section] of Object.entries(existingContent)) {
        if (key !== selectedSection) {
          const sectionData = section as Record<string, unknown>
          const existingSectionTitle = (sectionData.title as string) || key
          const cleanTitle = existingSectionTitle.replace(/^[IVX]+\.\s*/, '')
          
          newContent[key] = {
            ...sectionData,
            title: `${toRomanNumeral(currentRomanNum)}. ${cleanTitle}`
          }
          currentRomanNum++
        }
      }

      // Update the thesis with renumbered content
      const response = await fetch('/api/thesis', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thesisId: selectedThesis,
          section: 'content',
          content: newContent
        })
      })

      if (response.ok) {
        // Store current thesis selection before refreshing data
        const currentThesis = selectedThesis
        
        await fetchThesisData()
        
        // Restore thesis selection and clear section selection
        setSelectedThesis(currentThesis)
        setSelectedSection('')
        setEditContent('')
        alert('Section deleted successfully!')
      } else {
        const errorData = await response.json()
        alert(`Failed to delete section: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to delete section:', error)
      alert('Failed to delete section')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteThesis = async () => {
    if (!selectedThesis) {
      alert('Please select a thesis to delete')
      return
    }

    const confirmDelete = confirm(`Are you sure you want to delete the thesis "${selectedThesis}"? This action cannot be undone.`)
    if (!confirmDelete) return

    setSaving(true)
    try {
      const response = await fetch('/api/thesis', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thesisId: selectedThesis })
      })

      if (response.ok) {
        // Clear the form
        setSelectedThesis('')
        setSelectedSection('')
        setEditContent('')
        
        // Refresh the thesis list
        await fetchThesisData()
        
        alert(`Thesis "${selectedThesis}" deleted successfully`)
      } else {
        const errorData = await response.json()
        alert(`Failed to delete thesis: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to delete thesis:', error)
      alert('Failed to delete thesis')
    } finally {
      setSaving(false)
    }
  }

  const handleMediaUpload = async (file: File) => {
    if (!selectedThesis) {
      alert('Please select a thesis first')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('thesisId', selectedThesis)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        
        // Insert the media at the cursor position or at the end
        const textarea = document.getElementById('content') as HTMLTextAreaElement
        if (textarea) {
          const cursorPos = textarea.selectionStart
          const textBefore = editContent.substring(0, cursorPos)
          const textAfter = editContent.substring(cursorPos)
          
          // Create media embed based on file type
          let mediaEmbed = ''
          if (result.fileType.startsWith('image/')) {
            mediaEmbed = `\n\n![Image](${result.url})\n\n`
          } else if (result.fileType.startsWith('video/')) {
            mediaEmbed = `\n\n<video controls>\n  <source src="${result.url}" type="${result.fileType}">\n  Your browser does not support the video tag.\n</video>\n\n`
          }
          
          const newContent = textBefore + mediaEmbed + textAfter
          setEditContent(newContent)
          
          // Set cursor position after the inserted media
          setTimeout(() => {
            textarea.focus()
            const newCursorPos = cursorPos + mediaEmbed.length
            textarea.setSelectionRange(newCursorPos, newCursorPos)
          }, 100)
        }
        
        alert('Media uploaded and inserted successfully!')
      } else {
        const errorData = await response.json()
        alert(`Upload failed: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 w-full shadow-sm flex items-center justify-between h-20 px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full p-3 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]"
          aria-label="Back"
        >
          <ArrowLeft className="w-7 h-7" />
        </Button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-semibold">Thesis Content Management</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-full p-3 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]"
            aria-label="Preview"
          >
            <Eye className="w-7 h-7" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchThesisData}
            className="rounded-full p-3 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]"
            aria-label="Refresh"
          >
            <RefreshCw className="w-7 h-7" />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Create New Thesis - Compact at top */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Create New Thesis</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {showCreateForm ? 'Hide' : 'New Thesis'}
              </Button>
            </div>
          </CardHeader>
          {showCreateForm && (
            <CardContent className="space-y-6 pt-0">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newThesisTitle">Thesis Title *</Label>
                    <Input
                      id="newThesisTitle"
                      value={newThesisTitle}
                      onChange={(e) => {
                        setNewThesisTitle(e.target.value)
                        // Auto-generate thesis ID from title
                        const generatedId = generateThesisId(e.target.value)
                        setNewThesisId(generatedId)
                      }}
                      placeholder="e.g., Healthcare Technology Thesis"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newThesisId">Thesis ID (Auto-generated)</Label>
                    <Input
                      id="newThesisId"
                      value={newThesisId}
                      onChange={(e) => setNewThesisId(e.target.value)}
                      placeholder="Auto-generated from title"
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newThesisSubtitle">Subtitle/Description</Label>
                  <Textarea
                    id="newThesisSubtitle"
                    value={newThesisSubtitle}
                    onChange={(e) => setNewThesisSubtitle(e.target.value)}
                    placeholder="Brief description that appears on the research page"
                    rows={2}
                  />
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Metadata</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newThesisIndustry">Industry</Label>
                    <Input
                      id="newThesisIndustry"
                      value={newThesisIndustry}
                      onChange={(e) => setNewThesisIndustry(e.target.value)}
                      placeholder="e.g., Healthcare"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newThesisPublishDate">Publish Date</Label>
                    <Input
                      id="newThesisPublishDate"
                      type="date"
                      value={newThesisPublishDate}
                      onChange={(e) => setNewThesisPublishDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newThesisReadTime">Read Time</Label>
                    <Input
                      id="newThesisReadTime"
                      value={newThesisReadTime}
                      onChange={(e) => setNewThesisReadTime(e.target.value)}
                      placeholder="e.g., 15 min read"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newThesisTags">Tags</Label>
                  <Input
                    id="newThesisTags"
                    value={newThesisTags}
                    onChange={(e) => setNewThesisTags(e.target.value)}
                    placeholder="e.g., Healthcare, Technology, AI"
                  />
                </div>
              </div>

              {/* Display Settings */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Display Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newThesisCategory">Category</Label>
                    <Select value={newThesisCategory} onValueChange={setNewThesisCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="z-50">
                        <SelectItem value="industry-theses">Industry Theses</SelectItem>
                        <SelectItem value="whitepapers">White Papers</SelectItem>
                        <SelectItem value="industry-decompositions">Industry Decompositions</SelectItem>
                        <SelectItem value="build-process">InVitro Builder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newThesisFeatured">Featured Research</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="newThesisFeatured"
                        checked={newThesisFeatured}
                        onChange={(e) => setNewThesisFeatured(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="newThesisFeatured" className="text-sm text-gray-600">
                        Show in featured research section
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create Button */}
              <div className="pt-2">
                <Button 
                  onClick={handleCreateThesis}
                  disabled={saving || !newThesisId || !newThesisTitle}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {saving ? 'Creating...' : 'Create New Thesis'}
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Update Thesis Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Thesis Selection */}
                <div className="space-y-2">
                  <Label htmlFor="thesis">Select Thesis</Label>
                  <div className="flex gap-2">
                  <Select value={selectedThesis} onValueChange={setSelectedThesis}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a thesis" />
                    </SelectTrigger>
                                          <SelectContent className="z-50">
                      {Object.keys(thesisData).map((thesisId) => (
                        <SelectItem key={thesisId} value={thesisId}>
                          {thesisData[thesisId].title || thesisId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDeleteThesis}
                      disabled={saving || !selectedThesis}
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Section Selection */}
                <div className="space-y-2">
                  <Label htmlFor="section">Select Section</Label>
                  <div className="flex gap-2">
                    <Select 
                      value={selectedSection} 
                      onValueChange={(value) => {
                      setSelectedSection(value)
                      // Clear content immediately when section changes
                      setEditContent("")
                      setEditSectionTitle("")
                      setEditThesisTitle("")
                      // Auto-load content when section changes
                      setTimeout(() => {
                        if (currentThesis && value) {
                          // Get content for the new section directly
                          let content = ""
                          if (value === 'title') {
                            content = currentThesis.title || ""
                          } else if (value === 'subtitle') {
                            content = currentThesis.subtitle || ""
                          } else if (value === 'industry') {
                            content = currentThesis.industry || ""
                          } else if (value === 'publishDate') {
                            content = currentThesis.publishDate || ""
                          } else if (value === 'readTime') {
                            content = currentThesis.readTime || ""
                          } else if (value === 'tags') {
                            content = currentThesis.tags?.join(', ') || ""
                          } else if (value === 'contact') {
                            const contact = currentThesis.contact
                            if (!contact) {
                              content = ""
                            } else if (typeof contact === 'string') {
                              content = contact
                            } else {
                              content = `${contact.name}\n${contact.title}\n${contact.company}\n${contact.email}`
                            }
                          } else if (value === 'sources') {
                            const sources = currentThesis.sources
                            if (!sources) {
                              content = ""
                            } else if (Array.isArray(sources)) {
                              content = sources.join('\n')
                            } else {
                              content = JSON.stringify(sources, null, 2)
                            }
                          } else {
                            const sectionData = currentThesis.content?.[value]
                            if (!sectionData) {
                              content = ""
                            } else if (typeof sectionData === 'string') {
                              content = sectionData
                            } else if ((sectionData as any).content) {
                              content = (sectionData as any).content
                              // Set the section title for editing if it exists
                              if ((sectionData as any).title) {
                                setEditSectionTitle((sectionData as any).title)
                              }
                            } else if ((sectionData as any).title && (sectionData as any).content) {
                              content = (sectionData as any).content
                              // Set the section title for editing
                              setEditSectionTitle((sectionData as any).title)
                            } else if ((sectionData as any).title) {
                              // Section has a title but no content yet
                              content = ""
                              setEditSectionTitle((sectionData as any).title)
                                                          } else {
                                // Use the same logic as getCurrentContent for complex sections
                                if (value === 'structuralObservations' && (sectionData as any).observations) {
                                  content = (sectionData as any).observations.map((obs: Record<string, unknown>) => 
                                    `${obs.title}\n\n${obs.content}`
                                  ).join('\n\n')
                                } else if (value === 'fundingSignals' && (sectionData as any).intro) {
                                  let formattedContent = (sectionData as any).intro + '\n\n'
                                  if ((sectionData as any).wins) {
                                    formattedContent += 'Wins:\n' + (sectionData as any).wins.map((win: string) => `• ${win}`).join('\n') + '\n\n'
                                  }
                                  if ((sectionData as any).failures) {
                                    formattedContent += 'Failures:\n' + (sectionData as any).failures.map((failure: string) => `• ${failure}`).join('\n') + '\n\n'
                                  }
                                  if ((sectionData as any).conclusion) {
                                    formattedContent += 'Conclusion:\n' + (sectionData as any).conclusion
                                  }
                                  content = formattedContent
                                                              } else if (value === 'workflowFit' && (sectionData as any).intro) {
                                  let formattedContent = (sectionData as any).intro + '\n\n'
                                  if ((sectionData as any).table) {
                                    formattedContent += 'Table:\n' + (sectionData as any).table.map((row: Record<string, unknown>) => 
                                      `${row.workflow} | ${row.segmentFit} | ${row.productFit} | ${row.reason}`
                                    ).join('\n') + '\n\n'
                                  }
                                  if ((sectionData as any).conclusion) {
                                    formattedContent += 'Conclusion:\n' + (sectionData as any).conclusion
                                  }
                                  content = formattedContent
                                } else if (value === 'productStrategy' && (sectionData as any).intro) {
                                  let formattedContent = (sectionData as any).intro + '\n\n'
                                  if ((sectionData as any).table) {
                                    formattedContent += 'Table:\n' + (sectionData as any).table.map((row: Record<string, unknown>) => 
                                      `${row.startingPoint} | ${row.expansionPath} | ${row.conditions}`
                                    ).join('\n') + '\n\n'
                                  }
                                  if ((sectionData as any).whatNotToDo) {
                                    formattedContent += 'What Not To Do:\n' + (sectionData as any).whatNotToDo.map((item: string) => `• ${item}`).join('\n') + '\n\n'
                                  }
                                  content = formattedContent
                              } else if (value === 'segmentStrategy' && sectionData.intro) {
                                let formattedContent = sectionData.intro + '\n\n'
                                if (sectionData.segments) {
                                  formattedContent += 'Segments:\n' + sectionData.segments.map((segment: Record<string, unknown>) => 
                                    `${segment.name}: ${segment.description}`
                                  ).join('\n\n') + '\n\n'
                                }
                                content = formattedContent
                              } else if (value === 'salesRealities' && sectionData.intro) {
                                let formattedContent = sectionData.intro + '\n\n'
                                if (sectionData.keyPoints) {
                                  formattedContent += 'Key Points:\n' + sectionData.keyPoints.map((point: string) => `• ${point}`).join('\n') + '\n\n'
                                }
                                if (sectionData.timelines) {
                                  formattedContent += 'Timelines:\n' + sectionData.timelines.map((timeline: Record<string, unknown>) => 
                                    `${timeline.segment}: ${timeline.timeline} - ${timeline.note}`
                                  ).join('\n') + '\n\n'
                                }
                                if (sectionData.buyerPersonas) {
                                  formattedContent += 'Buyer Personas:\n' + sectionData.buyerPersonas.map((persona: Record<string, unknown>) => 
                                    `${persona.title}: ${persona.description}`
                                  ).join('\n\n') + '\n\n'
                                }
                                if (sectionData.conclusion) {
                                  formattedContent += 'Conclusion:\n' + sectionData.conclusion
                                }
                                content = formattedContent
                              } else {
                                // For new sections or unknown structures, handle simple content structure
                                if (sectionData && typeof sectionData === 'object') {
                                  if (sectionData.content !== undefined) {
                                    content = sectionData.content
                                  } else if (sectionData.title) {
                                    // New sections might have title but no content yet
                                    content = ""
                                  } else {
                                    content = ""
                                  }
                                } else {
                                  content = ""
                                }
                              }
                            }
                          }
                          
                          setEditContent(content)
                        }
                      }, 100)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a section" />
                    </SelectTrigger>
                                          <SelectContent className="z-50">
                        {/* Top-level fields */}
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="subtitle">Subtitle</SelectItem>
                        <SelectItem value="industry">Industry</SelectItem>
                        <SelectItem value="publishDate">Publish Date</SelectItem>
                        <SelectItem value="readTime">Read Time</SelectItem>
                        <SelectItem value="tags">Tags</SelectItem>
                        
                        {/* Content sections from current thesis - sorted by Roman numeral */}
                        {currentThesis?.content && Object.keys(currentThesis.content)
                          .map((sectionKey) => {
                            const sectionData = currentThesis.content[sectionKey]
                            const sectionTitle = typeof sectionData === 'object' && sectionData.title ? sectionData.title : sectionKey
                            // Extract Roman numeral position for sorting
                            const romanMatch = sectionTitle.match(/^([IVX]+)\./)
                            const position = romanMatch ? 
                              (romanMatch[1] === 'I' ? 1 : 
                               romanMatch[1] === 'II' ? 2 : 
                               romanMatch[1] === 'III' ? 3 : 
                               romanMatch[1] === 'IV' ? 4 : 
                               romanMatch[1] === 'V' ? 5 : 
                               romanMatch[1] === 'VI' ? 6 : 
                               romanMatch[1] === 'VII' ? 7 : 
                               romanMatch[1] === 'VIII' ? 8 : 
                               romanMatch[1] === 'IX' ? 9 : 
                               romanMatch[1] === 'X' ? 10 : 
                               romanMatch[1] === 'XI' ? 11 : 
                               romanMatch[1] === 'XII' ? 12 : 
                               romanMatch[1] === 'XIII' ? 13 : 
                               romanMatch[1] === 'XIV' ? 14 : 
                               romanMatch[1] === 'XV' ? 15 : 999) : 999
                            return { sectionKey, sectionTitle, position }
                          })
                          .sort((a, b) => a.position - b.position)
                          .map(({ sectionKey, sectionTitle }) => (
                            <SelectItem key={sectionKey} value={sectionKey}>
                              {sectionTitle}
                        </SelectItem>
                      ))}
                        

                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteSection}
                    disabled={saving || !selectedThesis || !selectedSection || selectedSection === 'title' || selectedSection === 'subtitle' || selectedSection === 'industry' || selectedSection === 'publishDate' || selectedSection === 'readTime' || selectedSection === 'tags' || selectedSection === 'contact' || selectedSection === 'sources'}
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                </div>

                {/* Add Section */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddSection}
                    disabled={saving || !selectedThesis}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>

                {/* Thesis Title Editor */}
                {selectedThesis && (
                  <div className="space-y-2">
                    <Label htmlFor="thesisTitle">Thesis Title</Label>
                    <Input
                      id="thesisTitle"
                      value={editThesisTitle || currentThesis?.title || ""}
                      onChange={(e) => setEditThesisTitle(e.target.value)}
                      placeholder="Enter thesis title..."
                      className="w-full"
                    />
                  </div>
                )}

                {/* Featured Research Toggle */}
                {selectedThesis && (
                  <div className="space-y-2">
                    <Label htmlFor="thesisFeatured">Featured Research</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="thesisFeatured"
                        checked={currentThesis?.featured || false}
                        onChange={async (e) => {
                          if (!selectedThesis) return
                          
                          setSaving(true)
                          try {
                            const response = await fetch('/api/thesis', {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                thesisId: selectedThesis,
                                featured: e.target.checked
                              }),
                            })
                            
                            if (response.ok) {
                              // Store current selections
                              const currentThesis = selectedThesis
                              const currentSection = selectedSection
                              
                              // Refresh the thesis data to show the updated featured status
                              await fetchThesisData()
                              
                              // Restore selections after refresh
                              setSelectedThesis(currentThesis)
                              setSelectedSection(currentSection)
                            } else {
                              console.error('Failed to update featured status')
                            }
                          } catch (error) {
                            console.error('Error updating featured status:', error)
                          } finally {
                            setSaving(false)
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="thesisFeatured" className="text-sm text-gray-600">
                        Show in featured research section
                      </Label>
                    </div>
                  </div>
                )}

                {/* Section Title Editor */}
                {selectedSection && selectedSection !== 'title' && selectedSection !== 'subtitle' && selectedSection !== 'industry' && selectedSection !== 'publishDate' && selectedSection !== 'readTime' && selectedSection !== 'tags' && selectedSection !== 'contact' && selectedSection !== 'sources' && (
                  <div className="space-y-2">
                    <Label htmlFor="sectionTitle">Section Title</Label>
                    <Input
                      id="sectionTitle"
                      value={editSectionTitle}
                      onChange={(e) => setEditSectionTitle(e.target.value)}
                      placeholder="Enter new section title..."
                      className="w-full"
                    />
                  </div>
                )}

                {/* Content Editor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="content">Content</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLoadContent}
                      className="text-xs"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Load Current
                    </Button>
                  </div>
                  
                  {/* Formatting Toolbar */}
                  <div className="flex items-center gap-1 p-2 bg-gray-50 rounded-lg border">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('bold')}
                      className="h-8 w-8 p-0"
                      title="Bold (Ctrl+B)"
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('italic')}
                      className="h-8 w-8 p-0"
                      title="Italic (Ctrl+I)"
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('underline')}
                      className="h-8 w-8 p-0"
                      title="Underline (Ctrl+U)"
                    >
                      <Underline className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={addBullet}
                      className="h-8 w-8 p-0"
                      title="Add Bullet"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={addIndent}
                      className="h-8 w-8 p-0"
                      title="Add Indent"
                    >
                      <Indent className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>


                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      type="button"
                      variant={textAlignment === 'left' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => alignText('left')}
                      className="h-8 w-8 p-0"
                      title="Align Left"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant={textAlignment === 'center' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => alignText('center')}
                      className="h-8 w-8 p-0"
                      title="Align Center"
                    >
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant={textAlignment === 'right' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => alignText('right')}
                      className="h-8 w-8 p-0"
                      title="Align Right"
                    >
                      <AlignRight className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={createTable}
                      className="h-8 px-2 text-xs"
                      title="Create Table"
                    >
                      Create Table
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={addCalloutBlock}
                      className="h-8 w-8 p-0"
                      title="Add Callout Block"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Textarea
                    id="content"
                    value={editContent}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditContent(e.target.value)}
                    placeholder="Enter content here..."
                    className="min-h-[300px]"
                  />
                </div>

                {/* Media Upload */}
                <div className="space-y-2">
                  <Label>Media Upload</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      id="media-upload"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleMediaUpload(file)
                          e.target.value = '' // Reset input
                        }
                      }}
                      className="hidden"
                      disabled={uploading || !selectedThesis}
                    />
                    <label
                      htmlFor="media-upload"
                      className={`cursor-pointer block ${uploading || !selectedThesis ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                    >
                      <div className="space-y-2">
                        <div className="text-gray-600">
                          {uploading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                              <span className="ml-2">Uploading...</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 mx-auto text-gray-400" />
                              <div className="text-sm font-medium">Click to upload image or video</div>
                              <div className="text-xs text-gray-500">Supports: JPG, PNG, GIF, WebP, MP4, WebM, OGG (max 10MB)</div>

                            </>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Save Button */}
                <Button 
                  onClick={handleSave}
                  disabled={saving || !selectedThesis || !selectedSection || !editContent.trim()}
                  className="w-full"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>


          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Content Preview */}
            {currentThesis && selectedSection && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg border max-h-64 overflow-y-auto">
                    <p className="text-sm text-gray-600">
                      {getCurrentContent() || 'No content found'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}



            {/* Preview Link */}
            {currentThesis && (
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Use the same routing logic as ResearchHub
                      const researchPages = [
                        "invitro-investment-build-process",
                        "invitro-private-markets-whitepaper", 
                        "healthcare-elearning-thesis",
                        "healthcare-prescription-dtc-thesis"
                      ]
                      const url = researchPages.includes(selectedThesis) 
                        ? `/research/${encodeURIComponent(selectedThesis)}`
                        : `/thesis/${encodeURIComponent(selectedThesis)}`
                      window.open(url, '_blank')
                    }}
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Thesis Page
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Table Converter Modal */}
        {showTableConverter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Convert Table Data</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowTableConverter(false)
                    setTableData("")
                    setTablePreview("")
                  }}
                >
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  {/* Mode Selection */}
                  <div className="space-y-2">
                    <Label>Table Creation Mode</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={!useStructure}
                          onChange={() => setUseStructure(false)}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Paste Data</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={useStructure}
                          onChange={() => setUseStructure(true)}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Set Structure</span>
                      </label>
                    </div>
                  </div>

                  {/* Structure Controls */}
                  {useStructure && (
                    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                      <Label>Table Structure</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="columns">Columns</Label>
                          <Input
                            id="columns"
                            type="number"
                            min="1"
                            max="10"
                            value={tableStructure.columns}
                            onChange={(e) => setTableStructure(prev => ({ ...prev, columns: parseInt(e.target.value) || 1 }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="rows">Rows</Label>
                          <Input
                            id="rows"
                            type="number"
                            min="1"
                            max="20"
                            value={tableStructure.rows}
                            onChange={(e) => setTableStructure(prev => ({ ...prev, rows: parseInt(e.target.value) || 1 }))}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Data Input */}
                  {!useStructure && (
                    <div>
                      <Label htmlFor="tableData">Paste your table data here</Label>
                      <Textarea
                        id="tableData"
                        value={tableData}
                        onChange={(e) => setTableData(e.target.value)}
                        placeholder="Paste your table data from PDF, Word, or Excel here..."
                        className="min-h-[300px]"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Supports: Tab-separated data, space-separated data, or mixed formats
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={convertTableData}
                      disabled={(!tableData.trim() && !useStructure) || !tablePreview}
                      className="flex-1"
                    >
                      Insert Table
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowTableConverter(false)
                        setTableData("")
                        setTablePreview("")
                        setUseStructure(false)
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="space-y-4">
                  <Label>Preview</Label>
                  <div className="border rounded-lg p-4 min-h-[300px] bg-gray-50">
                    {tablePreview ? (
                      <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: tablePreview }}
                      />
                    ) : (
                      <div className="text-gray-500 text-center py-8">
                        Paste data to see preview
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
"use client"

/* eslint-disable */
// @ts-nocheck
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"

// Define types for thesisData
interface ExecutiveSummary {
  title: string;
  content: string;
}

interface Narrative {
  title: string;
  content: string;
}

interface StructuralObservation {
  title: string;
  observations: {
    title: string;
    content: string;
  }[];
}

interface FundingSignals {
  title: string;
  intro: string;
  wins: string[];
  failures: string[];
  conclusion: string;
}

interface WorkflowFit {
  title: string;
  intro: string;
  table: {
    workflow: string;
    segmentFit: string;
    productFit: string;
    reason: string;
  }[];
  conclusion: string;
}

interface ProductStrategy {
  title: string;
  intro: string;
  table: {
    startingPoint: string;
    expansionPath: string;
    conditions: string;
  }[];
  whatNotToDo: string[];
}

interface SegmentStrategy {
  title: string;
  intro: string;
  segments: {
    name: string;
    description: string;
  }[];
}

interface SalesRealities {
  title: string;
  intro: string;
  keyPoints: string[];
  timelines: {
    segment: string;
    timeline: string;
    note: string;
  }[];
  buyerPersonas: {
    title: string;
    description: string;
  }[];
  conclusion: string;
}

interface Conclusion {
  title: string;
  content: string;
}

interface Contact {
  name: string;
  title: string;
  company: string;
  email: string;
}

type ContactData = Contact | string;

interface Sources {
  [index: number]: string;
}

interface ThesisContent {
  executiveSummary?: ExecutiveSummary;
  narrative?: Narrative;
  structuralObservations?: StructuralObservation;
  fundingSignals?: FundingSignals;
  workflowFit?: WorkflowFit;
  productStrategy?: ProductStrategy;
  segmentStrategy?: SegmentStrategy;
  salesRealities?: SalesRealities;
  conclusion?: Conclusion;
  contact?: Contact;
  sources?: Sources;
}

interface ThesisData {
  [key: string]: {
    title: string;
    subtitle?: string;
    industry: string;
    publishDate?: string;
    readTime?: string;
    tags?: string[];
    content?: ThesisContent;
    contact?: ContactData;
    sources?: string[];
  };
}

// New: Author interface for right sidebar
interface Author {
  id?: string;
  name: string;
  title: string;
  company: string;
  email: string;
  linkedin?: string;
  photoUrl?: string;
}

// Fallback data
const fallbackThesisData: ThesisData = {
  allrx: {
    title: "Digital Health Industry Thesis",
    subtitle: "A comprehensive analysis of digital health industry trends and opportunities",
    industry: "Pharmacy Operations",
  },
}

export default function IndustryThesis() {
  const router = useRouter()
  const params = useParams()
  const dealId = params.dealId as string

  // Helper function to process text content with formatting
  const processTextContent = (text: string) => {
    const lines = text.trim().split('\n')
    const processedElements = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (!line.trim()) continue
      
      // Process markdown formatting
      let formattedLine = line
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em>$1</em>')
      formattedLine = formattedLine.replace(/__(.*?)__/g, '<u>$1</u>')
      
      // Bullets: • text (with space, tab, or other whitespace)
      if (formattedLine.match(/^•[\s\t]/)) {
        formattedLine = formattedLine.replace(/^•[\s\t]+/, '')
        processedElements.push(
          <div key={i} className="bullet-item relative pl-12">
            <span className="absolute left-8 top-0 font-bold text-lg text-gray-800">•</span>
            <div className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: formattedLine }} />
          </div>
        )
      } else if (/^\d+\.[\s\t]/.test(formattedLine)) {
        const itemNum = (line.match(/^(\d+)\.[\s\t]+/) || [])[1] || ''
        const textOnly = formattedLine.replace(/^\d+\.[\s\t]+/, '')
        processedElements.push(
          <div key={i} className="bullet-item relative pl-12">
            <span className="absolute left-8 top-0 text-gray-700 font-normal">{itemNum}.</span>
            <div className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: textOnly }} />
          </div>
        )
      } else {
        
        // Indented text (4 spaces)
        if (formattedLine.startsWith('    ')) {
          formattedLine = formattedLine.replace(/^    /, '')
          processedElements.push(
            <div key={i} className="mb-4 ml-6 pl-4 border-l-2 border-gray-200">
              <span className="leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: formattedLine }} />
            </div>
          )
        } else {
          processedElements.push(
            <div key={i} className="mb-4">
              <span className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: formattedLine }} />
            </div>
          )
        }
      }
    }
    
    return processedElements
  }

  // Function to render content with media support
  const renderContent = (content: string) => {
    if (!content) return <div className="text-muted-foreground italic">No content yet.</div>

    // Check if content contains HTML table
    if (content.includes('<table')) {
      // Split content into text and HTML parts using a simpler approach
      const tableMatch = content.match(/(<table[\s\S]*?<\/table>)/)
      if (tableMatch && tableMatch.index !== undefined) {
        const tableHTML = tableMatch[1]
        const beforeTable = content.substring(0, tableMatch.index)
        const afterTable = content.substring(tableMatch.index + tableHTML.length)
        
        return (
          <div className="font-inter space-y-5 leading-relaxed markdown-body editor-content">
            {/* Render text before table */}
            {beforeTable.trim() && processTextContent(beforeTable)}
            
            {/* Render table */}
            <div className="my-4 -mx-4 sm:mx-0 overflow-x-auto text-xs sm:text-sm">
              <div className="min-w-[560px] md:min-w-[640px]" dangerouslySetInnerHTML={{ __html: tableHTML }} />
            </div>
            
            {/* Render text after table */}
            {afterTable.trim() && processTextContent(afterTable)}
          </div>
        )
      }
    }

    // Split content by lines to process each line
    const lines = content.split('\n')
    const renderedLines = lines.map((line, index) => {
      // Check for image markdown: ![alt](url) - handle this FIRST
      const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/)
      if (imageMatch) {
        const [, alt, url] = imageMatch
        return (
          <div key={index} className="my-4 flex justify-center">
            <img 
              src={url} 
              alt={alt || 'Image'} 
              className="max-w-full h-auto rounded-lg shadow-md"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )
      }

      // Check for video HTML: <video controls><source src="url" type="type"></video>
      const videoMatch = line.match(/<video[^>]*>.*?<source[^>]*src="([^"]+)"[^>]*>.*?<\/video>/)
      if (videoMatch) {
        const [, src] = videoMatch
        return (
          <div key={index} className="my-4">
            <video controls className="max-w-full h-auto rounded-lg shadow-md">
              <source src={src} />
              Your browser does not support the video tag.
            </video>
          </div>
        )
      }

      // Check for alignment divs (both flex and text alignment) - multi-line format
      const flexAlignmentMatch = line.match(/<div class="flex justify-(center|end)">/)
      const textAlignmentMatch = line.match(/<div class="text-(center|right)">/)
      const alignmentDivMatch = flexAlignmentMatch || textAlignmentMatch
      if (alignmentDivMatch) {
        const alignment = alignmentDivMatch[1] === 'center' ? 'center' : 'right'
        const isFlexAlignment = !!flexAlignmentMatch
        const isTextAlignment = !!textAlignmentMatch
        
        // Look for the closing div and content in between
        const closingDivIndex = lines.findIndex((l, i) => i > index && l.trim() === '</div>')
        if (closingDivIndex > index) {
          const contentLines = lines.slice(index + 1, closingDivIndex)
          
          // Process the content inside the div
          const processedContent = contentLines.map((contentLine, contentIndex) => {
            // Check for image markdown: ![alt](url)
            const imageMatch = contentLine.match(/!\[([^\]]*)\]\(([^)]+)\)/)
            if (imageMatch) {
              const [, alt, url] = imageMatch
              return (
                <img 
                  key={contentIndex}
                  src={url} 
                  alt={alt || 'Image'} 
                  className="max-w-full h-auto rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )
            }

            // Check for video HTML: <video controls><source src="url" type="type"></video>
            const videoMatch = contentLine.match(/<video[^>]*>.*?<source[^>]*src="([^"]+)"[^>]*>.*?<\/video>/)
            if (videoMatch) {
              const [, src] = videoMatch
              return (
                <video key={contentIndex} controls className="max-w-full h-auto rounded-lg shadow-md">
                  <source src={src} />
                  Your browser does not support the video tag.
                </video>
              )
            }

            return null
          }).filter(Boolean)

          // Determine the correct CSS class based on alignment type
          let cssClass = 'my-4'
          if (isFlexAlignment) {
            cssClass += ` flex ${alignment === 'center' ? 'justify-center' : 'justify-end'}`
          } else if (isTextAlignment) {
            cssClass += ` text-${alignment}`
          }

          return (
            <div key={index} className={cssClass}>
              {processedContent}
            </div>
          )
        }
      }

      // Check for callout block opening
      if (line.includes('<div class="callout-block">')) {
        // Find the closing div and extract content
        const closingDivIndex = lines.findIndex((l, i) => i > index && l.trim() === '</div>')
        if (closingDivIndex > index) {
          const calloutContentLines = lines.slice(index + 1, closingDivIndex)
          
          // Process callout content with media support
          const processedCalloutContent = calloutContentLines.map((contentLine, contentIndex) => {
            // Check for image markdown: ![alt](url)
            const imageMatch = contentLine.match(/!\[([^\]]*)\]\(([^)]+)\)/)
            if (imageMatch) {
              const [, alt, url] = imageMatch
              return (
                <div key={contentIndex} className="my-4">
                  <img 
                    src={url} 
                    alt={alt || 'Image'} 
                    className="max-w-full h-auto rounded-lg shadow-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )
            }

            // Check for video HTML: <video controls><source src="url" type="type"></video>
            const videoMatch = contentLine.match(/<video[^>]*>.*?<source[^>]*src="([^"]+)"[^>]*>.*?<\/video>/)
            if (videoMatch) {
              const [, src] = videoMatch
              return (
                <div key={contentIndex} className="my-4">
                  <video controls className="max-w-full h-auto rounded-lg shadow-md">
                    <source src={src} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )
            }

            // Regular text with formatting
            if (contentLine.trim()) {
              let formattedLine = contentLine
              formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em>$1</em>')
              formattedLine = formattedLine.replace(/__(.*?)__/g, '<u>$1</u>')
              
              // Bullets: • text
              if (formattedLine.match(/^•[\s\t]/)) {
                formattedLine = formattedLine.replace(/^•[\s\t]+/, '')
                return (
                  <div key={contentIndex} className="bullet-item relative pl-12">
                    <span className="absolute left-8 top-0 font-bold text-lg text-gray-800">•</span>
                    <div className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: formattedLine }} />
                  </div>
                )
              }
              
              // Numbers: 1. text
              if (/^\d+\.[\s\t]/.test(formattedLine)) {
                const num = (contentLine.match(/^(\d+)\.[\s\t]+/) || [])[1] || ''
                const textOnly = formattedLine.replace(/^\d+\.[\s\t]+/, '')
                return (
                  <div key={contentIndex} className="bullet-item relative pl-12">
                    <span className="absolute left-8 top-0 text-gray-700 font-normal">{num}.</span>
                    <div className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: textOnly }} />
                  </div>
                )
              }
              
              // Indented text (4 spaces)
              if (formattedLine.startsWith('    ')) {
                formattedLine = formattedLine.replace(/^    /, '')
                return (
                  <div key={contentIndex} className="mb-4 ml-6 pl-4 border-l-2 border-gray-200">
                    <span className="leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: formattedLine }} />
                  </div>
                )
              }
              
              return (
                <div key={contentIndex} className="mb-4">
                  <span className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: formattedLine }} />
                </div>
              )
            }
            
            return null
          }).filter(Boolean)

          return (
            <div key={index} className="callout-block">
              {processedCalloutContent}
            </div>
          )
        }
      }

      // Check for note block opening
      if (line.includes('<div class="note-block">')) {
        const closingDivIndex = lines.findIndex((l, i) => i > index && l.trim() === '</div>')
        if (closingDivIndex > index) {
          const noteContentLines = lines.slice(index + 1, closingDivIndex)
          const processedNoteContent = noteContentLines.map((contentLine, contentIndex) => {
            if (contentLine.trim()) {
              let formattedLine = contentLine
              formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em>$1</em>')
              formattedLine = formattedLine.replace(/__(.*?)__/g, '<u>$1</u>')
              return (
                <div key={contentIndex} className="mb-1 text-gray-600">
                  <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
                </div>
              )
            }
            return null
          }).filter(Boolean)
          return (
            <div key={index} className="note-block">
              {processedNoteContent}
            </div>
          )
        }
      }

      // Check for sign-off block opening
      if (line.includes('<div class="sign-off-block">')) {
        // Find the closing div and extract content
        const closingDivIndex = lines.findIndex((l, i) => i > index && l.trim() === '</div>')
        if (closingDivIndex > index) {
          const signOffContentLines = lines.slice(index + 1, closingDivIndex)
          
          // Process sign-off content with tight spacing
          const processedSignOffContent = signOffContentLines.map((contentLine, contentIndex) => {
            // Regular text with formatting
            if (contentLine.trim()) {
              let formattedLine = contentLine
              formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em>$1</em>')
              formattedLine = formattedLine.replace(/__(.*?)__/g, '<u>$1</u>')
              
              return (
                <div key={contentIndex} className="mb-0">
                  {contentLine.includes('LinkedIn:') ? (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <a 
                        href={(() => {
                          const url = contentLine.replace(/^LinkedIn:\s*/, '')
                          return url.startsWith('http') ? url : `https://${url}`
                        })()}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        LinkedIn
                      </a>
                    </div>
                  ) : contentLine.includes('@') ? (
                    <a 
                      href={`mailto:${contentLine}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {contentLine}
                    </a>
                  ) : (
                    <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: formattedLine }} />
                  )}
                </div>
              )
            }
            
            return null
          }).filter(Boolean)

          return (
            <div key={index} className="sign-off-block">
              {processedSignOffContent}
            </div>
          )
        }
      }

      // Skip callout block content lines (they're handled above)
      if (index > 0) {
        // Check if we're inside a callout block
        let insideCallout = false
        for (let i = index - 1; i >= 0; i--) {
          if (lines[i].includes('<div class="callout-block">')) {
            insideCallout = true
            break
          } else if (lines[i].trim() === '</div>') {
            break
          }
        }
        
        if (insideCallout) {
          const closingDivIndex = lines.findIndex((l, i) => i >= index && l.trim() === '</div>')
          if (closingDivIndex >= index) {
            return null
          }
        }
      }

      // Skip note block content lines (they're handled above)
      if (index > 0) {
        let insideNote = false
        for (let i = index - 1; i >= 0; i--) {
          if (lines[i].includes('<div class="note-block">')) {
            insideNote = true
            break
          } else if (lines[i].trim() === '</div>') {
            break
          }
        }
        if (insideNote) {
          const closingDivIndex = lines.findIndex((l, i) => i >= index && l.trim() === '</div>')
          if (closingDivIndex >= index) {
            return null
          }
        }
      }

      // Skip sign-off block content lines (they're handled above)
      if (index > 0) {
        // Check if we're inside a sign-off block
        let insideSignOff = false
        for (let i = index - 1; i >= 0; i--) {
          if (lines[i].includes('<div class="sign-off-block">')) {
            insideSignOff = true
            break
          } else if (lines[i].trim() === '</div>') {
            break
          }
        }
        
        if (insideSignOff) {
          const closingDivIndex = lines.findIndex((l, i) => i >= index && l.trim() === '</div>')
          if (closingDivIndex >= index) {
            return null
          }
        }
      }

      // Skip alignment div closing tags
      if (line.trim() === '</div>') {
        return null
      }

      // Regular text line with formatting
      if (line.trim()) {
        // Process markdown formatting
        let formattedLine = line
        
        // Bold: **text**
        formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        
        // Italic: *text*
        formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em>$1</em>')
        
        // Underline: __text__
        formattedLine = formattedLine.replace(/__(.*?)__/g, '<u>$1</u>')
        
        // Bullets: • text (with space, tab, or other whitespace)
        if (formattedLine.match(/^•[\s\t]/)) {
          formattedLine = formattedLine.replace(/^•[\s\t]+/, '')
          return (
            <div key={index} className="bullet-item relative pl-12">
              <span className="absolute left-8 top-0 font-bold text-lg text-gray-800">•</span>
              <div className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: formattedLine }} />
            </div>
          )
        }
        
                 // Numbers: 1. text
         if (/^\d+\.[\s\t]/.test(formattedLine)) {
           const num = (line.match(/^(\d+)\.[\s\t]+/) || [])[1] || ''
           const textOnly = formattedLine.replace(/^\d+\.[\s\t]+/, '')
           return (
             <div key={index} className="bullet-item relative pl-12">
               <span className="absolute left-8 top-0 text-gray-700 font-normal">{num}.</span>
               <div className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: textOnly }} />
             </div>
           )
         }
        
        // Skip alignment div opening tags (they're handled by the media alignment logic above)
        if (formattedLine.trim().startsWith('<div class="text-') || formattedLine.trim().startsWith('<div class="flex')) {
          return null
        }
        
        // Indented text (4 spaces)
        if (formattedLine.startsWith('    ')) {
          formattedLine = formattedLine.replace(/^    /, '')
          return (
            <div key={index} className="mb-4 ml-6 pl-4 border-l-2 border-gray-200">
              <span className="leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: formattedLine }} />
            </div>
          )
        }
        
        return (
          <div key={index} className="mb-4">
            <span className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: formattedLine }} />
          </div>
        )
      }
      
      return null
    })

    return <div className="font-inter space-y-5 leading-relaxed markdown-body editor-content">{renderedLines.filter(Boolean)}</div>
  }
  const [thesisData, setThesisData] = useState<ThesisData>(fallbackThesisData)
  const [loading, setLoading] = useState(true)
  const [showSectionsSheet, setShowSectionsSheet] = useState(false)
  const [showAuthorsSheet, setShowAuthorsSheet] = useState(false)

  // New: authors state
  const [authors, setAuthors] = useState<Author[]>([])
  const [authorsLoading, setAuthorsLoading] = useState(false)

  // PDF mapping function
  const getPdfLink = (thesisId: string) => {
    const pdfMap: { [key: string]: string } = {
      "long-term-care": "/Industry Thesis - Long Term Care.pdf",
      "build-thesis-long-term-care-test": "/Industry Thesis - Long Term Care.pdf",
      "invitro-investment-build-process": "/IVC -- Investment & Build Thesis.pdf",
      "invitro-private-markets-whitepaper": "/PrivateMarketsWhitePaper.pdf",
      "healthcare-elearning-thesis": "/Industry Thesis - Healthcare E-Learning.pdf",
      "healthcare-prescription-dtc-thesis": "/Industry Thesis - DTC Prescription Healthcare.pdf",
      "a-comparative-analysis-of-private-company-ownership-models": "/PrivateMarketsWhitePaper.pdf"
    }
    return pdfMap[thesisId] || "#"
  }

  // Fetch thesis data from API
  useEffect(() => {
    const fetchThesisData = async () => {
      try {
        const response = await fetch('/api/thesis')
        if (response.ok) {
          const data = await response.json()
          setThesisData(data)
        }
      } catch (error) {
        console.error('Failed to fetch thesis data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchThesisData()
    
    // Set up periodic refresh to catch updates
    const interval = setInterval(fetchThesisData, 5000) // Refresh every 5 seconds
    
    return () => clearInterval(interval)
  }, [])

  const decodedDealId = decodeURIComponent(dealId)
  const thesis = thesisData[decodedDealId] || thesisData.allrx

  // New: fetch authors for this thesis
  useEffect(() => {
    const fetchAuthors = async () => {
      if (!decodedDealId) return
      setAuthorsLoading(true)
      try {
        const res = await fetch(`/api/thesis-authors?thesisId=${encodeURIComponent(decodedDealId)}`)
        if (res.ok) {
          const data = await res.json()
          setAuthors(Array.isArray(data) ? data : [])
        } else {
          console.error('Failed to fetch thesis authors:', await res.text())
          setAuthors([])
        }
      } catch (e) {
        console.error('Failed to fetch thesis authors:', e)
        setAuthors([])
      } finally {
        setAuthorsLoading(false)
      }
    }
    fetchAuthors()
  }, [decodedDealId])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading thesis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 w-full shadow-sm">
        <div className="flex items-center justify-between h-20 px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/')}
          className="rounded-full p-3 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]"
          aria-label="Back"
        >
          <ArrowLeft className="w-7 h-7" />
        </Button>
        <div className="flex-1 flex justify-center">
          <Image
            src="/logo.png"
            alt="InVitro Capital Logo"
            width={180}
            height={48}
            className="h-16 w-auto"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-3 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]"
          asChild
          aria-label="Download PDF"
        >
          <a
            href={getPdfLink(dealId)}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="w-7 h-7" />
          </a>
                </Button>
        </div>

      </div>
 
      {/* Mobile tools bar under header */}
      <div className="min-[1400px]:hidden sticky top-20 z-20 bg-[hsl(212,74%,97%)] border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-10">
            <button
              onClick={()=>setShowSectionsSheet(true)}
              className="flex items-center gap-2 text-[hsl(212,74%,15%)] text-sm font-semibold cursor-pointer px-2 py-1.5 rounded hover:bg-[hsl(212,74%,94%)]"
            >
              Jump to Section
            </button>
            <button
              onClick={()=>setShowAuthorsSheet(true)}
              className="flex items-center gap-2 text-[hsl(212,74%,15%)] text-sm font-semibold cursor-pointer px-2 py-1.5 rounded hover:bg-[hsl(212,74%,94%)]"
            >
              <span>Authors</span>
              <div className="flex items-center gap-1">
                {authors.slice(0,3).map((author, idx)=> (
                  <img
                    key={author.id || idx}
                    src={(author.photoUrl && author.photoUrl.startsWith('http')) ? author.photoUrl : '/logo.png'}
                    alt={author.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-200"
                    onError={(e)=> { if (!e.currentTarget.src.endsWith('/logo.png')) e.currentTarget.src = '/logo.png' }}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sidebar - Only on large screens */}
      <div className="hidden min-[1400px]:block fixed top-24 left-4 bg-gray-50 shadow-none rounded-md border border-gray-200/80 p-3 z-20" style={{width: '240px'}}>
        <h3 className="text-sm font-semibold text-[hsl(212,74%,15%)] mb-3 pb-2 border-b border-gray-200">Jump to Section</h3>
        <nav className="space-y-1">
          {thesis.content && Object.keys(thesis.content)
            .filter((sectionKey) => {
              const metadataKeys = ['featured', 'category']
              return !metadataKeys.includes(sectionKey)
            })
            .map((sectionKey) => {
              const sectionData = (thesis.content as Record<string, unknown>)[sectionKey]
              const sectionTitle = typeof sectionData === 'object' && (sectionData as any).title ? (sectionData as any).title : sectionKey
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
                 romanMatch[1] === 'X' ? 10 : 999) : 999
              return { sectionKey, sectionTitle, position }
            })
            .sort((a, b) => a.position - b.position)
            .map(({ sectionKey, sectionTitle }) => (
              <a
                key={sectionKey}
                href={`#${sectionKey}`}
                className="block text-sm text-gray-700 hover:text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)] px-3 py-2 rounded-md transition-colors duration-200 border-l-2 border-transparent hover:border-[hsl(212,74%,15%)]"
              >
                {sectionTitle}
              </a>
            ))}
        </nav>
      </div>

      {/* Authors Sidebar - Only on large screens */}
      <div className="hidden min-[1400px]:block fixed top-24 right-4 bg-gray-50 shadow-none rounded-md border border-gray-200/80 p-3 z-20" style={{width: '240px'}}>
        <h3 className="text-sm font-semibold text-[hsl(212,74%,15%)] mb-3 pb-2 border-b border-gray-200">Authors</h3>
        {authorsLoading ? null : authors && authors.length > 0 ? (
          <div className="divide-y divide-gray-200/70">
            {authors.map((author, idx) => (
              author.linkedin ? (
                <a key={author.id || idx} href={(author.linkedin.startsWith('http') ? author.linkedin : `https://${author.linkedin}`)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 cursor-pointer hover:bg-white/60 rounded px-2">
                  <img
                  src={(author.photoUrl && author.photoUrl.startsWith('http')) ? author.photoUrl : "/logo.png"}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-200"
                  onError={(e) => { if (!e.currentTarget.src.endsWith('/logo.png')) e.currentTarget.src = '/logo.png' }}
                />
                                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{author.name}</div>
                    <div className="text-xs text-gray-600 whitespace-normal">{author.title}</div>
                    {author.company && author.company.trim() && (
                      <div className="text-xs text-gray-500 whitespace-normal">{author.company.trim()}</div>
                    )}
                  </div>
                </a>
              ) : (
                <div key={author.id || idx} className="flex items-center gap-3 py-3">
                  <img
                    src={author.photoUrl || "/logo.png"}
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-200"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{author.name}</div>
                    <div className="text-xs text-gray-600 whitespace-normal">{author.title}</div>
                    {author.company && author.company.trim() && (
                      <div className="text-xs text-gray-500 whitespace-normal">{author.company.trim()}</div>
                    )}
                  </div>
                </div>
              )
              ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">No authors specified.</div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Mobile Sections Sheet */}
        {showSectionsSheet && (
          <div className="fixed inset-0 z-40 xl:hidden" onClick={()=>setShowSectionsSheet(false)}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-800">Jump to Section</h4>
                <button className="text-sm text-gray-600" onClick={()=>setShowSectionsSheet(false)}>Close</button>
              </div>
              <nav className="space-y-1">
                {thesis.content && Object.keys(thesis.content)
                  .filter((sectionKey) => !['featured','category'].includes(sectionKey))
                  .map((sectionKey)=> {
                    const sectionData = (thesis.content as Record<string, unknown>)[sectionKey]
                    const sectionTitle = typeof sectionData === 'object' && (sectionData as any).title ? (sectionData as any).title : sectionKey
                    const romanMatch = sectionTitle.match(/^([IVX]+)\./)
                    const position = romanMatch ? ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV'].indexOf(romanMatch[1]) + 1 : 999
                    return { sectionKey, sectionTitle, position }
                  })
                  .sort((a,b)=> a.position - b.position)
                  .map(({sectionKey, sectionTitle})=> (
                    <a key={sectionKey} href={`#${sectionKey}`} onClick={()=>setShowSectionsSheet(false)} className="block text-sm text-gray-700 px-2 py-2 rounded hover:bg-gray-50">{sectionTitle}</a>
                  ))}
              </nav>
            </div>
          </div>
        )}

        {/* Mobile Authors Sheet */}
        {showAuthorsSheet && (
          <div className="fixed inset-0 z-40 xl:hidden" onClick={()=>setShowAuthorsSheet(false)}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-800">Authors</h4>
                <button className="text-sm text-gray-600" onClick={()=>setShowAuthorsSheet(false)}>Close</button>
              </div>
              <div className="divide-y divide-gray-200/70">
                {authors.map((author, idx)=> (
                  author.linkedin ? (
                    <a
                      key={author.id || idx}
                      href={(author.linkedin && author.linkedin.startsWith('http')) ? author.linkedin : `https://${author.linkedin || ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 rounded"
                    >
                      <img src={(author.photoUrl && author.photoUrl.startsWith('http')) ? author.photoUrl : '/logo.png'} alt={author.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900">{author.name}</div>
                        <div className="text-xs text-gray-600 whitespace-normal">{author.title}</div>
                        {author.company && author.company.trim() && (
                          <div className="text-xs text-gray-500 whitespace-normal">{author.company.trim()}</div>
                        )}
                      </div>
                    </a>
                  ) : (
                    <div key={author.id || idx} className="flex items-center gap-3 py-3">
                      <img src={(author.photoUrl && author.photoUrl.startsWith('http')) ? author.photoUrl : '/logo.png'} alt={author.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900">{author.name}</div>
                        <div className="text-xs text-gray-600 whitespace-normal">{author.title}</div>
                        {author.company && author.company.trim() && (
                          <div className="text-xs text-gray-500 whitespace-normal">{author.company.trim()}</div>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        )}


        <div className="text-left mb-16">
          <h1 className="font-inter text-3xl font-semibold text-gray-900 mb-16 leading-tight">{thesis.title}</h1>
          {thesis.subtitle && (
            <p className="font-inter text-lg text-gray-600 leading-relaxed">{thesis.subtitle}</p>
          )}
        </div>


        {thesis.content ? (
          <div className="space-y-16">
            {/* Render all sections in order by Roman numeral */}
            {(() => {
              // Get all sections and sort them by Roman numeral
              const allSections = thesis.content && Object.keys(thesis.content)
                .map((sectionKey) => {
                  const sectionData = (thesis.content as Record<string, unknown>)[sectionKey]
                  const sectionTitle = typeof sectionData === 'object' && sectionData && (sectionData as Record<string, unknown>).title ? (sectionData as Record<string, unknown>).title as string : sectionKey
                  
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
                  
                  return { sectionKey, sectionData, position }
                })
                .sort((a, b) => a.position - b.position)
                .map(({ sectionKey, sectionData }) => {
                  if (!sectionData || typeof sectionData !== 'object') return null
                  
                  // Handle different section types
                  if (sectionKey === 'structuralObservations') {
                    return (
                      <section key={sectionKey} id={sectionKey}>
                        <h2 className="text-2xl font-semibold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                          {(sectionData as any).title}
                        </h2>
                        <div className="space-y-4">
                          {(sectionData as any).observations?.map((obs: { title: string; content: string }, index: number) => (
                            <div
                              key={index}
                              className={`p-6 rounded-lg border-l-4 ${
                                index % 2 === 0
                                  ? 'bg-gray-50 border-accent/80'
                                  : 'bg-gray-100 border-accent'
                              }`}
                            >
                              <h3 className="text-lg font-semibold text-foreground mb-3">{obs.title}</h3>
                              <p className="text-muted-foreground leading-relaxed text-base">{obs.content}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )
                  } else if (sectionKey === 'fundingSignals') {
                    return (
                      <section key={sectionKey}>
                        <h2 className="text-2xl font-semibold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                          {(sectionData as any).title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-base mb-8">{(sectionData as any).intro}</p>

                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-green-700 mb-4">The wins are clear:</h3>
                          <ul className="space-y-3">
                            {(sectionData as any).wins?.map((win: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                                <span className="text-muted-foreground text-base">{win}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-red-700 mb-4">Others didn&apos;t convert:</h3>
                          <ul className="space-y-3">
                            {(sectionData as any).failures?.map((failure: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                                <span className="text-muted-foreground text-base">{failure}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-gray-100 p-6 rounded-lg">
                          <p className="text-accent-foreground leading-relaxed text-base">{(sectionData as any).conclusion}</p>
                        </div>
                      </section>
                    )
                  } else if (sectionKey === 'workflowFit') {
                    return (
                      <section key={sectionKey}>
                        <h2 className="text-2xl font-semibold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                          {(sectionData as any).title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-base mb-8">{(sectionData as any).intro}</p>

                        <div className="overflow-x-auto mb-8">
                          <table className="w-full border-collapse border border-border">
                            <thead>
                              <tr className="bg-muted">
                                <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                                  Workflow
                                </th>
                                <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                                  Segment Fit
                                </th>
                                <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                                  Product Fit
                                </th>
                                <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                                  Why It Works / Doesn&apos;t
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {(sectionData as any).table?.map((row: { workflow: string; segmentFit: string; productFit: string; reason: string }, index: number) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                  <td className="border border-border px-4 py-3 font-medium text-foreground text-base">{row.workflow}</td>
                                  <td className="border border-border px-4 py-3 text-muted-foreground text-base">{row.segmentFit}</td>
                                  <td className="border border-border px-4 py-3">
                                    <span
                                      className={`px-2 py-1 rounded text-sm font-medium ${
                                        row.productFit === "High"
                                          ? "bg-green-100 text-green-800"
                                          : row.productFit === "Moderate"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : row.productFit === "Mixed"
                                              ? "bg-orange-100 text-orange-800"
                                              : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {row.productFit}
                                    </span>
                                  </td>
                                  <td className="border border-border px-4 py-3 text-muted-foreground text-base">{row.reason}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="bg-gray-100 p-6 rounded-lg">
                          <p className="text-accent-foreground leading-relaxed text-base">{(sectionData as any).conclusion}</p>
                        </div>
                      </section>
                    )
                  } else if (sectionKey === 'productStrategy') {
                    return (
                      <section key={sectionKey}>
                        <h2 className="text-2xl font-semibold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                          {(sectionData as Record<string, unknown>).title as string}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-base mb-8">{(sectionData as Record<string, unknown>).intro as string}</p>

                        <div className="overflow-x-auto mb-8">
                          <table className="w-full border-collapse border border-border">
                            <thead>
                              <tr className="bg-muted">
                                <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                                  Starting Point
                                </th>
                                <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                                  Expansion Path
                                </th>
                                <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                                  Conditions for Success
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {(sectionData as any).table?.map((row: { startingPoint: string; expansionPath: string; conditions: string }, index: number) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                  <td className="border border-border px-4 py-3 font-medium text-foreground text-base">
                                    {row.startingPoint}
                                  </td>
                                  <td className="border border-border px-4 py-3 text-muted-foreground text-base">{row.expansionPath}</td>
                                  <td className="border border-border px-4 py-3 text-muted-foreground text-base">{row.conditions}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-red-700 mb-4">What Not to Do:</h3>
                          <ul className="space-y-3">
                            {(sectionData as any).whatNotToDo?.map((item: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                                <span className="text-muted-foreground text-base">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </section>
                    )
                  } else if (sectionKey === 'segmentStrategy') {
                    return (
                      <section key={sectionKey}>
                        <h2 className="text-2xl font-semibold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                          {(sectionData as any).title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-base mb-6">{(sectionData as any).intro}</p>

                        <div className="space-y-2">
                          {(sectionData as any).segments?.map((segment: { name: string; description: string }, index: number) => (
                            <div key={index} className="bg-gray-50 border border-accent/20 rounded-lg px-4 py-2">
                              <h3 className="text-base font-semibold text-foreground mb-1">{segment.name}</h3>
                              <p className="text-muted-foreground text-base leading-relaxed mb-0">{segment.description}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )
                  } else if (sectionKey === 'salesRealities') {
                    return (
                      <section key={sectionKey}>
                        <h2 className="text-2xl font-semibold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                          {(sectionData as any).title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-base mb-6">{(sectionData as any).intro}</p>

                        <ul className="list-disc pl-6 space-y-2 mb-8">
                          {(sectionData as any).keyPoints?.map((point: string, index: number) => (
                            <li key={index} className="text-muted-foreground text-base leading-relaxed">
                              {point}
                            </li>
                          ))}
                        </ul>

                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-foreground mb-4">Sales timelines vary by segment:</h3>
                          <div className="space-y-2">
                            {(sectionData as any).timelines?.map((timeline: { segment: string; timeline: string; note: string }, index: number) => (
                              <div key={index} className="flex items-start bg-gray-50 border border-accent/20 rounded-lg px-4 py-2">
                                <div className="flex-1 font-medium text-foreground text-base">
                                  {timeline.segment}
                                  <div className="text-sm text-muted-foreground mt-1">{timeline.note}</div>
                                </div>
                                <div className="ml-4 font-bold text-accent text-base whitespace-nowrap flex items-center">{timeline.timeline}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-foreground mb-4">Key buyer personas across segments:</h3>
                          <div className="space-y-2">
                            {(sectionData as any).buyerPersonas?.map((persona: { title: string; description: string }, index: number) => (
                              <div key={index} className="bg-gray-50 border border-accent/20 rounded-lg px-4 py-2">
                                <div className="font-semibold text-foreground text-base">{persona.title}</div>
                                <div className="text-sm text-muted-foreground mb-1">{persona.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-100 p-6 rounded-lg">
                          <p className="text-accent-foreground leading-relaxed text-base">{(sectionData as any).conclusion}</p>
                        </div>
                      </section>
                    )
                  } else if (sectionKey === 'conclusion') {
                    return (
                      <section key={sectionKey}>
                        <h2 className="text-2xl font-semibold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                          {(sectionData as any).title || 'IX. Conclusion'}
                        </h2>
                        <div className="conclusion-block">
                          <div className="text-muted-foreground leading-relaxed text-base">
                            {renderContent((sectionData as any).content)}
                          </div>
                        </div>
                      </section>
                    )
                  } else if (sectionKey === 'contact' && thesis.contact) {
                    return (
                      <section key={sectionKey}>
                        <h2 className="text-2xl font-semibold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                          {(sectionData as any).title || 'III. Contact'}
                        </h2>
                        <div className="contact-block">
                          {typeof thesis.contact === 'object' ? (
                            // Handle old structured format
                            <div className="text-gray-700">
                              <div className="font-medium" dangerouslySetInnerHTML={{ __html: thesis.contact.name.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/__(.*?)__/g, '<u>$1</u>') }} />
                              <div dangerouslySetInnerHTML={{ __html: thesis.contact.title.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/__(.*?)__/g, '<u>$1</u>') }} />
                              <div dangerouslySetInnerHTML={{ __html: thesis.contact.company.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/__(.*?)__/g, '<u>$1</u>') }} />
                              <div className="text-blue-600" dangerouslySetInnerHTML={{ __html: thesis.contact.email.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/__(.*?)__/g, '<u>$1</u>') }} />
                            </div>
                          ) : (
                            // Handle new raw text format - custom rendering for contact with tight spacing
                            <div className="text-gray-700">
                              {thesis.contact.split('\n').map((line, index) => (
                                <div key={index} className="mb-1">
                                  <span dangerouslySetInnerHTML={{ 
                                    __html: line
                                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                      .replace(/__(.*?)__/g, '<u>$1</u>')
                                  }} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </section>
                    )
                  } else if (sectionKey === 'sources' && thesis.sources) {
                    return (
                      <section key={sectionKey}>
                        <h2 className="text-2xl font-semibold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                          {(sectionData as any).title || 'IV. Sources'}
                        </h2>
                        {Array.isArray(thesis.sources) ? (
                          <div className="space-y-2">
                            {thesis.sources.map((source: string, index: number) => (
                              <p key={index} className="text-sm text-muted-foreground">
                                {source}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <div className="text-muted-foreground leading-relaxed text-base">
                            {renderContent(thesis.sources)}
                          </div>
                        )}
                      </section>
                    )
                  } else {
                    // Handle any other sections (including new ones created via admin panel)
                    // This is a catch-all for sections that don't match specific patterns
                    if (sectionData && typeof sectionData === 'object' && (sectionData as any).content) {
                      return (
                        <section key={sectionKey} id={sectionKey}>
                          <h2 className="text-2xl font-semibold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                            {(sectionData as any).title || sectionKey}
                          </h2>
                          <div className="text-muted-foreground leading-relaxed text-base">
                            {renderContent((sectionData as any).content)}
                          </div>
                        </section>
                      )
                    }
                  }
                  
                  return null
                })

              return allSections
            })()}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Thesis Not Found</h1>
            <p className="text-muted-foreground">The requested thesis could not be found.</p>
          </div>
        )}
      </div>
    </div>
  )
} 
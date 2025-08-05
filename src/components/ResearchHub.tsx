"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FileText, Building2, Folder, FolderOpen, ChevronRight, ChevronDown, Lightbulb, Star, Calendar, BookOpen, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

interface ResearchPaper {
  id: string
  title: string
  description: string
  subtitle?: string
  category: "build-process" | "whitepapers" | "industry-theses" | "industry-decompositions"
  publishDate: string
  readTime: string
  tags: string[]
  featured?: boolean
  type?: string
}

// All papers are now fetched dynamically from the API
const researchPapers: ResearchPaper[] = []

const categoryConfig: Record<string, {
  title: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  color: string
  iconColor: string
}> = {
  "build-process": {
    title: "InVitro Builder",
    icon: Building2,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
      whitepapers: {
      title: "White Papers",
    icon: FileText,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  "industry-theses": {
    title: "Industry Theses",
    icon: Folder,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
  },
  "industry-decompositions": {
    title: "Industry Decompositions",
    icon: Folder,
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
  },
}

// Accredited investor options
const ACCREDITED_OPTIONS = [
  "I earned over $200,000 individually (or $300,000 with my spouse) in each of the last two years and expect the same this year",
  "I have a net worth over $1 million, excluding my primary residence",
  "I hold a qualifying financial license (Series 7, 65, or 82)",
  "I am a knowledgeable employee of a private investment fund",
  "I represent an entity with over $5 million in assets, or where all equity owners are accredited investors",
  "I am not an accredited investor",
]

const featuredResearch = researchPapers.filter((paper) => paper.featured);

function FeaturedCard({ paper, onPaperClick }: { paper: ResearchPaper; onPaperClick: (paperId: string) => void }) {
  const config = categoryConfig[paper.category] || {
    title: paper.category,
    icon: FileText,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-400",
  };
  const CategoryIcon = config.icon;
  // Fix timezone issue: parse as local date
  const [year, month, day] = paper.publishDate.split("-");
  const localDate = new Date(Number(year), Number(month) - 1, Number(day));
  return (
    <button
      onClick={() => onPaperClick(paper.id)}
      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 p-6 text-left cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${config.color}`}>
          <CategoryIcon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        <Badge variant="secondary" className="text-xs">
          {config.title}
        </Badge>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{paper.title}</h3>
      {paper.description && (
        <div className="text-xs text-gray-500 mb-2 line-clamp-2">{paper.description}</div>
      )}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {localDate.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
        <div className="flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          {paper.readTime}
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-3">
        {paper.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <ExternalLink className="w-4 h-4 text-gray-400 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

export default function ResearchHub() {
  const [showForm, setShowForm] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "" })
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false)
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "build-process": true,
    whitepapers: true,
    "industry-theses": true,
  })
  const [showAccreditedModal, setShowAccreditedModal] = useState(false)
  const [accreditedSelections, setAccreditedSelections] = useState<string[]>([])
  const [isAccredited, setIsAccredited] = useState(false)
  const [dynamicTheses, setDynamicTheses] = useState<ResearchPaper[]>([])
  const [loadingTheses, setLoadingTheses] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedInfo = localStorage.getItem("invitro-user-info")
    if (savedInfo) {
      setHasSubmittedInfo(true)
      setUserInfo(JSON.parse(savedInfo))
    }
    const accredited = localStorage.getItem("invitro-accredited")
    if (accredited === "true") {
      setIsAccredited(true)
    } else {
      setIsAccredited(false)
    }
  }, [])

  // Fetch dynamic theses from API
  useEffect(() => {
    const fetchTheses = async () => {
      try {
        const response = await fetch('/api/thesis')
        const thesisData = await response.json()
        
        const allTheses = Object.entries(thesisData)
          .filter(([id, thesis]: [string, any]) => {
            // Show theses that are marked as live OR don't have a live field (for backward compatibility)
            return thesis.live === true || thesis.live === undefined
          })
          .map(([id, thesis]: [string, any]) => ({
            id,
            title: thesis.title,
            description: thesis.subtitle || thesis.content?.executiveSummary?.content?.substring(0, 100) + "..." || "",
            subtitle: thesis.subtitle,
            category: thesis.category || thesis.content?.category || "industry-theses", // Check both top level and content object
            publishDate: thesis.publishDate || "2025-01-01",
            readTime: thesis.readTime || "10 min read",
            tags: thesis.tags || [],
            featured: thesis.featured || thesis.content?.featured || false, // Updated to check content.featured
            type: thesis.type || 'thesis'
          }))
        
        setDynamicTheses(allTheses)
      } catch (error) {
        console.error('Error fetching theses:', error)
      }
    }

    fetchTheses()
  }, [])

  const handlePaperClick = (paperId: string) => {
    localStorage.setItem("invitro-doc-source", "research");
    setPendingNavigation(paperId)
    setAccreditedSelections([])
    if (!hasSubmittedInfo) {
      setShowForm(true)
    } else if (!isAccredited) {
      setShowAccreditedModal(true)
    } else {
      // Already accredited, go straight to research or thesis
      if (paperId === "invitro-investment-build-process" || paperId === "invitro-private-markets-whitepaper" || paperId === "healthcare-elearning-thesis" || paperId === "healthcare-prescription-dtc-thesis") {
        // These have dedicated research pages
        router.push(`/research/${paperId}`)
      } else if (paperId === "long-term-care" || paperId === "construction-tech" || paperId === "healthcare-e-learning" || paperId === "accounting-services" || paperId === "b2b-sales-marketing-software" || paperId === "dtc-healthcare") {
        // These are decomposition pages
        router.push(`/decomposition/${paperId}`)
      } else {
        // All others go to thesis pages
        router.push(`/thesis/${paperId}`)
      }
      setPendingNavigation(null)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("invitro-user-info", JSON.stringify(userInfo));
    // Send to backend visitor log, including accredited info if available
    let accredited = undefined;
    let accreditedSelections = undefined;
    try {
      const stored = localStorage.getItem("invitro-accredited");
      if (stored) accredited = stored;
      const selections = localStorage.getItem("invitro-accredited-selections");
      if (selections) accreditedSelections = JSON.parse(selections);
    } catch {}
    try {
      await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userInfo, accredited, accreditedSelections }),
      });
    } catch (err) {
      // Ignore error for now
    }
    setHasSubmittedInfo(true);
    setShowForm(false);
    // Check if accredited (localStorage value or state)
    const isAccreditedNow = (typeof window !== 'undefined' && localStorage.getItem('invitro-accredited') === 'true') || isAccredited;
    if (pendingNavigation) {
      if (isAccreditedNow) {
        // Use the same routing logic as handlePaperClick
        if (pendingNavigation === "invitro-investment-build-process" || pendingNavigation === "invitro-private-markets-whitepaper" || pendingNavigation === "healthcare-elearning-thesis" || pendingNavigation === "healthcare-prescription-dtc-thesis") {
          router.push(`/research/${pendingNavigation}`)
        } else if (pendingNavigation === "long-term-care" || pendingNavigation === "construction-tech" || pendingNavigation === "healthcare-e-learning" || pendingNavigation === "accounting-services" || pendingNavigation === "b2b-sales-marketing-software" || pendingNavigation === "dtc-healthcare") {
          router.push(`/decomposition/${pendingNavigation}`)
        } else {
          router.push(`/thesis/${pendingNavigation}`)
        }
        setPendingNavigation(null);
      } else {
        setShowAccreditedModal(true);
      }
    }
  }

  const handleAccreditedSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (anyAboveSelected && !lastSelected) {
      localStorage.setItem("invitro-accredited", "true")
      localStorage.setItem("invitro-accredited-selections", JSON.stringify(accreditedSelections))
      setIsAccredited(true)
      setShowAccreditedModal(false)
      setAccreditedSelections([])
      // Send updated info to backend visitor log
      try {
        const userInfo = JSON.parse(localStorage.getItem("invitro-user-info") || '{}');
        await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...userInfo, accredited: "true", accreditedSelections }),
        });
      } catch {}
      // Use the same routing logic as handlePaperClick
      if (pendingNavigation === "invitro-investment-build-process" || pendingNavigation === "invitro-private-markets-whitepaper" || pendingNavigation === "healthcare-elearning-thesis" || pendingNavigation === "healthcare-prescription-dtc-thesis") {
        router.push(`/research/${pendingNavigation}`)
      } else if (pendingNavigation === "long-term-care" || pendingNavigation === "construction-tech" || pendingNavigation === "healthcare-e-learning" || pendingNavigation === "accounting-services" || pendingNavigation === "b2b-sales-marketing-software" || pendingNavigation === "dtc-healthcare") {
        router.push(`/decomposition/${pendingNavigation}`)
      } else {
        router.push(`/thesis/${pendingNavigation}`)
      }
      setPendingNavigation(null)
    }
  }

  // For use in render
  const lastSelected = accreditedSelections.includes(ACCREDITED_OPTIONS[ACCREDITED_OPTIONS.length - 1])
  const anyAboveSelected = accreditedSelections.some((s) => ACCREDITED_OPTIONS.indexOf(s) < ACCREDITED_OPTIONS.length - 1)
  const visibleOptions = lastSelected
    ? [ACCREDITED_OPTIONS[ACCREDITED_OPTIONS.length - 1]]
    : ACCREDITED_OPTIONS;

  const toggleFolder = (category: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  // Organize all papers by category
  const sortedPapers = dynamicTheses.reduce((acc, paper) => {
    if (!acc[paper.category]) acc[paper.category] = [];
    acc[paper.category].push(paper);
    return acc;
  }, {} as Record<string, ResearchPaper[]>);
  Object.keys(sortedPapers).forEach(cat => {
    sortedPapers[cat].sort((a, b) => a.title.localeCompare(b.title));
  });

  const buildProcessPapers = sortedPapers["build-process"] || []
  const whitepapers = sortedPapers["whitepapers"] || []
  const industryTheses = sortedPapers["industry-theses"] || []
  
  // Featured research from dynamic sources - sorted by publish date (newest first)
  const featuredResearch = dynamicTheses
    .filter((thesis: ResearchPaper) => thesis.featured)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  // Separate theses and decompositions for different handling
  const theses = dynamicTheses.filter((thesis: ResearchPaper) => thesis.type !== 'decomposition')
  const decompositions = dynamicTheses.filter((thesis: ResearchPaper) => thesis.type === 'decomposition')

  // Fallback to hardcoded decompositions if database is empty
  const hardcodedDecompositions: ResearchPaper[] = [
    {
      id: 'long-term-care',
      title: 'Long Term Care Industry Decomposition',
      description: 'Comprehensive analysis of the Long Term Care industry, including market size, key players, and investment opportunities.',
      category: 'industry-decompositions',
      publishDate: '2025-01-15',
      readTime: '15 min read',
      tags: ['Long Term Care', 'Healthcare', 'Industry Analysis', 'Decomposition'],
      type: 'decomposition'
    },
    {
      id: 'construction-tech',
      title: 'Construction Technology Industry Decomposition',
      description: 'Deep dive into construction technology workflows, market opportunities, and investment thesis.',
      category: 'industry-decompositions',
      publishDate: '2024-06-01',
      readTime: '20 min read',
      tags: ['Construction Tech', 'Industry Analysis', 'Decomposition'],
      type: 'decomposition'
    },
    {
      id: 'healthcare-e-learning',
      title: 'Healthcare E-Learning Industry Decomposition',
      description: 'Analysis of healthcare education technology market and opportunities.',
      category: 'industry-decompositions',
      publishDate: '2024-06-09',
      readTime: '12 min read',
      tags: ['Healthcare', 'E-Learning', 'Industry Analysis', 'Decomposition'],
      type: 'decomposition'
    },
    {
      id: 'accounting-services',
      title: 'Accounting Services Industry Decomposition',
      description: 'Comprehensive analysis of accounting services industry and automation opportunities.',
      category: 'industry-decompositions',
      publishDate: '2024-12-01',
      readTime: '10 min read',
      tags: ['Accounting Services', 'Industry Analysis', 'Decomposition'],
      type: 'decomposition'
    },
    {
      id: 'b2b-sales-marketing-software',
      title: 'B2B Sales & Marketing Technology Decomposition',
      description: 'Analysis of B2B sales and marketing technology landscape and opportunities.',
      category: 'industry-decompositions',
      publishDate: '2024-12-01',
      readTime: '18 min read',
      tags: ['B2B Sales', 'Marketing Software', 'Industry Analysis', 'Decomposition'],
      type: 'decomposition'
    },
    {
      id: 'dtc-healthcare',
      title: 'DTC Healthcare Industry Decomposition',
      description: 'Direct-to-consumer healthcare market analysis and investment opportunities.',
      category: 'industry-decompositions',
      publishDate: '2024-12-01',
      readTime: '14 min read',
      tags: ['DTC Healthcare', 'Industry Analysis', 'Decomposition'],
      type: 'decomposition'
    }
  ];

  // Use database decompositions if available, otherwise fall back to hardcoded ones
  const industryDecompositionsSorted = decompositions.length > 0 
    ? decompositions.sort((a, b) => a.title.localeCompare(b.title))
    : hardcodedDecompositions.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="space-y-8">
      {/* InVitro's Research Philosophy Box */}
      <div className="bg-white border border-gray-200 rounded-lg px-4 sm:px-6 py-6 sm:py-8 md:py-12 shadow-lg w-full text-left mt-1 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
          <h2 className="font-bold text-xl sm:text-2xl text-[#0a2e4e]">InVitro&apos;s Research Philosophy</h2>
        </div>
        <div className="text-sm sm:text-base font-semibold mb-4 sm:mb-6 text-left" style={{color: '#0a2e4e'}}>
          Demand-First • Workflow-Deep • Segment-Precise
        </div>
        <p className="text-sm sm:text-base text-gray-800 leading-relaxed text-left mb-1" style={{wordBreak: 'break-word'}}>
          InVitro doesn&apos;t start with ideas—we start with pain. Our research maps labor-intensive, fragmented, and tech-starved industries from first principles, deconstructs workflows, and tests for urgency before anything gets built. We prioritize segments where software is absent, human effort is high, and willingness to pay is measurable. Every thesis begins with real buyer signal—not speculation. This is where disciplined demand generation meets structural insight.
        </p>
      </div>
      {/* Featured Research Section */}
      {featuredResearch.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <h2 className="text-xl font-semibold text-gray-900">Featured Research</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResearch.map((paper) => (
              <FeaturedCard key={paper.id} paper={paper} onPaperClick={handlePaperClick} />
            ))}
          </div>
        </div>
      )}
      {/* Research Folders Panel */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Research Archive Section (box format, inside folders panel, same size as Featured Research) */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Folder className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-900">Research Archive</h2>
          </div>
        </div>
        {/* InVitro Builder Folder */}
        <FolderSection
          category="build-process"
          papers={buildProcessPapers}
          isExpanded={expandedFolders["build-process"]}
          onToggle={() => toggleFolder("build-process")}
          onPaperClick={handlePaperClick}
        />

        <Separator />

        {/* White Papers Folder */}
        <FolderSection
          category="whitepapers"
          papers={whitepapers}
          isExpanded={expandedFolders["whitepapers"]}
          onToggle={() => toggleFolder("whitepapers")}
          onPaperClick={handlePaperClick}
        />

        <Separator />

        {/* Industry Theses Folder */}
        <FolderSection
          category="industry-theses"
          papers={industryTheses}
          isExpanded={expandedFolders["industry-theses"]}
          onToggle={() => toggleFolder("industry-theses")}
          onPaperClick={handlePaperClick}
        />

        <Separator />

        {/* Industry Decompositions Folder */}
        <FolderSection
          category="industry-decompositions"
          papers={industryDecompositionsSorted}
          isExpanded={expandedFolders["industry-decompositions"] ?? true}
          onToggle={() => toggleFolder("industry-decompositions")}
          onPaperClick={(paperId) => {
            // Route to decomposition pages using the paper ID
            router.push(`/decomposition/${paperId}`);
          }}
          placeholderText="Industry Decomposition research coming soon."
        />
      </div>

      {/* User Info Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Access Research Papers</DialogTitle>
            <DialogDescription>Please provide your information to access our research and analysis.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={userInfo.firstName}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={userInfo.lastName}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Accredited Investor Modal */}
      <Dialog open={showAccreditedModal} onOpenChange={setShowAccreditedModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Access Restricted to Accredited Investors</DialogTitle>
            <DialogDescription>
              We only grant access to our research to accredited investors under U.S. securities law. Please select the option that best describes how you qualify:
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAccreditedSubmit} className="space-y-6 mt-4">
            <div className="space-y-3">
              {visibleOptions.map((option, idx) => (
                <label key={option} className={`flex items-start gap-3 cursor-pointer p-2 rounded-lg transition ${accreditedSelections.includes(option) ? 'bg-blue-50 border border-blue-200' : ''}`}>
                  <input
                    type="checkbox"
                    name="accredited"
                    value={option}
                    checked={accreditedSelections.includes(option)}
                    onChange={() => {
                      if (accreditedSelections.includes(option)) {
                        setAccreditedSelections(accreditedSelections.filter((s) => s !== option))
                      } else {
                        setAccreditedSelections([...accreditedSelections, option])
                      }
                    }}
                    className="mt-1 accent-blue-600"
                  />
                  <span className="text-sm text-gray-800 leading-snug">{option}</span>
                </label>
              ))}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!anyAboveSelected || lastSelected}
            >
              Continue
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function FolderSection({
  category,
  papers,
  isExpanded,
  onToggle,
  onPaperClick,
  placeholderText,
}: {
  category: string
  papers: ResearchPaper[]
  isExpanded: boolean
  onToggle: () => void
  onPaperClick: (paperId: string) => void
  placeholderText?: string
}) {
  const config = categoryConfig[category] || {
    title: category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    icon: Folder,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-400",
  }

  return (
    <div>
      <button
        className="w-full flex items-center px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-gray-50 focus:outline-none"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <span className={`mr-3 sm:mr-4 ${config.iconColor} flex-shrink-0`}>
          {isExpanded ? <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6" /> : <Folder className="w-5 h-5 sm:w-6 sm:h-6" />}
        </span>
        <span className="text-base sm:text-lg font-semibold flex-1 flex items-center gap-2 min-w-0">
          <span className="truncate">{config.title}</span>
          <span className="inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs font-semibold w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
            {papers.length}
          </span>
        </span>
        <span className="ml-2 text-gray-400 flex-shrink-0">
          {isExpanded ? <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />}
        </span>
      </button>
      {isExpanded && (
        <div className={`ml-4 sm:ml-6 px-4 sm:px-8 pb-4 sm:pb-6 border-l-4 ${config.color.split(' ')[1]}`}> 
          {papers.length === 0 ? (
            <div className="text-gray-500 italic py-4">{placeholderText || "No documents available."}</div>
          ) : (
            <ul className="space-y-2">
              {papers.map((paper: ResearchPaper) => (
                <FileItem key={paper.id} paper={paper} onPaperClick={onPaperClick} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

function FileItem({ paper, onPaperClick }: { paper: ResearchPaper; onPaperClick: (paperId: string) => void }) {
  return (
    <li
      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
      onClick={() => onPaperClick(paper.id)}
    >
      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="truncate text-sm sm:text-base font-semibold">
          {paper.title}
        </div>
        {(paper.description || paper.subtitle) && (
        <div className="text-xs text-gray-500 truncate">{paper.description || paper.subtitle}</div>
        )}
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap ml-1 sm:ml-2 flex-shrink-0">{paper.readTime}</span>
    </li>
  )
} 
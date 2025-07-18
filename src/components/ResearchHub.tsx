"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FileText, Calendar, ExternalLink, Building2, BookOpen, Lightbulb, Folder, FolderOpen, ChevronRight, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface ResearchPaper {
  id: string
  title: string
  description: string
  category: "build-process" | "whitepapers" | "industry-theses" | "industry-decompositions"
  publishDate: string
  readTime: string
  tags: string[]
  featured?: boolean
}

const researchPapers: ResearchPaper[] = [
  // InVitro Build Process
  {
    id: "invitro-investment-build-process",
    title: "InVitro Capital Investment & Build Process",
    description:
      "Our comprehensive methodology for identifying, building, and scaling high-growth companies from ideation to exit.",
    category: "build-process",
    publishDate: "2024-01-15",
    readTime: "12 min read",
    tags: ["Investment Process", "Venture Studio", "Company Building"],
  },

  // WhitePapers
  {
    id: "invitro-private-markets-whitepaper",
    title: "InVitro Capital Private Markets White Paper",
    description:
      "In-depth analysis of private market opportunities, trends, and investment strategies across key sectors.",
    category: "whitepapers",
    publishDate: "2024-02-01",
    readTime: "20 min read",
    tags: ["Private Markets", "Investment Strategy", "Market Analysis"],
  },

  // Industry Theses
  {
    id: "healthcare-elearning-thesis",
    title: "Healthcare E-Learning",
    description:
      "Investment thesis on digital education and training platforms transforming healthcare professional development.",
    category: "industry-theses",
    publishDate: "2024-01-01",
    readTime: "16 min read",
    tags: ["Healthcare", "E-Learning", "Digital Education"],
  },
  {
    id: "healthcare-prescription-dtc-thesis",
    title: "Healthcare Prescription DTC",
    description:
      "Analysis of direct-to-consumer prescription and telehealth market opportunities and regulatory landscape.",
    category: "industry-theses",
    publishDate: "2023-11-01",
    readTime: "18 min read",
    tags: ["Healthcare", "DTC", "Telehealth", "Prescription"],
  },
  {
    id: "long-term-care-thesis",
    title: "Long Term Care",
    description:
      "Comprehensive investment thesis on long-term care facilities, technology adoption, and market dynamics.",
    category: "industry-theses",
    publishDate: "2023-10-15",
    readTime: "22 min read",
    tags: ["Long Term Care", "Healthcare", "Assisted Living"],
  },
  {
    id: "b2b-sales-marketing-software-thesis",
    title: "B2B Sales & Marketing Software",
    description:
      "Investment perspective on B2B sales and marketing technology platforms, automation, and growth opportunities.",
    category: "industry-theses",
    publishDate: "2023-08-20",
    readTime: "19 min read",
    tags: ["B2B Software", "Sales", "Marketing", "SaaS"],
  },
]

const categoryConfig: Record<string, {
  title: string
  icon: React.FC<any>
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
    title: "WhitePapers",
    icon: FileText,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  "industry-theses": {
    title: "Industry Theses",
    icon: Lightbulb,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
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
    }
  }, [])

  const handlePaperClick = (paperId: string) => {
    setPendingNavigation(paperId)
    setAccreditedSelections([])
    if (!hasSubmittedInfo) {
      setShowForm(true)
    } else if (!isAccredited) {
      setShowAccreditedModal(true)
    } else {
      // Already accredited, go straight to research
      router.push(`/research/${paperId}`)
      setPendingNavigation(null)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("invitro-user-info", JSON.stringify(userInfo))
    setHasSubmittedInfo(true)
    setShowForm(false)

    if (pendingNavigation) {
      router.push(`/research/${pendingNavigation}`)
      setPendingNavigation(null)
    }
  }

  const handleAccreditedSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (anyAboveSelected && !lastSelected) {
      localStorage.setItem("invitro-accredited", "true")
      setIsAccredited(true)
      setShowAccreditedModal(false)
      setAccreditedSelections([])
      router.push(`/research/${pendingNavigation}`)
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

  const buildProcessPapers = researchPapers.filter((paper) => paper.category === "build-process")
  const whitepapers = researchPapers.filter((paper) => paper.category === "whitepapers")
  const industryTheses = researchPapers.filter((paper) => paper.category === "industry-theses")

  // Add Curenta industry decomposition as a research paper
  const industryDecompositions: ResearchPaper[] = [
    {
      id: "curenta-industry-decomposition",
      title: "Industry Decomposition: Long Term Care",
      description: "Comprehensive workflow and market decomposition for Long Term Care.",
      category: "industry-decompositions",
      publishDate: "2025-01-01",
      readTime: "30 min read",
      tags: ["Long Term Care", "Curenta", "Industry Analysis", "Decomposition"],
      featured: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* InVitro's Research Philosophy Box */}
      <div className="bg-white border border-gray-200 rounded-lg px-0 md:px-10 py-8 md:py-12 shadow-lg w-full text-left mt-1 -ml-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0" />
          <h3 className="font-bold text-2xl text-[#0a2e4e]">InVitro’s Research Philosophy</h3>
        </div>
        <div className="text-base font-semibold mb-6 text-left" style={{color: '#0a2e4e'}}>
          Demand-First • Workflow-Deep • Segment-Precise • Capital-Efficient
        </div>
        <p className="text-base text-gray-800 leading-relaxed text-left mb-1" style={{wordBreak: 'break-word'}}>
          InVitro doesn't start with ideas—we start with pain. Our research maps labor-intensive, fragmented, and tech-starved industries from first principles, deconstructs workflows, and tests for urgency before anything gets built. We prioritize segments where software is absent, human effort is high, and willingness to pay is measurable. Every thesis begins with real buyer signal—not speculation. This is where disciplined demand generation meets structural insight.
        </p>
      </div>
      {/* Research Folders */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* InVitro Builder Folder */}
        <FolderSection
          category="build-process"
          papers={buildProcessPapers}
          isExpanded={expandedFolders["build-process"]}
          onToggle={() => toggleFolder("build-process")}
          onPaperClick={handlePaperClick}
        />

        <Separator />

        {/* WhitePapers Folder */}
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
          papers={industryDecompositions}
          isExpanded={expandedFolders["industry-decompositions"] ?? true}
          onToggle={() => toggleFolder("industry-decompositions")}
          onPaperClick={() => router.push("/decomposition/curenta")}
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
        className="w-full flex items-center px-6 py-4 text-left hover:bg-gray-50 focus:outline-none"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <span className={`mr-4 ${config.iconColor}`}>
          {isExpanded ? <FolderOpen className="w-6 h-6" /> : <Folder className="w-6 h-6" />}
        </span>
        <span className="text-lg font-semibold flex-1 flex items-center gap-2">
          {config.title}
          <span className="inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs font-semibold w-6 h-6">
            {papers.length}
          </span>
        </span>
        <span className="ml-2 text-gray-400">
          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </span>
      </button>
      {isExpanded && (
        <div className={`ml-6 px-8 pb-6 border-l-4 ${config.color.split(' ')[1]}`}> 
          {papers.length === 0 ? (
            <div className="text-gray-500 italic py-4">{placeholderText || "No documents available."}</div>
          ) : (
            <ul className="space-y-2">
              {papers.map((paper) => (
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
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
      onClick={() => onPaperClick(paper.id)}
    >
      <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="truncate text-base font-semibold">
          {paper.title}
        </div>
        <div className="text-xs text-gray-500 truncate">{paper.description}</div>
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{paper.readTime}</span>
    </li>
  )
} 
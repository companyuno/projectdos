"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FileText, Calendar, ExternalLink, Building2, BookOpen, Lightbulb } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface ResearchPaper {
  id: string
  title: string
  description: string
  category: "build-process" | "whitepapers" | "industry-theses"
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

const categoryConfig = {
  "build-process": {
    title: "InVitro Build Process",
    description: "Methodologies and frameworks for building successful ventures",
    icon: Building2,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  whitepapers: {
    title: "WhitePapers",
    description: "In-depth research and analysis on market trends and opportunities",
    icon: FileText,
    color: "bg-green-100 text-green-800 border-green-200",
  },
  "industry-theses": {
    title: "Industry Theses",
    description: "Strategic investment perspectives across key sectors",
    icon: Lightbulb,
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
}

export default function ResearchHub() {
  const [showForm, setShowForm] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "" })
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedInfo = localStorage.getItem("invitro-user-info")
    if (savedInfo) {
      setHasSubmittedInfo(true)
      setUserInfo(JSON.parse(savedInfo))
    }
  }, [])

  const handlePaperClick = (paperId: string) => {
    if (hasSubmittedInfo) {
      router.push(`/research/${paperId}`)
    } else {
      setPendingNavigation(paperId)
      setShowForm(true)
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

  const buildProcessPapers = researchPapers.filter((paper) => paper.category === "build-process")
  const whitepapers = researchPapers.filter((paper) => paper.category === "whitepapers")
  const industryTheses = researchPapers.filter((paper) => paper.category === "industry-theses")

  return (
    <div className="space-y-16">
      {/* InVitro Build Process */}
      <ResearchSection
        title="InVitro Build Process"
        description="Methodologies and frameworks for building successful ventures"
        icon={Building2}
        papers={buildProcessPapers}
        onPaperClick={handlePaperClick}
      />

      {/* WhitePapers */}
      <ResearchSection
        title="WhitePapers"
        description="In-depth research and analysis on market trends and opportunities"
        icon={FileText}
        papers={whitepapers}
        onPaperClick={handlePaperClick}
      />

      {/* Industry Theses */}
      <ResearchSection
        title="Industry Theses"
        description="Strategic investment perspectives across key sectors"
        icon={Lightbulb}
        papers={industryTheses}
        onPaperClick={handlePaperClick}
      />

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
            <Button type="submit" className="w-full cursor-pointer">
              Continue to Research
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ResearchSection({
  title,
  description,
  icon: Icon,
  papers,
  onPaperClick,
}: {
  title: string
  description: string
  icon: any
  papers: ResearchPaper[]
  onPaperClick: (paperId: string) => void
}) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <Icon className="w-8 h-8 text-gray-700" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 text-lg">{description}</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} onPaperClick={onPaperClick} />
        ))}
      </div>
    </section>
  )
}

function PaperCard({ paper, onPaperClick }: { paper: ResearchPaper; onPaperClick: (paperId: string) => void }) {
  const categoryInfo = categoryConfig[paper.category]

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-gray-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <Badge className={`${categoryInfo.color} font-semibold`}>{categoryInfo.title}</Badge>
          <categoryInfo.icon className="w-5 h-5 text-gray-500" />
        </div>
        <CardTitle className="text-lg leading-tight font-bold text-gray-900">{paper.title}</CardTitle>
        <CardDescription className="text-sm text-gray-600">{paper.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(paper.publishDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {paper.readTime}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {paper.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Separator />

        <Button onClick={() => onPaperClick(paper.id)} variant="outline" className="w-full justify-between cursor-pointer">
          Read Paper
          <ExternalLink className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
} 
"use client"

import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ResearchPage() {
  const params = useParams()
  const paperId = params.paperId as string

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Research Hub
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Research Paper</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-card rounded-xl border border-border p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Research Paper: {paperId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h2>
            <p className="text-muted-foreground text-lg">
              This is a placeholder for the research paper content. The actual paper would contain detailed 
              analysis, methodology, findings, and conclusions.
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-foreground mb-3">Abstract</h3>
              <p className="text-muted-foreground leading-relaxed">
                Executive summary of the research findings, methodology, and key insights.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-foreground mb-3">Introduction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Overview of the research topic, objectives, and significance of the study.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-foreground mb-3">Methodology</h3>
              <p className="text-muted-foreground leading-relaxed">
                Detailed description of research methods, data collection, and analysis approach.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-foreground mb-3">Findings</h3>
              <p className="text-muted-foreground leading-relaxed">
                Presentation of research results, data analysis, and key discoveries.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-foreground mb-3">Conclusions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Summary of findings, implications, and recommendations for future research.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
} 
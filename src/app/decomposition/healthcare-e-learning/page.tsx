"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function HealthcareELearningDecomposition() {
  const router = useRouter()

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
          onClick={() => {
            window.open('/Industry Decomposition - Healthcare E-Learning.pdf', '_blank');
          }}
          aria-label="Download PDF"
        >
          <Download className="w-7 h-7" />
        </Button>
      </div>
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Industry Decomposition: Healthcare E-Learning</h1>
        </div>
        <Card>
          <CardContent className="space-y-8">
            <Separator />
            
            {/* Download Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Download Full Report</h3>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <p className="text-blue-800 leading-relaxed">
                  The industry decomposition is available for download as a PDF. Click the button above to access the complete document.
                </p>
              </div>
            </div>

            <Separator />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
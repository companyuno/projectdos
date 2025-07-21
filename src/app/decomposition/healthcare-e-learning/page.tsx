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
    <div className="min-h-screen bg-gray-50 text-foreground">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 mb-8 px-2 py-3 shadow-sm flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-[hsl(212,74%,15%)] text-[hsl(212,74%,15%)] rounded-full px-5 py-2 text-sm font-medium hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)] transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Research
          </Button>
          <div className="flex-1 flex justify-center">
            <Image src="/logo.png" alt="InVitro Capital Logo" width={180} height={48} style={{ objectFit: 'contain' }} />
          </div>
          <Button 
            className="bg-white text-[hsl(212,74%,15%)] border border-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)] ml-4"
            onClick={() => {
              window.open('/Industry Decomposition - Healthcare E-Learning.pdf', '_blank');
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
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
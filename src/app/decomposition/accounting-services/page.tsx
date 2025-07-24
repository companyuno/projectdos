"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function AccountingServicesDecomposition() {
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
            className="h-16 w-auto"
            style={{ objectFit: 'contain' }}
            width={180}
            height={48}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-3 text-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)]"
          onClick={() => {
            window.open('/Industry Decomposition - Accounting Services.pdf', '_blank');
          }}
          aria-label="Download PDF"
        >
          <Download className="w-7 h-7" />
        </Button>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-12">
        {/* Polished, Responsive Sticky Header for Mobile */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 break-words">Industry Decomposition: Accounting Services</h1>
        </div>
        {/* Responsive: Card on desktop, plain div on mobile to avoid double boxing */}
        <div className="block sm:hidden">
          <div className="space-y-8 p-4">
            <Separator />
            {/* Download Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 break-words">Download Full Report</h3>
              <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                <p className="text-blue-800 leading-relaxed break-words">
                  The industry decomposition is available for download as a PDF. Click the button above to access the complete document.
                </p>
              </div>
            </div>
            <Separator />
          </div>
        </div>
        <div className="hidden sm:block">
          <Card>
            <CardContent className="space-y-8 p-8">
              <Separator />
              {/* Download Section */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 break-words">Download Full Report</h3>
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                  <p className="text-blue-800 leading-relaxed break-words">
                    The industry decomposition is available for download as a PDF. Click the button above to access the complete document.
                  </p>
                </div>
              </div>
            <Separator />
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
} 
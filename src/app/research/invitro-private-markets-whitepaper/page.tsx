"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivateMarketsWhitePaperPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Polished, Responsive Sticky Header for Mobile */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 mb-8 px-2 py-3 shadow-sm">
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-[hsl(212,74%,15%)] text-[hsl(212,74%,15%)] rounded-full px-4 py-2 text-sm font-medium hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)] transition"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Research
              </Button>
            </div>
            <div className="flex justify-center items-center py-1">
              <img
                src="/logo.png"
                alt="InVitro Capital Logo"
                className="h-12 w-auto sm:h-16"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Button
                className="bg-white text-[hsl(212,74%,15%)] border border-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)]"
                asChild
              >
                <a
                  href="/PrivateMarketsWhitePaper.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">InVitro Capital Private Markets White Paper</h1>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-8 rounded-lg text-blue-900 text-lg font-medium max-w-2xl mx-auto">
          The full white paper is available for download as a PDF. Click the button above to access the document.
        </div>
      </div>
    </div>
  );
} 
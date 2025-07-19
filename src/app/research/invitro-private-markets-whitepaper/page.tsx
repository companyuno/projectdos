"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivateMarketsWhitePaperPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-[hsl(212,74%,15%)] text-[hsl(212,74%,15%)] rounded-full px-5 py-2 text-sm font-medium hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)] transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Research
          </Button>
          <div className="flex-1 flex justify-center">
            <img src="/logo.png" alt="InVitro Capital Logo" width={180} height={48} style={{objectFit: 'contain'}} />
          </div>
          <Button
            className="bg-white text-[hsl(212,74%,15%)] border border-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)] ml-4"
            asChild
          >
            <a href="/PrivateMarketsWhitePaper.pdf" download target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </a>
          </Button>
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
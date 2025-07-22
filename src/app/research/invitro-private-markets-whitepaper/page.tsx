"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivateMarketsWhitePaperPage() {
  const router = useRouter();
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
          <img
            src="/logo.png"
            alt="InVitro Capital Logo"
            className="h-16 w-auto"
            style={{ objectFit: 'contain' }}
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
            href="/PrivateMarketsWhitePaper.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="w-7 h-7" />
          </a>
        </Button>
      </div>
      <div className="max-w-5xl mx-auto px-8 py-12">
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
"use client"

import { useState } from "react"
import DealsShowcase from "@/components/DealsShowcase"
import ResearchHub from "@/components/ResearchHub"
import { Button } from "@/components/ui/button"
import { Building2, FileText, Lightbulb } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"deals" | "research">("research")

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src="/logo.png" alt="InVitro Capital Logo" width={220} height={60} priority />
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={() => setActiveTab("research")}
                className={`flex items-center gap-2 px-6 py-2 cursor-pointer ${
                  activeTab === "research"
                    ? "bg-[hsl(212,74%,15%)] text-white hover:bg-[hsl(212,74%,20%)]"
                    : "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                }`}
              >
                <FileText className="w-4 h-4" />
                Research
              </Button>
              <Button
                onClick={() => setActiveTab("deals")}
                className={`flex items-center gap-2 px-6 py-2 cursor-pointer ${
                  activeTab === "deals"
                    ? "bg-[hsl(212,74%,15%)] text-white hover:bg-[hsl(212,74%,20%)]"
                    : "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Building2 className="w-4 h-4" />
                Investments
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === "deals" ? (
          <>
            {/* InVitro's Investment Philosophy Box */}
            <div className="bg-white border border-gray-200 rounded-lg px-0 md:px-10 py-8 md:py-12 shadow-lg w-full text-left mt-1 -ml-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <h3 className="font-bold text-2xl text-[#0a2e4e]">InVitro's Investment Philosophy</h3>
              </div>
              <div className="text-base font-semibold mb-6 text-left" style={{color: '#0a2e4e'}}>
                Labor Intensive • Fragmented • Tech-Starved • Under Penetrated
              </div>
              <p className="text-base text-gray-800 leading-relaxed text-left mb-1" style={{wordBreak: 'break-word'}}>
                InVitro curates and creates high-conviction investment opportunities across both internally built ventures and select external startups. Every deal—whether homegrown or sourced—is vetted for capital efficiency, real traction, and clear paths to liquidity. We focus on sectors others overlook, prioritizing structural advantage and execution speed. This is where disciplined company building meets disciplined investing.
              </p>
            </div>
            <DealsShowcase />
          </>
        ) : (
          <ResearchHub />
        )}
      </main>
    </div>
  )
}

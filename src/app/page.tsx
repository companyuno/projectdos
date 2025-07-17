"use client"

import { useState } from "react"
import DealsShowcase from "@/components/DealsShowcase"
import ResearchHub from "@/components/ResearchHub"
import { Button } from "@/components/ui/button"
import { Building2, FileText } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"deals" | "research">("deals")

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">InVitro Capital</h1>
            <div className="flex space-x-4">
              <Button
                variant={activeTab === "deals" ? "default" : "outline"}
                onClick={() => setActiveTab("deals")}
                className="flex items-center gap-2 px-6 py-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                Investment Deals
              </Button>
              <Button
                variant={activeTab === "research" ? "default" : "outline"}
                onClick={() => setActiveTab("research")}
                className="flex items-center gap-2 px-6 py-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Research Hub
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === "deals" ? <DealsShowcase /> : <ResearchHub />}
      </main>
    </div>
  )
}

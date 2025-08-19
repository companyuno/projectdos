"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import DealsShowcase from "@/components/DealsShowcase"
import ResearchHub from "@/components/ResearchHub"
import PermissionGate from "@/components/PermissionGate"
import { Button } from "@/components/ui/button"
import { Building2, FileText, Lightbulb, Rocket } from "lucide-react"
import Image from "next/image"

function HomeContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"deals" | "research">(() => {
    const tab = searchParams.get('tab');
    return tab === 'deals' ? 'deals' : 'research';
  });

  // Sync activeTab with URL tab param
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'deals' && activeTab !== 'deals') {
      setActiveTab('deals');
    } else if (tab === 'research' && activeTab !== 'research') {
      setActiveTab('research');
    }
    // eslint-disable-next-line
  }, [searchParams, pathname]);

  // Update the URL when the tab changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (activeTab === 'deals' && tab !== 'deals') {
      router.replace('/?tab=deals');
    } else if (activeTab === 'research' && tab !== 'research') {
      router.replace('/?tab=research');
    }
    // eslint-disable-next-line
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="bg-background sticky top-0 z-50 w-full h-20 flex items-center px-0 shadow-sm">
        <div
          className="w-full flex items-center justify-between"
          style={{
            maxWidth: "80rem",
            margin: "0 auto"
          }}
        >
          <div>
            <Image
              src="/logo.png"
              alt="InVitro Capital Logo"
              width={180}
              height={48}
              className="h-16 w-auto"
              priority
            />
          </div>
          <div className="flex space-x-1 items-center">
            <Button
              onClick={() => setActiveTab("research")}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-sm rounded-full ${
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
              className={`flex items-center gap-1 px-2.5 py-1.5 text-sm rounded-full ${
                activeTab === "deals"
                  ? "bg-[hsl(212,74%,15%)] text-white hover:bg-[hsl(212,74%,20%)]"
                  : "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Investments
            </Button>
            <Button
              onClick={() => router.push('/submit')}
              className="hidden md:inline-flex items-center justify-center gap-1 px-3 py-1.5 text-sm rounded-full border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
            >
              <Rocket className="w-4 h-4 hidden sm:inline-block" />
              Submit Startup
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {activeTab === "deals" ? (
          <PermissionGate>
            <>
              {/* InVitro's Investment Philosophy Box */}
              <div className="bg-white border border-gray-200 rounded-lg px-4 sm:px-6 py-6 sm:py-8 md:py-12 shadow-lg w-full text-left mt-1 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
                  <h3 className="font-bold text-xl sm:text-2xl text-[#0a2e4e]">InVitro&apos;s Investment Philosophy</h3>
                </div>
                <div className="text-sm sm:text-base font-semibold mb-4 sm:mb-6 text-left" style={{color: '#0a2e4e'}}>
                  Labor Intensive • Fragmented • Tech-Starved
                </div>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed text-left mb-1" style={{wordBreak: 'break-word'}}>
                  InVitro curates and creates high-conviction investment opportunities across both internally built ventures and select external startups. Every deal—whether homegrown or sourced—is vetted for capital efficiency, real traction, and clear paths to liquidity. We focus on sectors others overlook, prioritizing structural advantage and execution speed. This is where disciplined company building meets disciplined investing.
                </p>
              </div>
              <DealsShowcase />
            </>
          </PermissionGate>
        ) : (
          <ResearchHub />
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}

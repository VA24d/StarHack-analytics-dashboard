"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatusOverview } from "@/components/status-overview"
import { MetricsOverview } from "@/components/metrics-overview"
import { EngagementCharts } from "@/components/engagement-charts"
import { FeatureAdoption } from "@/components/feature-adoption"
import { GamificationMetrics } from "@/components/gamification-metrics"
import { RecentActivity } from "@/components/recent-activity"
import { LoadingSkeleton } from "@/components/loading-skeleton"

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      setIsLoading(false)
    } else {
      router.push("/login")
    }
  }, [router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSkeleton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <StatusOverview />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton />}>
          <MetricsOverview />
        </Suspense>

        <div className="grid gap-8 lg:grid-cols-2">
          <Suspense fallback={<LoadingSkeleton />}>
            <EngagementCharts />
          </Suspense>

          <Suspense fallback={<LoadingSkeleton />}>
            <FeatureAdoption />
          </Suspense>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <GamificationMetrics />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton />}>
          <RecentActivity />
        </Suspense>
      </main>
    </div>
  )
}

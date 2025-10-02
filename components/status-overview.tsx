"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertTriangle, TrendingUp, Clock } from "lucide-react"
import useSWR from "swr"

const fetcher = async () => {
  const response = await fetch("/api/metrics")
  return response.json()
}

export function StatusOverview() {
  const { data: metrics, isLoading } = useSWR("/api/metrics", fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  })

  if (isLoading || !metrics) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-6 w-48 bg-muted rounded mb-4" />
          <div className="h-4 w-full bg-muted rounded" />
        </CardContent>
      </Card>
    )
  }

  // Calculate overall health status
  const dauOnTrack = metrics.dau.changePercent >= 40
  const downloadsOnTrack = metrics.downloads.changePercent >= 50
  const adoptionOnTrack = metrics.featureAdoption.current >= 60

  const onTrackCount = [dauOnTrack, downloadsOnTrack, adoptionOnTrack].filter(Boolean).length
  const totalTargets = 3

  let status: "healthy" | "warning" | "critical"
  let statusColor: string
  let statusIcon: React.ReactNode

  if (onTrackCount === totalTargets) {
    status = "healthy"
    statusColor = "text-green-600 dark:text-green-400"
    statusIcon = <CheckCircle2 className="h-5 w-5" />
  } else if (onTrackCount >= 1) {
    status = "warning"
    statusColor = "text-yellow-600 dark:text-yellow-400"
    statusIcon = <AlertTriangle className="h-5 w-5" />
  } else {
    status = "critical"
    statusColor = "text-red-600 dark:text-red-400"
    statusIcon = <AlertTriangle className="h-5 w-5" />
  }

  const lastUpdated = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={statusColor}>{statusIcon}</div>
            <div>
              <h2 className="text-2xl font-bold">App Status Overview</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" />
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
          <Badge
            variant={status === "healthy" ? "default" : status === "warning" ? "secondary" : "destructive"}
            className="text-sm px-3 py-1"
          >
            {status === "healthy" ? "All Systems Healthy" : status === "warning" ? "Needs Attention" : "Critical"}
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <TrendingUp
              className={`h-5 w-5 mt-0.5 ${dauOnTrack ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">DAU Growth</p>
                {dauOnTrack ? (
                  <Badge variant="default" className="text-xs">
                    On Track
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    Below Target
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{metrics.dau.changePercent}%</p>
              <p className="text-xs text-muted-foreground">Target: 40%</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <TrendingUp
              className={`h-5 w-5 mt-0.5 ${downloadsOnTrack ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Downloads</p>
                {downloadsOnTrack ? (
                  <Badge variant="default" className="text-xs">
                    On Track
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    Below Target
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{metrics.downloads.changePercent}%</p>
              <p className="text-xs text-muted-foreground">Target: 50%</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <TrendingUp
              className={`h-5 w-5 mt-0.5 ${adoptionOnTrack ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Feature Adoption</p>
                {adoptionOnTrack ? (
                  <Badge variant="default" className="text-xs">
                    On Track
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    Below Target
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{metrics.featureAdoption.current}%</p>
              <p className="text-xs text-muted-foreground">Target: 60%</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <h3 className="text-sm font-semibold mb-2">Changes Since Last Update</h3>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">DAU:</span>
              <span
                className={
                  metrics.dau.changePercent >= 0
                    ? "text-green-600 dark:text-green-400 font-medium"
                    : "text-red-600 dark:text-red-400 font-medium"
                }
              >
                {metrics.dau.changePercent >= 0 ? "+" : ""}
                {metrics.dau.change.toLocaleString()} users ({metrics.dau.changePercent >= 0 ? "+" : ""}
                {metrics.dau.changePercent}%)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">MAU:</span>
              <span
                className={
                  metrics.mau.changePercent >= 0
                    ? "text-green-600 dark:text-green-400 font-medium"
                    : "text-red-600 dark:text-red-400 font-medium"
                }
              >
                {metrics.mau.changePercent >= 0 ? "+" : ""}
                {metrics.mau.change.toLocaleString()} users ({metrics.mau.changePercent >= 0 ? "+" : ""}
                {metrics.mau.changePercent}%)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Downloads:</span>
              <span
                className={
                  metrics.downloads.changePercent >= 0
                    ? "text-green-600 dark:text-green-400 font-medium"
                    : "text-red-600 dark:text-red-400 font-medium"
                }
              >
                {metrics.downloads.changePercent >= 0 ? "+" : ""}
                {metrics.downloads.change.toLocaleString()} ({metrics.downloads.changePercent >= 0 ? "+" : ""}
                {metrics.downloads.changePercent}%)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Adoption:</span>
              <span
                className={
                  metrics.featureAdoption.changePercent >= 0
                    ? "text-green-600 dark:text-green-400 font-medium"
                    : "text-red-600 dark:text-red-400 font-medium"
                }
              >
                {metrics.featureAdoption.changePercent >= 0 ? "+" : ""}
                {metrics.featureAdoption.change}% ({metrics.featureAdoption.changePercent >= 0 ? "+" : ""}
                {metrics.featureAdoption.changePercent}%)
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

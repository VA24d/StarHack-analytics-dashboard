"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, Download, Target, ArrowUp, ArrowDown } from "lucide-react"
import useSWR from "swr"

const fetcher = async () => {
  const response = await fetch("/api/metrics")
  return response.json()
}

export function MetricsOverview() {
  const { data: metrics, isLoading } = useSWR("/api/metrics", fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
  })

  if (isLoading || !metrics) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 w-32 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-24 bg-muted rounded mb-2" />
              <div className="h-4 w-20 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: "Daily Active Users",
      value: metrics.dau.current.toLocaleString(),
      change: metrics.dau.change,
      changePercent: metrics.dau.changePercent,
      target: "40% target",
      icon: Users,
      trend: metrics.dau.changePercent >= 0 ? "up" : "down",
    },
    {
      title: "Monthly Active Users",
      value: metrics.mau.current.toLocaleString(),
      change: metrics.mau.change,
      changePercent: metrics.mau.changePercent,
      target: "Growing",
      icon: TrendingUp,
      trend: metrics.mau.changePercent >= 0 ? "up" : "down",
    },
    {
      title: "Organic Downloads",
      value: metrics.downloads.current.toLocaleString(),
      change: metrics.downloads.change,
      changePercent: metrics.downloads.changePercent,
      target: "50% target",
      icon: Download,
      trend: metrics.downloads.changePercent >= 0 ? "up" : "down",
    },
    {
      title: "Feature Adoption",
      value: `${metrics.featureAdoption.current}%`,
      change: metrics.featureAdoption.change,
      changePercent: metrics.featureAdoption.changePercent,
      target: "60% target",
      icon: Target,
      trend: metrics.featureAdoption.changePercent >= 0 ? "up" : "down",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        const isPositive = card.trend === "up"
        const TrendIcon = isPositive ? ArrowUp : ArrowDown

        return (
          <Card key={card.title} className="transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  <TrendIcon className="h-3 w-3" />
                  <span>{Math.abs(card.changePercent)}%</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({isPositive ? "+" : ""}
                  {card.change.toLocaleString()})
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{card.target}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

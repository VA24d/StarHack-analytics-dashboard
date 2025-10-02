"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Trophy, Target, Zap, ArrowUp, ArrowDown } from "lucide-react"
import useSWR from "swr"

const fetcher = async () => {
  const response = await fetch("/api/gamification")
  return response.json()
}

export function GamificationMetrics() {
  const { data, isLoading } = useSWR("/api/gamification", fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  })

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gamification Performance</CardTitle>
          <CardDescription>User engagement with game mechanics and rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border p-4 animate-pulse">
                <div className="rounded-full p-3 bg-muted h-12 w-12" />
                <div className="space-y-2">
                  <div className="h-6 w-16 bg-muted rounded" />
                  <div className="h-4 w-24 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const metrics = [
    {
      label: "Active Challenges",
      value: data.activeChallenges.current,
      change: data.activeChallenges.change,
      changePercent: data.activeChallenges.changePercent,
      icon: Target,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      label: "Achievements Unlocked",
      value: data.achievementsUnlocked.current.toLocaleString(),
      change: data.achievementsUnlocked.change,
      changePercent: data.achievementsUnlocked.changePercent,
      icon: Award,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      label: "Rewards Claimed",
      value: data.rewardsClaimed.current.toLocaleString(),
      change: data.rewardsClaimed.change,
      changePercent: data.rewardsClaimed.changePercent,
      icon: Trophy,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950",
    },
    {
      label: "Streak Participants",
      value: data.streakParticipants.current.toLocaleString(),
      change: data.streakParticipants.change,
      changePercent: data.streakParticipants.changePercent,
      icon: Zap,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gamification Performance</CardTitle>
        <CardDescription>User engagement with game mechanics and rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon
            const isPositive = metric.changePercent >= 0
            const TrendIcon = isPositive ? ArrowUp : ArrowDown

            return (
              <div
                key={metric.label}
                className="flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-md"
              >
                <div className={`rounded-full p-3 ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <div
                    className={`flex items-center gap-1 mt-1 text-xs font-medium ${
                      isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    <TrendIcon className="h-3 w-3" />
                    <span>
                      {Math.abs(metric.changePercent)}% ({isPositive ? "+" : ""}
                      {metric.change.toLocaleString()})
                    </span>
                  </div>
                  {/* </CHANGE> */}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import useSWR from "swr"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

const fetcher = async () => {
  const response = await fetch("/api/activity")
  return response.json()
}

export function RecentActivity() {
  const {
    data: activities,
    isLoading,
    mutate,
  } = useSWR("/api/activity", fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
  })

  if (isLoading || !activities) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
          <CardDescription>Latest engagement events across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 animate-pulse">
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-3 w-48 bg-muted rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-16 bg-muted rounded" />
                  <div className="h-3 w-12 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent User Activity</CardTitle>
          <CardDescription>Latest engagement events across the platform</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={() => mutate()} className="h-8 w-8">
          <RefreshCw className="h-4 w-4" />
        </Button>
        {/* </CHANGE> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity: any) => (
            <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={activity.type === "achievement" ? "default" : "secondary"}>{activity.category}</Badge>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

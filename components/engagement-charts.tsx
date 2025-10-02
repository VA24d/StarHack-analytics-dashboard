"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { useEffect, useState } from "react"

const chartData = [
  { date: "Week 1", dau: 12400, mau: 45000 },
  { date: "Week 2", dau: 14200, mau: 48500 },
  { date: "Week 3", dau: 15800, mau: 52000 },
  { date: "Week 4", dau: 17600, mau: 56200 },
  { date: "Week 5", dau: 19200, mau: 61000 },
  { date: "Week 6", dau: 21500, mau: 66500 },
  { date: "Week 7", dau: 23800, mau: 72000 },
  { date: "Week 8", dau: 26400, mau: 78500 },
]

export function EngagementCharts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Engagement Trends</CardTitle>
          <CardDescription>Daily and Monthly Active Users over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]" />
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Engagement Trends</CardTitle>
        <CardDescription>Daily and Monthly Active Users over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            dau: {
              label: "Daily Active Users",
              color: "#3b82f6",
            },
            mau: {
              label: "Monthly Active Users",
              color: "#8b5cf6",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                stroke="hsl(var(--border))"
              />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
              {/* </CHANGE> */}
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
              <Line
                type="monotone"
                dataKey="dau"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
                name="Daily Active Users"
              />
              <Line
                type="monotone"
                dataKey="mau"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", r: 4 }}
                activeDot={{ r: 6 }}
                name="Monthly Active Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

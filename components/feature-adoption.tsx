"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

const features = [
  { name: "Policy Servicing", usage: 35, change: "+5%" },
  { name: "Aktivo Health Tracking", usage: 28, change: "+12%" },
  { name: "Wellness Challenges", usage: 18, change: "+45%" },
  { name: "Social Community", usage: 12, change: "+78%" },
  { name: "Rewards & Achievements", usage: 22, change: "+62%" },
  { name: "Insurance Engagement", usage: 15, change: "+38%" },
]

export function FeatureAdoption() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Adoption Rates</CardTitle>
        <CardDescription>Percentage of active users engaging with each feature</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {features.map((feature) => (
          <div key={feature.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{feature.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-medium">{feature.change}</span>
                <span className="text-muted-foreground">{feature.usage}%</span>
              </div>
            </div>
            <Progress value={mounted ? feature.usage : 0} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

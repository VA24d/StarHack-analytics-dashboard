import { NextResponse } from "next/server"

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Mock recent activity data
  const activities = [
    {
      id: "1",
      user: "Sarah Johnson",
      action: 'Completed "30-Day Wellness Challenge"',
      category: "Health",
      type: "achievement",
      time: "2 min ago",
    },
    {
      id: "2",
      user: "Michael Chen",
      action: 'Unlocked "Fitness Warrior" badge',
      category: "Achievement",
      type: "achievement",
      time: "5 min ago",
    },
    {
      id: "3",
      user: "Emily Rodriguez",
      action: "Claimed 500 wellness points reward",
      category: "Rewards",
      type: "reward",
      time: "12 min ago",
    },
    {
      id: "4",
      user: "David Kim",
      action: 'Started "Mindful Meditation" challenge',
      category: "Wellness",
      type: "challenge",
      time: "18 min ago",
    },
    {
      id: "5",
      user: "Jessica Taylor",
      action: "Reached 50-day activity streak",
      category: "Streak",
      type: "achievement",
      time: "25 min ago",
    },
    {
      id: "6",
      user: "Alex Martinez",
      action: 'Joined "Team Fitness" community',
      category: "Social",
      type: "social",
      time: "32 min ago",
    },
  ]

  return NextResponse.json(activities)
}

import { NextResponse } from "next/server"

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const data = {
    activeChallenges: {
      current: 47,
      previous: 32,
      change: 15,
      changePercent: 47,
    },
    achievementsUnlocked: {
      current: 12845,
      previous: 9200,
      change: 3645,
      changePercent: 40,
    },
    rewardsClaimed: {
      current: 8932,
      previous: 6100,
      change: 2832,
      changePercent: 46,
    },
    streakParticipants: {
      current: 5621,
      previous: 3800,
      change: 1821,
      changePercent: 48,
    },
  }

  return NextResponse.json(data)
}

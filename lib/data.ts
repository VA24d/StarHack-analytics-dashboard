// Mock data functions - Replace with actual Supabase queries when ready
// These functions simulate async data fetching from Supabase

export async function getMetricsData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Mock data - Replace with:
  // const supabase = createServerClient(...)
  // const { data } = await supabase.from('metrics').select('*')

  return {
    dau: 26400,
    mau: 78500,
    downloads: 15300,
    featureAdoption: 62,
  }
}

export async function getGamificationData() {
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Mock data - Replace with Supabase query:
  // const { data } = await supabase.from('gamification_metrics').select('*')

  return {
    activeChallenges: 47,
    achievementsUnlocked: 12845,
    rewardsClaimed: 8932,
    streakParticipants: 5621,
  }
}

export async function getRecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Mock data - Replace with Supabase query:
  // const { data } = await supabase
  //   .from('user_activities')
  //   .select('*')
  //   .order('created_at', { ascending: false })
  //   .limit(10)

  return [
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
}

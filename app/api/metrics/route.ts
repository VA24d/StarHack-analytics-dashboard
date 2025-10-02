import { NextResponse } from "next/server"

// Mock data with historical comparison
// Replace with actual Supabase queries when ready
export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Mock current vs previous period data
  const data = {
    dau: {
      current: 26400,
      previous: 18600,
      change: 7800,
      changePercent: 42,
    },
    mau: {
      current: 78500,
      previous: 56900,
      change: 21600,
      changePercent: 38,
    },
    downloads: {
      current: 15300,
      previous: 10000,
      change: 5300,
      changePercent: 53,
    },
    featureAdoption: {
      current: 62,
      previous: 38,
      change: 24,
      changePercent: 63,
    },
  }

  return NextResponse.json(data)
}

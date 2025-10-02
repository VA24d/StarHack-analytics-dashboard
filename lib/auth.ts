// Authentication utilities for YouMatter Analytics Dashboard
// This uses localStorage for demo purposes - replace with Supabase auth in production

export interface User {
  email: string
  id: string
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isAuthenticated") === "true"
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const email = localStorage.getItem("userEmail")
  if (!email) return null

  return {
    email,
    id: email, // In production, this would be a proper user ID from Supabase
  }
}

export function login(email: string, password: string): boolean {
  // Mock authentication - replace with Supabase auth
  // Demo credentials: admin@youmatter.com / admin123
  if (email === "admin@youmatter.com" && password === "admin123") {
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userEmail", email)
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem("isAuthenticated")
  localStorage.removeItem("userEmail")
}

// When integrating with Supabase, replace the above with:
// import { createBrowserClient } from '@supabase/ssr'
// const supabase = createBrowserClient(...)
// Use supabase.auth.signInWithPassword(), supabase.auth.signOut(), etc.

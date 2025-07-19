"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  image: string
}

interface AuthContextType {
  user: User | null
  signIn: () => void
  signOut: () => void
  isAdmin: boolean
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock admin email - in a real app, this would be stored in your database
const ADMIN_EMAIL = "admin@picsword.in"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      const savedUser = localStorage.getItem("picsword_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const signIn = async () => {
    // In a real app, this would integrate with Google OAuth
    // For demo purposes, we'll simulate a successful login
    const mockUser: User = {
      id: "1",
      name: "Demo User",
      email: "demo@example.com",
      image: "/placeholder.svg?height=40&width=40",
    }

    setUser(mockUser)
    localStorage.setItem("picsword_user", JSON.stringify(mockUser))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("picsword_user")
  }

  const isAdmin = user?.email === ADMIN_EMAIL

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

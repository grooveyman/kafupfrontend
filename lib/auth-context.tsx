'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  name: string
  email: string
  role: 'designer' | 'client'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  role: 'designer' | 'client' | null
  signin: (email: string, password: string, role: 'designer' | 'client') => Promise<void>
  signup: (data: { name: string; email: string; password: string; role: 'designer' | 'client' }) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('vesture_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse user data', error)
      }
    }
    setIsLoading(false)
  }, [])

  const signin = async (email: string, password: string, role: 'designer' | 'client') => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }
    setUser(mockUser)
    localStorage.setItem('vesture_user', JSON.stringify(mockUser))
  }

  const signup = async (data: { name: string; email: string; password: string; role: 'designer' | 'client' }) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
    }
    setUser(mockUser)
    localStorage.setItem('vesture_user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vesture_user')
  }

  return (
    <AuthContext.Provider value={{ user, role: user?.role ?? null, signin, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import api from './api'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile,setProfile]=useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkAuth()
    checkProfile()
  }, [])

  useEffect(() => {
    // 🔑 If logged in AND visiting /auth/login or /auth/signup → redirect
    if (!loading && user && (pathname === '/auth/login' || pathname === '/auth/signup')) {
      router.replace('/protected/dashboard')
    }
  }, [user, loading, pathname, router])

  const checkAuth = async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.user)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const checkProfile = async () => {
    try {
      const response = await api.get('/profile')
      setProfile(response.profile)
    } catch (err) {
      console.log(err)
    }
  }

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    setUser(response.user)
    return response
  }

  const signup = async (email, password, name, username, referralCode, deviceFingerprint) => {
    console.log("referralCode is :", referralCode)
    const response = await api.post('/auth/signup', {
      email,
      password,
      name,
      username,
      referralCode,
      deviceFingerprint
    })
    setUser(response.user)
    return response
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  const health = async () => {
    const response = await api.get('/health')
    return response
  }
  const getprofile = async () => {
    const response = await api.get('/profile')

    return response
  }
  const verifyEmail = async (token) => {
    const response = await api.get(`/auth/verify-email/${token}`)
    return response
  }

  const sendVerifyEmail = async () => {
    const response = await api.post('/auth/send-verify-email', {
      email: user.email
    })
    return response
  }

  const value = {
    user,
    health,
    profile,
    loading,
    login,
    signup,
    logout,
    checkAuth,
    checkProfile,
    getprofile,
    verifyEmail,
    sendVerifyEmail,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import api from './api'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

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

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
 
    setUser(response.user)
    return response
  }

  const signup = async (email,password, name,username, referralCode,deviceFingerprint ) => {
    console.log("referralCode is :",referralCode)
    const response = await api.post('/auth/signup', { 
      email, 
      password, 
      name,
      username, 
      referralCode ,
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
  const health = async()=>{
    const response = await api.get('/health')
    return response
  }

  const value = {
    user,
    health,
    loading,
    login,
    signup,
    logout,
    checkAuth,
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
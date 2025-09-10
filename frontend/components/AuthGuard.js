'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/auth'
import LoadingSpinner from './LoadingSpinner'

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (!mounted || loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null
  }

  return children
}
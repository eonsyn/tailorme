"use client"

import React, { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { AlertCircle, Mail, X } from "lucide-react"
import toast from 'react-hot-toast'
import { usePathname } from 'next/navigation'

export default function VerifyEmail() {
  const { sendVerifyEmail, user } = useAuth()
  const [show, setShow] = useState(true)
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  if (!user || user.isEmailVerified || !show  ) return null

  const handleSend = async () => {
    try {
      setLoading(true)
      await sendVerifyEmail()
      toast.success('Verification email sent!')
    } catch {
      toast.error('Failed to send')
    } finally {
      setLoading(false)
      setShow(false)
    }
  }

  return (
    <div className="p-3 m-4 border-2 border-red-600 bg-red-50 text-red-700 rounded-lg flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <p className="font-semibold">Verify your email <Mail className="inline w-4 h-4 ml-1" /></p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Re-send'}
        </button>

        <button
          onClick={() => setShow(false)}
          className="p-1 rounded-full hover:bg-red-200 transition-colors"
        >
          <X className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  )
}

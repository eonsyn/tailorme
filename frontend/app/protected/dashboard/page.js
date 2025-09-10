'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, User, CreditCard, TrendingUp } from 'lucide-react'
import api from '../../../lib/api'
import LoadingSpinner from '../../../components/LoadingSpinner'

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const data = await api.get('/dashboard/stats')
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Resumes</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalResumes || 0}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Credits Remaining</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.credits || 0}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Profile Complete</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.profileCompleteness || 0}%</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.resumesThisMonth || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Generate</h2>
          <p className="text-gray-600 mb-6">
            Paste a job description and get a tailored resume in seconds.
          </p>
          <Link href="/protected/resume/builder" className="btn btn-primary">
            Start Building Resume
          </Link>
        </div>

        <div className="card p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Complete Your Profile</h2>
          <p className="text-gray-600 mb-6">
            {stats?.profileCompleteness >= 80 
              ? 'Your profile looks great! Keep it updated for better results.'
              : 'Add more details to your profile for better AI-generated resumes.'
            }
          </p>
          <Link href="/protected/profile" className="btn btn-outline">
            Update Profile
          </Link>
        </div>
      </div>

      {/* Recent Resumes */}
      {stats?.recentResumes?.length > 0 && (
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Resumes</h2>
          <div className="space-y-4">
            {stats.recentResumes.map((resume) => (
              <div key={resume._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{resume.title}</h3>
                  <p className="text-sm text-gray-600">
                    Created {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link href={`/protected/resume/${resume._id}`} className="text-primary-600 hover:text-primary-700">
                  View
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/protected/resume/history" className="text-primary-600 hover:text-primary-700">
              View All Resumes →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
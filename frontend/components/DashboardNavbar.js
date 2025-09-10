'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, User, FileText, Settings, CreditCard, Gift } from 'lucide-react'
import { useAuth } from '../lib/auth'

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/protected/dashboard', icon: User },
    { name: 'Profile', href: '/protected/profile', icon: User },
    { name: 'Resume Builder', href: '/protected/resume/builder', icon: FileText },
    { name: 'Plan Purchase', href: '/protected/purchase', icon: FileText },
    { name: 'Referrals', href: '/protected/referral', icon: Gift },

  ]

  const isActive = (href) => pathname === href

  return (
    <nav id='notprint' className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/protected/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TailorMe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center relative">
            {/* Circle avatar with first letter */}
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold cursor-pointer hover:bg-blue-600 transition-colors"
            >
                
              {
                !open ? (user?.name?.[0]?.toUpperCase() || "U"):(<X/>)
              }
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md border py-2 w-32">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="px-4 py-2 text-sm text-gray-700">Hi, {user?.name}</div>
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="w-full cursor-pointer bg-red-900 text-red-800 text-left px-4 py-2 hover:text-red-900"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
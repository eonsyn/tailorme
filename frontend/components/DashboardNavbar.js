'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, User, FileText, Settings, CreditCard, Gift, Sun, Moon } from 'lucide-react'
import { useAuth } from '../lib/auth'

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Set initial theme from local storage or system preference
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.className = storedTheme
    } else {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = isSystemDark ? 'dark' : 'light'
      setTheme(initialTheme)
      document.documentElement.className = initialTheme
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.className = newTheme
    localStorage.setItem('theme', newTheme)
  }

  const navigation = [
    { name: 'Dashboard', href: '/protected/dashboard', icon: User },
    { name: 'Profile', href: '/protected/profile', icon: User },
    { name: 'Build Resume', href: '/protected/resume/builder', icon: FileText },
    { name: 'Credits', href: '/protected/purchase', icon: CreditCard },
    { name: 'Referrals', href: '/protected/referral', icon: Gift },
  ]

  const isActive = (href) => pathname === href

  return (
    <nav id='notprint' className="no-print bg-card/90 backdrop-blur-sm border-b border-border sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <Link href="/protected/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-foreground">TailorMe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'text-muted-foreground  hover:bg-muted'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}

            {/* Theme Toggle and User Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Toggle dark/light mode"
              >
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold cursor-pointer transition-colors hover:bg-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-expanded={open}
                  aria-controls="user-menu"
                >
                  {open ? <X className="w-6 h-6" /> : (user?.name?.[0]?.toUpperCase() || 'U')}
                </button>

                {open && (
                  <div
                    id="user-menu"
                    className="absolute top-12 right-0 bg-card shadow-xl rounded-2xl border border-border py-3 w-52 transition-all duration-200 z-50"
                  >
                    {/* User Info */}
                    <div className="px-4 flex flex-col items-start gap-2 pb-3 border-b border-border">
                      <p className="text-sm text-muted-foreground">
                        Hello, <span className="font-medium">{user?.name}</span>
                      </p>

                      <div className="w-full flex items-center justify-between bg-muted/10 px-3 py-1 rounded-lg border border-border">
                        <span className="text-sm text-muted-foreground">Credits</span>
                        <span className="font-semibold text-primary text-sm">{user?.credits || 0}</span>
                      </div>
                    </div>

                    {/* Logout Button */}
                    <button
                      onClick={logout}
                      className="w-full mt-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </div>

                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 bg-card/90">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-primary-foreground hover:bg-muted'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            <div className="border-t border-border pt-4 mt-4 space-y-2">
              <div className="px-4 py-2 text-sm text-muted-foreground">Hi, {user?.name}</div>
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-destructive hover:bg-destructive/10"
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
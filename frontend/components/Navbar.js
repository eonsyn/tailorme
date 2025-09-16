'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, Sun, Moon, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
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

  return (
    <nav className="bg-card/90 backdrop-blur-sm border-b border-border sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-foreground">TailorMe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/public/pricing" className="text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/auth/login" className="text-muted-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/auth/signup" className="btn btn-primary">
              Sign Up
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
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
          <div className="md:hidden py-4 space-y-4">
            <Link href="/pricing" className="block text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/auth/login" className="block text-muted-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/auth/signup" className="btn btn-primary w-full text-center">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
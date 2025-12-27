"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, Sun, Moon, X } from "lucide-react";
import { usePathname } from "next/navigation";
import WhiteLogo from "@/public/WhiteLogo.png";
import BlackLogo from "@/public/BlackLogo.png";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [showNavbar, setShowNavbar] = useState(true);

  const pathname = usePathname();
  const lastScrollY = useRef(0);

  // 🌙 Theme setup
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.className = storedTheme;
    } else {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme = isSystemDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.className = initialTheme;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  // 👇 Scroll direction logic (sticky-safe)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/blog", label: "Blogs" },
    { href: "/public/pricing", label: "Pricing" },
    { href: "/auth/login", label: "Login" },
  ];

  return (
    <nav
      className={`
        sticky top-0 z-50
        bg-card/90 backdrop-blur-sm border-b border-border
        transition-transform duration-300 ease-in-out
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center">
              <Image
                src={theme === "dark" ? WhiteLogo : BlackLogo}
                alt="logo"
              />
            </div>
            <span className="text-xl font-bold text-foreground">
              GptResume
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-muted-foreground transition-colors ${
                  pathname === link.href
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link href="/auth/signup" className="btn btn-primary">
              Sign Up
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground hover:bg-muted"
            >
              {theme === "dark" ? (
                <Moon className="w-6 h-6" />
              ) : (
                <Sun className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-muted-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/auth/signup" className="btn btn-primary w-full">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

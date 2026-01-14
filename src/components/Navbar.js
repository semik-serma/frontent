"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Animation effect for website text
  useEffect(() => {
    const startAnimation = () => {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 2500);
    };

    const initialTimeout = setTimeout(startAnimation, 3000);
    const interval = setInterval(startAnimation, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handlelogout = () => {
    // Removed localStorage usage - handle logout through your app's state management
    router.push('/login');
  };

  const searchToGoogle = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(search)}`, "_blank");
      setSearch('');
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/articles', label: 'Articles' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 w-full z-50 bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-300 h-12 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-lg border-b-2 border-yellow-500/30 backdrop-blur-sm relative overflow-hidden">
        <div className="flex items-center gap-2 relative z-10">
          <Image
            src='/nepali.png'
            height={28}
            width={28}
            alt="Nepali Flag"
            className="rounded shadow-sm ring-1 ring-white/30"
          />
          <span className="text-xs sm:text-sm font-semibold text-gray-800 hidden sm:inline-block">
            Welcome for visiting my website
          </span>
        </div>

        {/* Animated Website Text */}
        <div className={`absolute top-1/2 -translate-y-1/2 right-4 md:right-8 lg:right-16 z-0 transition-all duration-[2000ms] ease-out ${showAnimation ? 'translate-x-[-350px] md:translate-x-[-500px] lg:translate-x-[-650px] opacity-100 scale-105' : 'translate-x-0 opacity-0 scale-100'
          }`}>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-xs sm:text-sm whitespace-nowrap drop-shadow-lg">
            www.phidimservice.com
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-800">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium">semikserma@gmail.com</span>
            <Link href='https://github.com/semik-serma/frontent'><FaGithub /></Link>
            <Link href='https://www.facebook.com/dhanraj.serma.14'><FaFacebook /></Link>
            <Link href='https://www.youtube.com/@digitalmediacenterphidim6022'><FaYoutube /></Link>
            <Link href='https://www.linkedin.com/in/semik-serma-8263a3391/'><FaLinkedin /></Link>
            <Link href='https://wa.me/9817926978'><FaWhatsappSquare /></Link>
          </div>
          <div className="h-4 w-px bg-gray-800/30"></div>
          <div className="flex items-center gap-1.5 text-gray-800">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">Mon - Fri: 9AM - 6PM</span>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center">
          <span className="text-xs font-medium text-gray-800">Nepal 🇳🇵</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`sticky top-12 w-full bg-white shadow-md z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition">
                Semik<span className="text-gray-800">Dev</span>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <form
              onSubmit={searchToGoogle}
              className="hidden lg:flex flex-1 max-w-md mx-8"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Google..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-600 transition"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Nav Links - Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-base font-medium transition-colors relative ${isActive(link.href)
                    ? 'text-blue-600 bg-blue-50 buttonborderrunnercolor'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3 ml-4">
              <Link
                href="/login"
                className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-slate-900 overflow-hidden group"
              >
                <span className="absolute inset-0 rounded-lg bg-[linear-gradient(120deg,rgba(59,130,246,0.8),rgba(139,92,246,0.8),rgba(236,72,153,0.8))] blur-sm animate-pulse"></span>
                <span className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-75 group-hover:opacity-100 transition-opacity duration-300" style={{WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude'}}></span>
                <span className="absolute inset-[2px] rounded-lg bg-slate-900"></span>
                <span className="relative z-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                  Login
                </span>
              </Link>
              <button 
                onClick={handlelogout}
                className="px-5 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
            <div className="py-4 border-t border-gray-200 space-y-2">
              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive(link.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="px-4 py-2 space-y-2 border-t border-gray-200 pt-4 mt-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium border-2 border-transparent bg-clip-border animate-gradient-border rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>

              {/* Mobile Search */}
              <div className="px-4 pt-2 border-t border-gray-200 mt-2">
                <form onSubmit={searchToGoogle} className="flex gap-2">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Google..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    aria-label="Search"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showWhatsAppMessage, setShowWhatsAppMessage] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

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

  // Show WhatsApp message on page load
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setShowWhatsAppMessage(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const searchToGoogle = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(search)}`, "_blank");
      setSearch('');
    }
  };

  const closeWhatsAppMessage = () => {
    setShowWhatsAppMessage(false);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/9779862772457?text=Hello!%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services.', '_blank');
    setShowWhatsAppMessage(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-300 h-12 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-md border-b border-yellow-500/20">
        <div className="flex items-center gap-2">
          <Image 
            src='/nepali.png' 
            height={28} 
            width={28} 
            alt="Nepali Flag" 
            className="rounded shadow-sm ring-1 ring-white/30" 
          />
          <span className="text-xs sm:text-sm font-semibold text-gray-800 hidden sm:inline-block">
            Welcome to my website
          </span>
        </div>

        {/* Animated Running Text */}
        <div className="flex-1 flex items-center justify-center px-4 overflow-hidden">
          <div className="relative w-full flex justify-center">
            <span 
              className="text-xl font-bold text-gray-800 whitespace-nowrap inline-block" 
              style={{
                color: 'rgb(59, 130, 246)', 
                textShadow: '0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.6)',
                animation: 'runText 5s linear infinite'
              }}
            >
              www.phidimservice.com
            </span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-800">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium">semikserma@gmail.com</span>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center gap-2">
            <a href="https://www.facebook.com/dhanraj.serma.14" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-600 transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@digitalmediacenterphidim6022" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-red-600 transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-700 transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/semik-serma/frontend" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
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
      <div className={`fixed top-12 w-full bg-white shadow-md z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition">
                SemikwebDev
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
                  className={`px-4 py-2 rounded-lg text-base font-medium transition-colors relative ${
                    isActive(link.href)
                      ? 'text-blue-600 bg-blue-50'
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
                className="px-4 py-2 text-cyan-300 font-black text-lg hover:text-cyan-200 transition-all duration-300 rounded-xl hover:bg-black/70 border-4 shadow-2xl animate-pulse bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-md rgb-border transform hover:scale-105 hover:rotate-1"
              >
                <span className="relative z-10">Login</span>
              </Link>
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
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 border-t border-gray-200 space-y-2">
              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.href)
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
                  className="block w-full text-center px-4 py-2 text-cyan-300 font-black text-lg border-4 rounded-xl hover:bg-black/70 transition-all duration-300 shadow-2xl animate-pulse bg-gradient-to-br from-black via-gray-900 to-black backdroplassmorphism rgb-border transform hover:scale-105"
                >
                  <span className="relative z-10">Login</span>
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

      {/* Spacer to prevent content being hidden behind navbar */}
      <div className="h-[112px]"></div>

      {/* WhatsApp Message Popup */}
      {isClient && showWhatsAppMessage && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-bounce">
          <div className="bg-green-500 text-white rounded-lg shadow-2xl p-4 relative">
            <button
              onClick={closeWhatsAppMessage}
              className="absolute top-2 right-2 text-white hover:text-gray-200 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.885-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">WhatsApp Support</h3>
                <p className="text-sm opacity-90">Need help? Chat with us!</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={closeWhatsAppMessage}
                className="flex-1 bg-white text-green-500 px-3 py-2 rounded text-sm font-semibold hover:bg-gray-100 transition"
              >
                Maybe Later
              </button>
              <button
                onClick={openWhatsApp}
                className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-green-700 transition"
              >
                Chat Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

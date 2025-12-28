"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      
      {/* Background Image */}
      <Image
        src="/login.png"
        alt="login background"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Welcome Section */}
          <div className="text-white space-y-6 hidden md:block">
            <div className="relative w-full h-96">
              <Image
                src="/loginwelcome.png"
                alt="Login Welcome"
                fill
                className="rounded-lg shadow-2xl object-cover opacity-20"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                  Welcome Back!
                </h1>
                <p className="text-lg lg:text-xl text-white/90 mb-2">
                  My name is Semik and I am a web developer
                </p>
                <p className="text-base text-white/80">
                  Sign in to access your account and continue your journey with us.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="w-full max-w-md">
              {/* Login Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 lg:p-10 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
                  <p className="text-gray-600">Enter your credentials to access your account</p>
                </div>

                {/* Mobile Welcome Text */}
                <div className="md:hidden text-center space-y-2 mb-4">
                  <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
                  <p className="text-gray-600 text-sm">My name is Semik and I am a web developer</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* OTP Input */}
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                      OTP Code
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      placeholder="Enter 6-digit OTP"
                    />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600 focus:ring-2"
                      />
                      <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition">
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-200"
                  >
                    Sign In
                  </button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium transition">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default page

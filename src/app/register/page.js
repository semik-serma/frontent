"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log('Registration attempt:', formData);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      
      {/* Background Image */}
      <Image
        src="/login.png"
        alt="register background"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Welcome Section */}
          <div className="text-white space-y-6 hidden md:block">
            <div className="relative w-full h-96">
              <Image
                src="/loginwelcome.png"
                alt="Register Welcome"
                fill
                className="rounded-lg shadow-2xl object-cover opacity-20"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                  Create Your Account
                </h1>
                <p className="text-lg lg:text-xl text-white/90 mb-2">
                  My name is Semik and I am a web developer
                </p>
                <p className="text-base text-white/80">
                  Join us today and start your journey. Create your account in just a few simple steps.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="w-full max-w-md">
              {/* Register Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 lg:p-10 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
                  <p className="text-gray-600">Create your account to get started</p>
                </div>

                {/* Mobile Welcome Text */}
                <div className="md:hidden text-center space-y-2 mb-4">
                  <h1 className="text-2xl font-bold text-gray-800">Create Your Account</h1>
                  <p className="text-gray-600 text-sm">My name is Semik and I am a web developer</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

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
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600 focus:ring-2"
                      />
                      <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                        I agree to the{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                          Terms and Conditions
                        </a>
                        {' '}and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-200"
                  >
                    Create Account
                  </button>
                </form>

                {/* Sign In Link */}
                <div className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition">
                    Sign in
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


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    location: ''
  });
  const [locationStatus, setLocationStatus] = useState('idle'); // idle, loading, success, error

  useEffect(() => {
    // Get user location on component mount
    if ('geolocation' in navigator) {
      setLocationStatus('loading');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Reverse geocoding to get address (using a simple approximation)
          fetchLocationName(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationStatus('error');
        }
      );
    } else {
      setLocationStatus('error');
    }
  }, []);

  const fetchLocationName = async (lat, lon) => {
    try {
      // Using Nominatim for reverse geocoding (free service)
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();
      
      if (data && data.display_name) {
        setFormData(prev => ({ ...prev, location: data.display_name }));
        setLocationStatus('success');
      } else {
        setFormData(prev => ({ ...prev, location: `${lat.toFixed(6)}, ${lon.toFixed(6)}` }));
        setLocationStatus('success');
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
      setFormData(prev => ({ ...prev, location: `${lat.toFixed(6)}, ${lon.toFixed(6)}` }));
      setLocationStatus('success');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Include location in the submission
    const submissionData = {
      ...formData,
      submittedAt: new Date().toISOString()
    };
    
    console.log('Form submitted with location:', submissionData);
    alert(`Thank you for your message! We received your location: ${formData.location || 'Location not available'}`);
    
    // Reset form but keep location
    setFormData(prev => ({
      ...prev,
      name: '',
      email: '',
      subject: '',
      message: ''
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get in touch with us. We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none"
                    placeholder="Tell us more about your project or question..."
                  />
                </div>

                {/* Location Field */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      placeholder="Detecting your location..."
                      readOnly
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {locationStatus === 'loading' && (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      )}
                      {locationStatus === 'success' && (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {locationStatus === 'error' && (
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {locationStatus === 'loading' && 'Detecting your location...'}
                    {locationStatus === 'success' && 'Location detected automatically'}
                    {locationStatus === 'error' && 'Location detection failed or denied'}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">semikserma@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9AM - 6PM</p>
                      <p className="text-gray-600">Saturday - Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-600">Phidim, Nepal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Location</h2>
                
                {locationStatus === 'loading' && (
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-gray-600">Detecting your location...</p>
                    </div>
                  </div>
                )}
                
                {locationStatus === 'error' && (
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-red-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600">Location detection failed</p>
                      <button 
                        onClick={() => window.location.reload()}
                        className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
                
                {locationStatus === 'success' && formData.location && (
                  <div>
                    <div className="h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <iframe
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=85.5,26.5,87.5,27.5&layer=mapnik&marker=${encodeURIComponent(formData.location)}`}
                        className="w-full h-full border-0"
                        title="Location Map"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Detected Location:</p>
                        <p className="text-gray-900">{formData.location}</p>
                      </div>
                      <button 
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.location)}`, '_blank')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View on Google Maps →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Ready to start your project?</h3>
                <p className="text-blue-100 mb-6">
                  Let's work together to bring your ideas to life. Get in touch today and let's discuss how we can help you achieve your goals.
                </p>
                <Link
                  href="/register"
                  className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

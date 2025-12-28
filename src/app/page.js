"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to <span className="text-yellow-400">SemikDev</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                My name is Semik and I am a web developer
              </p>
              <p className="text-lg text-blue-200 max-w-2xl">
                Creating modern, responsive, and user-friendly web applications that bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-center hover:bg-blue-50 transition duration-200 shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-white/10 transition duration-200"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-96 w-full bg-blue-500/20 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🚀</div>
                  <p className="text-xl font-semibold">Web Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What I Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional web development services tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-200">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Frontend Development</h3>
              <p className="text-gray-600">
                Modern, responsive web interfaces built with the latest technologies including React, Next.js, and Tailwind CSS.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-200">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">UI/UX Design</h3>
              <p className="text-gray-600">
                Beautiful and intuitive user interfaces designed with user experience in mind, ensuring your users love your product.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Performance</h3>
              <p className="text-gray-600">
                Optimized applications that load fast and provide smooth user experiences across all devices.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-200">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Responsive Design</h3>
              <p className="text-gray-600">
                Mobile-first approach ensuring your website looks perfect on all screen sizes from mobile to desktop.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-200">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Built with security best practices and reliable architecture to keep your application safe and stable.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-200">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Maintenance & Support</h3>
              <p className="text-gray-600">
                Ongoing support and maintenance to keep your application up-to-date and running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                About Semik
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                I'm a passionate web developer dedicated to creating exceptional digital experiences. With a focus on modern technologies and best practices, I bring your vision to life through clean, efficient, and beautiful code.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Whether you're looking for a simple website or a complex web application, I'm here to help you achieve your goals.
              </p>
              <Link
                href="/about"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Learn More
              </Link>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
              <Image
                src="/mypicture.png"
                alt="Semik - Web Developer"
                fill
                className="object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 text-center text-white z-10">
                <p className="text-xl font-semibold">Web Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join us today and take the first step towards your digital success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition duration-200 shadow-lg"
            >
              Create Account
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition duration-200"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

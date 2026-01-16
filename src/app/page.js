'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {


  const openWhatsApp = () => {
    window.open('https://wa.me/9779862772457?text=Hey i have visited your website', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-160 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 lg:py-32">
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
                I create a modern websites using django,nextjs and others,I love creting websites
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
              <div className="relative h-100 w-full bg-blue-500/20 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center rounded-[100px] overflow-hidden">
                <Image
                  src="/home.png"
                  alt="Home"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
                
              </div>
<div className="flex items-center gap-35  mt-10 ml-23 ">
  {/* Download CV */}
  <button className="bg-[#020617]  px-4 py-1.5 rounded-lg text-sm font-semibold text-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_18px_rgba(34,211,238,0.9)] hover:scale-105 transition-all duration-300">
    <a href="/" download>
      📄 Download cv
    </a>
  </button>

  {/* Hire Me */}
  <button
    onClick={openWhatsApp}
    className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 rounded-lg text-sm font-semibold text-white shadow-[0_0_10px_rgba(236,72,153,0.6)] hover:shadow-[0_0_18px_rgba(236,72,153,1)] hover:scale-105 transition-all duration-300"
  >
    💬 Hire
  </button>
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
               I create frontend with nextjs,django and others with the experience about 1 to 2 years 
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
                I am experienced developer with the experience abiut 2 years now i want to learn flutter and create a mobile application.I want to succed in my lkife and make my mom dad proud of me.
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

      {/* WhatsApp Floating Button - Bottom Right */}
      <div className="fixed bottom-5 right-5 z-50 animate-fade-in">
        <button
          onClick={() => openWhatsApp('What can I help you with')}
          className="flex items-center gap-3 bg-[#27AE60] hover:bg-[#219653] text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="font-medium">तपाईंलाई के सहयोग गर्न सक्छु ?</span>
        </button>
      </div>
    </div>
  );
}

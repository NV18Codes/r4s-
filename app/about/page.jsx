"use client";
import Link from "next/link";
import { useState } from "react";

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="h-12 w-12 relative">
                <img
                  src="/new_logo.jpeg"
                  alt="RoadsIntel Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="ml-3 text-xl font-bold text-[#005580] hidden sm:block">RoadsIntel</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/about" 
                className="text-[#005580] hover:text-[#004466] font-medium transition-colors duration-200 border-b-2 border-[#005580]"
              >
                About
              </Link>
              <Link 
                href="/community" 
                className="text-[#005580] hover:text-[#004466] font-medium transition-colors duration-200"
              >
                Community
              </Link>
              <Link 
                href="/contact-admin" 
                className="text-[#005580] hover:text-[#004466] font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-[#005580] hover:text-[#004466] font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="bg-[#005580] text-white px-6 py-2 rounded-lg hover:bg-[#004466] transition-colors duration-200 font-medium"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#005580] hover:text-[#004466] hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <Link 
                href="/about" 
                className="block px-3 py-2 text-[#005580] hover:text-[#004466] font-medium bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/community" 
                className="block px-3 py-2 text-[#005580] hover:text-[#004466] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                href="/contact-admin" 
                className="block px-3 py-2 text-[#005580] hover:text-[#004466] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="border-t border-gray-100 pt-2 mt-2">
                <Link 
                  href="/login" 
                  className="block px-3 py-2 text-[#005580] hover:text-[#004466] font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block px-3 py-2 bg-[#005580] text-white rounded-lg hover:bg-[#004466] font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#005580] mb-6">
                About RoadsIntel
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Revolutionizing roads infrastructure maintenance through innovative technology and data-driven solutions
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#005580] mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  To transform the way infrastructure professionals manage roads, assets, and inspections through cutting-edge technology and intuitive design.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  We believe that better data leads to better decisions, and better decisions lead to safer, more efficient road networks that serve communities worldwide.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#005580] rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Streamline road maintenance operations</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#005580] rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Improve inspection accuracy and efficiency</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#005580] rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Enable data-driven decision making</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#005580] to-[#0077b6] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Why Choose RoadsIntel?</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Industry Expertise</h4>
                    <p className="text-blue-100">Built by infrastructure professionals who understand the unique challenges of roads infrastructure maintenance.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Cutting-Edge Technology</h4>
                    <p className="text-blue-100">Leveraging the latest in cloud computing, mobile technology, and data analytics.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Proven Results</h4>
                    <p className="text-blue-100">Trusted by organizations worldwide to improve their roads infrastructure maintenance operations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#005580] mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We continuously push the boundaries of what's possible in roads infrastructure maintenance technology.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Reliability</h3>
                <p className="text-gray-600">
                  Our platform is built for mission-critical operations with enterprise-grade security and uptime.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Collaboration</h3>
                <p className="text-gray-600">
                  We believe in the power of teamwork and work closely with our clients to achieve shared goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#005580] to-[#0077b6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of the future of roads infrastructure maintenance. Start your journey with RoadsIntel today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/signup" 
                className="bg-white text-[#005580] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
              >
                Get Started Free
              </Link>
              <Link 
                href="/contact-admin" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#005580] transition-all duration-200 font-semibold text-lg w-full sm:w-auto"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-blue-100 text-sm">
              © 2025 RoadsIntel. All rights reserved. | <Link href="/privacy" className="hover:text-white">Privacy Policy</Link> | <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
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
                className="text-[#005580] hover:text-[#004466] font-medium transition-colors duration-200"
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
                className="block px-3 py-2 text-[#005580] hover:text-[#004466] font-medium"
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
        <section className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#005580] mb-6 leading-tight">
                Welcome to <span className="text-[#0077b6]">RoadsIntel</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Roads Infrastructure Maintenance System for Modern Infrastructure
              </p>
              <p className="text-base sm:text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                Streamline your road maintenance, inspections, and asset management with our comprehensive digital platform designed for infrastructure professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/signup" 
                  className="bg-[#005580] text-white px-8 py-4 rounded-lg hover:bg-[#004466] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/login" 
                  className="border-2 border-[#005580] text-[#005580] px-8 py-4 rounded-lg hover:bg-[#005580] hover:text-white transition-all duration-200 font-semibold text-lg w-full sm:w-auto"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#005580] mb-4">
                Powerful Features for Roads Infrastructure Maintenance
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage roads, assets, and inspections in one comprehensive platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Asset Management</h3>
                <p className="text-gray-600">
                  Track and manage road assets, equipment, and infrastructure with detailed records and maintenance schedules.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Digital Inspections</h3>
                <p className="text-gray-600">
                  Conduct thorough road inspections with customizable checklists and real-time data collection.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Analytics & Reports</h3>
                <p className="text-gray-600">
                  Generate comprehensive reports and analytics to make data-driven decisions for road maintenance.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Team Collaboration</h3>
                <p className="text-gray-600">
                  Enable seamless collaboration between inspectors, supervisors, and administrators.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Mobile Ready</h3>
                <p className="text-gray-600">
                  Access your data and perform inspections on any device, anywhere, anytime.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Secure & Reliable</h3>
                <p className="text-gray-600">
                  Enterprise-grade security with reliable cloud infrastructure to protect your data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#005580] to-[#0077b6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Roads Infrastructure Maintenance?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of infrastructure professionals who trust RoadsIntel for their roads infrastructure maintenance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/signup" 
                className="bg-white text-[#005580] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
              >
                Start Your Free Trial
              </Link>
              <Link 
                href="/contact-admin" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#005580] transition-all duration-200 font-semibold text-lg w-full sm:w-auto"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 relative mr-3">
                  <img
                    src="/new_logo.jpeg"
                    alt="RoadsIntel Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-white">RoadsIntel</span>
              </div>
              <p className="text-blue-100 text-sm">
                Roads Infrastructure Maintenance System for modern infrastructure professionals.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/integrations" className="hover:text-white">Integrations</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/contact-admin" className="hover:text-white">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/documentation" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/community" className="hover:text-white">Community</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-300 mt-8 pt-8 text-center">
            <p className="text-blue-100 text-sm">
              © 2025 RoadsIntel. All rights reserved. | <Link href="/privacy" className="hover:text-white">Privacy Policy</Link> | <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}


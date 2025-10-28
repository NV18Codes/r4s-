"use client";
import Link from "next/link";
import { useState } from "react";

export default function CommunityPage() {
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
                className="text-[#005580] hover:text-[#004466] font-medium transition-colors duration-200 border-b-2 border-[#005580]"
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
                className="block px-3 py-2 text-[#005580] hover:text-[#004466] font-medium bg-blue-50"
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
                RoadsIntel Community
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect, learn, and grow with infrastructure professionals worldwide
              </p>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="text-4xl font-bold text-[#005580] mb-2">10,000+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="text-4xl font-bold text-[#005580] mb-2">500+</div>
                <div className="text-gray-600">Organizations</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="text-4xl font-bold text-[#005580] mb-2">50+</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="text-4xl font-bold text-[#005580] mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Features */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#005580] mb-4">Community Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join a vibrant community of infrastructure professionals sharing knowledge and best practices
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Discussion Forums</h3>
                <p className="text-gray-600">
                  Engage in meaningful discussions about roads infrastructure maintenance challenges, solutions, and industry trends.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Knowledge Base</h3>
                <p className="text-gray-600">
                  Access a comprehensive library of guides, tutorials, and best practices shared by community experts.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Expert Network</h3>
                <p className="text-gray-600">
                  Connect with industry experts, consultants, and experienced professionals for mentorship and advice.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Case Studies</h3>
                <p className="text-gray-600">
                  Learn from real-world implementations and success stories shared by community members.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Events & Webinars</h3>
                <p className="text-gray-600">
                  Participate in regular webinars, workshops, and virtual events featuring industry leaders.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-[#005580] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#005580] mb-4">Certification Program</h3>
                <p className="text-gray-600">
                  Earn professional certifications and badges to showcase your expertise in roads infrastructure maintenance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#005580] mb-4">Success Stories</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from community members who have transformed their roads infrastructure maintenance operations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#005580] rounded-full flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#005580]">John Davis</h4>
                    <p className="text-sm text-gray-600">City Engineer, Springfield</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "RoadsIntel has revolutionized how we manage our city's road network. The community support and shared knowledge have been invaluable."
                    </p>
                  </div>
                  
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#005580] rounded-full flex items-center justify-center text-white font-bold">
                    SM
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#005580]">Sarah Martinez</h4>
                    <p className="text-sm text-gray-600">Infrastructure Manager, Metro Corp</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The community forums helped us solve complex inspection challenges. The collaborative approach is what makes RoadsIntel special."
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#005580] rounded-full flex items-center justify-center text-white font-bold">
                    RK
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#005580]">Robert Kim</h4>
                    <p className="text-sm text-gray-600">Highway Inspector, State DOT</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Being part of this community has accelerated my professional growth. The knowledge sharing is incredible."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#005580] to-[#0077b6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Community Today
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Connect with thousands of infrastructure professionals and start your journey towards better roads infrastructure maintenance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link 
                      href="/signup" 
                className="bg-white text-[#005580] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                    >
                      Join Community
                    </Link>
                    <Link 
                href="/contact-admin" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#005580] transition-all duration-200 font-semibold text-lg w-full sm:w-auto"
                    >
                Learn More
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
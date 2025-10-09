"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white p-3 sm:p-4 shadow-sm">
        <div className="w-full px-2 sm:px-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <div className="h-6 w-16 sm:h-8 sm:w-24 relative">
              <img
                src="/new_logo.jpeg"
                alt="RoadsIntel Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          <nav className="ml-auto flex items-center gap-2 sm:gap-6">
            <Link href="/about" className="text-[#005580] text-sm sm:text-base font-medium">
              About Us
            </Link>
            <Link href="/community" className="text-[#005580] text-sm sm:text-base">
              Community
            </Link>
            <Link href="/signup" className="nav-button signup-button text-xs sm:text-sm px-3 sm:px-5">
              Signup
            </Link>
            <Link href="/login" className="nav-button login-button text-xs sm:text-sm px-3 sm:px-5">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            {/* Back Button */}
            <div className="mb-6">
              <Link 
                href="/" 
                className="inline-flex items-center text-[#005580] hover:text-[#004466] transition-colors duration-200 group"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-8">About RoadsIntel</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-left">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold text-[#005580] mb-4">Advanced Road Management System</h2>
                
                <p className="text-gray-600 mb-6">
                  RoadsIntel is a comprehensive road management platform designed to revolutionize 
                  infrastructure monitoring and maintenance. Our system provides real-time insights, 
                  predictive analytics, and streamlined workflows for modern road infrastructure management.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-[#005580] mb-3">Our Mission</h3>
                    <p className="text-gray-600">
                      To provide intelligent, data-driven solutions for road infrastructure management, 
                      ensuring safer, more efficient, and sustainable transportation networks.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-[#005580] mb-3">Our Vision</h3>
                    <p className="text-gray-600">
                      To become the leading platform for smart infrastructure management, 
                      empowering organizations to make data-driven decisions for better road networks.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[#005580] mb-4">Key Features</h3>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Real-time road condition monitoring</li>
                  <li>Predictive maintenance scheduling</li>
                  <li>Asset management and tracking</li>
                  <li>Inspection workflow automation</li>
                  <li>Comprehensive reporting and analytics</li>
                  <li>Multi-organization support</li>
                  <li>Mobile-responsive interface</li>
                </ul>

                <div className="bg-[#005580] text-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Get Started Today</h3>
                  <p className="mb-4">
                    Join the future of road infrastructure management. Create your account 
                    and start managing your roads more efficiently.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      href="/signup" 
                      className="bg-white text-[#005580] px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                    >
                      Sign Up Now
                    </Link>
                    <Link 
                      href="/login" 
                      className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#005580] transition-colors font-medium"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

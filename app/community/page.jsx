"use client";

import Link from "next/link";

export default function CommunityPage() {
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
            <Link href="/about" className="text-[#005580] text-sm sm:text-base">
              About Us
            </Link>
            <Link href="/community" className="text-[#005580] text-sm sm:text-base font-medium">
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

            <h1 className="text-4xl font-bold text-gray-900 mb-8">RoadsIntel Community</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-left">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold text-[#005580] mb-4">Join Our Growing Community</h2>
                
                <p className="text-gray-600 mb-6">
                  Connect with infrastructure professionals, share insights, and collaborate 
                  on innovative road management solutions. Our community brings together experts, 
                  engineers, and decision-makers from around the world.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-[#005580] mb-3">Community Benefits</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Access to expert knowledge and best practices</li>
                      <li>Collaborative problem-solving forums</li>
                      <li>Regular webinars and training sessions</li>
                      <li>Early access to new features and updates</li>
                      <li>Networking opportunities with industry leaders</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-[#005580] mb-3">Get Involved</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Share your success stories</li>
                      <li>Participate in case studies</li>
                      <li>Contribute to knowledge base</li>
                      <li>Attend virtual meetups</li>
                      <li>Mentor new users</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[#005580] mb-4">Community Resources</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#005580] mb-2">Documentation</h4>
                    <p className="text-gray-600 text-sm">
                      Comprehensive guides and tutorials to help you get the most out of RoadsIntel.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#005580] mb-2">Support Forum</h4>
                    <p className="text-gray-600 text-sm">
                      Get help from our community and support team for any questions or issues.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#005580] mb-2">News & Updates</h4>
                    <p className="text-gray-600 text-sm">
                      Stay informed about new features, improvements, and industry news.
                    </p>
                  </div>
                </div>

                <div className="bg-[#005580] text-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Ready to Join?</h3>
                  <p className="mb-4">
                    Become part of the RoadsIntel community and connect with infrastructure 
                    professionals worldwide. Start your journey today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      href="/signup" 
                      className="bg-white text-[#005580] px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                    >
                      Join Community
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

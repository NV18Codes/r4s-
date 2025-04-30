import type React from "react"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white p-4 shadow-sm">
        <div className="w-full px-4 flex items-center">
          
            <Link href="/dashboard" className="flex-shrink-0">
              <div className="h-8 w-24 relative">
                <img
                  src="/logo.jpg"
                  alt="R4S Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>

            <nav className="ml-auto flex items-center gap-6 mr-0">
              <Link 
                href="/dashboard/organizations" 
                className="text-[#005580] hover:text-[#003d5c] font-medium transition-colors"
              >
                Organizations
              </Link>
            </nav>

            <nav className="ml-4 flex items-center gap-6 mr-5">
              <Link 
                href="/dashboard/users" 
                className="text-[#005580] hover:text-[#003d5c] font-medium transition-colors"
              >
               Users
              </Link>
            </nav>

            <nav className="ml-1 flex items-center gap-6 mr-5">
              <Link 
                href="/dashboard/reports" 
                className="text-[#005580] hover:text-[#003d5c] font-medium transition-colors"
              >
               Reports
              </Link>
            </nav>
          

          <div className="flex items-center gap-6">
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/dashboard/profile">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gray-300 rounded-full overflow-hidden">
                  {/* Profile image would go here */}
                </div>
                <div className="flex flex-col">
                  <span className="text-[#005580] font-medium">Abraham</span>
                  <span className="text-xs text-gray-500">Technical Director</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow py-6">
        <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-12rem)]">
          {children}
        </div>
      </main>

      <footer className="mt-auto bg-gradient-to-b from-[#005580] to-[#0077b6]">
        <div className="py-4">
          <p className="text-center text-white text-sm">2025 R4S ALL RIGHT RESERVED | Privacy Policy</p>
        </div>
      </footer>
    </div>
  )
}

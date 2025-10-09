import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="h-16 w-16 relative">
                <img
                  src="/new_logo.jpeg"
                  alt="RoadsIntel Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-[#005580] mb-6 leading-tight">
            Welcome to <span className="text-[#0077b6]">RoadsIntel</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Advanced Road Management System for Modern Infrastructure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/login" 
              className="bg-[#005580] text-white px-8 py-4 rounded-lg hover:bg-[#004466] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>

    </div>
  )
}


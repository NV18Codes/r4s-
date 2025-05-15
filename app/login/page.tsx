import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-white p-4 shadow-sm sticky top-0 z-50 w-full">
        <div className="px-4 lg:px-8 flex justify-between items-center h-16 w-full">
        <Link href="/dashboard" className="flex-shrink-0">
              <div className="h-8 w-24 relative">
                <img
                  src="/logo.jpg"
                  alt="R4S Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-[#005580]">
              About Us
            </Link>
            <Link href="/community" className="text-[#005580]">
              Community
            </Link>
            <Link href="/signup" className="nav-button signup-button">
              Signup
            </Link>
            <Link href="/login" className="nav-button login-button">
              Login
            </Link>
          </nav>
        </div>
      </header> */}

      <header className="bg-white p-4 shadow-sm">
        <div className="w-full px-4 flex items-center">
          <Link href="/dashboard" className="flex-shrink-0">
            <div className="h-8 w-24 relative">
              <img
                src="/new_logo.jpeg"
                alt="R4S Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          <nav className="ml-auto flex items-center gap-6">
            <Link href="/about" className="text-[#005580]">
              About Us
            </Link>
            <Link href="/community" className="text-[#005580]">
              Community
            </Link>
            <Link href="/signup" className="nav-button signup-button">
              Signup
            </Link>
            <Link href="/login" className="nav-button login-button">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="container mx-auto max-w-6xl relative">
          <div className="login-container p-10 mx-auto max-w-3xl relative">
            <h1 className="text-white text-3xl font-bold text-center mb-8">
              LOGIN
            </h1>

            <div className="mb-6">
              <label htmlFor="email" className="block text-white mb-2">
                User Name
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Id"
                className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••••••••••••••••••••"
                className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
              />
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <span className="text-white">🔒</span>
                <Link
                  href="/forgot-password"
                  className="text-white hover:underline"
                >
                  Forget Password?
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">🔧</span>
                <Link
                  href="/contact-admin"
                  className="text-white hover:underline"
                >
                  Contact Admin
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                href="/dashboard/spaces"
                className="bg-[#005580] text-white py-3 px-10 rounded-full hover:bg-[#004466] transition"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 hidden md:block">
            {/* Construction worker image would be placed here */}
            <div className="h-64 w-64 bg-transparent"></div>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <p>2025 RoadsIntel ALL RIGHT RESERVED | Privacy Policy</p>
      </footer>
    </div>
  );
}

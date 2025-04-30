import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white p-4 shadow-sm">
        <div className="w-full px-4 flex items-center justify-between h-16">
        <Link href="/dashboard" className="flex-shrink-0">
  <div className="h-8 w-24 relative">
    <img
      src="/logo.jpg"
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
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#005580] mb-6">Welcome to R4S</h1>
          <p className="text-lg mb-8">Road Management System</p>
          <div className="flex gap-4 justify-center">
            <Link href="/login" className="primary-button">
              Login
            </Link>
            <Link href="/signup" className="nav-button signup-button">
              Sign Up
            </Link>
          </div>
        </div>
      </main>

    </div>
  )
}

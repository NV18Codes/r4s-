// app/components/Navbar.jsx
import Link from "next/link";

export default function Navbar({ user }) {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#005580]">RoadsIntel</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/about" className="text-[#005580] hover:underline">
            About Us
          </Link>
          <Link href="/community" className="text-[#005580] hover:underline">
            Community
          </Link>

          {user ? (
            <>
              <Link href="/dashboard/spaces" className="nav-button">
                Dashboard
              </Link>
              <Link href="/profile" className="nav-button">
                Profile
              </Link>
              <div className="flex items-center gap-2">
                {user.avatarUrl && (
                  <img
                    src={user.avatarUrl}
                    alt={`${user.name}'s avatar`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-[#005580] font-medium">{user.name}</span>
              </div>
              <Link href="/logout" className="nav-button">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup" className="nav-button signup-button">
                Signup
              </Link>
              <Link href="/login" className="nav-button login-button">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}


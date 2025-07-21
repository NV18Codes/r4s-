"use client"
import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../AuthContext";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter();
  const { user, token, logout, hydrated } = useAuth();

  useEffect(() => {
    if (hydrated && !token) {
      logout(); // clear any stale user data
      router.replace("/login");
    }
  }, [token, hydrated, logout, router]);

  if (!hydrated) {
    return null; // or a loading spinner
  }

  const handleLogout = async () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white p-4 shadow-sm border-b border-black-200">
        <div className="w-full px-4 flex items-center">
          <Link href="/" className="flex-shrink-0">
            <div className="h-8 w-24 relative">
              <img
                src="/new_logo.jpeg"
                alt="R4S Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          <div className="flex items-center gap-6 ml-auto">
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
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

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#005580] rounded-xl shadow-lg py-1 z-50">
                  <Link 
                    href="/dashboard/asset-types" 
                    className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-t-xl"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Asset Types
                  </Link>
                  <Link 
                    href="" 
                    className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-t-xl"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Properties
                  </Link>
                  <Link 
                    href="" 
                    className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-t-xl"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Space Types
                  </Link>
                  <Link 
                    href="/dashboard/spaces" 
                    className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-t-xl"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Spaces
                  </Link>
                  <Link 
                    href="/dashboard/organizations" 
                    className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-t-xl"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Organizations
                  </Link>
                  <Link 
                    href="/dashboard/users" 
                    className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Users
                  </Link>
                  <Link 
                    href="/dashboard/reports" 
                    className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-b-xl"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Reports
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 border-t border-white/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <Link href="/dashboard/profile">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gray-300 rounded-full overflow-hidden">
                  {/* Profile image would go here */}
                </div>
                <div className="flex flex-col">
                  <span className="text-[#005580] font-medium">{user ? `${user.firstName} ${user.lastName}` : "Admin"}</span>
                  <span className="text-xs text-gray-500">{user?.role || "Super User"}</span>
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

      <main className="flex-grow py-0">
        <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-12rem)]">
          {children}
        </div>
      </main>

      <footer className="mt-auto bg-gradient-to-b from-[#005580] to-[#0077b6]">
        <div className="py-4">
          <p className="text-center text-white text-sm">2025 RoadsIntel ALL RIGHT RESERVED | Privacy Policy</p>
        </div>
      </footer>
    </div>
  )
}

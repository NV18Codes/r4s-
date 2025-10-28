"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../AuthContext";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header - Sticky (Stays at top on scroll) */}
      <header className="sticky top-0 bg-white border-b border-gray-200 h-20 flex-shrink-0 shadow-sm z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo - Left */}
            <Link href="/dashboard" className="flex items-center">
                <img
                  src="/new_logo.jpeg"
                  alt="RoadsIntel Logo"
              className="h-16 w-auto object-contain"
                />
            </Link>

          {/* User Name and Role - Center/Right */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard/profile" className="text-right hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors cursor-pointer">
              <p className="text-base font-semibold text-gray-900 hover:text-[#005580] transition-colors">
                {user ? `${user.firstName} ${user.lastName}` : "Admin"}
              </p>
              <p className="text-sm text-gray-500">
                {user?.role || user?.globalRoleName || "Super User"}
              </p>
            </Link>
            
            {/* Sign Out Button - Right */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Wrapper with Sidebar */}
      <div className="flex flex-1 min-h-0">
        {/* Desktop Sidebar - Clean & Simple */}
        <aside className={`hidden lg:flex lg:flex-col bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
          {/* Collapse Toggle - Simple Arrow */}
          <div className="flex-shrink-0 h-12 border-b border-gray-200 flex items-center justify-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-[#005580] hover:bg-gray-100 rounded-lg transition-all"
              title={isSidebarOpen ? "Collapse" : "Expand"}
            >
              {isSidebarOpen ? (
                <span className="text-lg font-bold">&lt;</span>
              ) : (
                <span className="text-lg font-bold">&gt;</span>
              )}
            </button>
        </div>

          {/* Navigation Links - Clean & Scrollable */}
          <nav className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar bg-white">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm"
            title="Dashboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link 
            href="/dashboard/spaces" 
            className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm"
            title="Spaces"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            {isSidebarOpen && <span>Spaces</span>}
          </Link>
          <Link href="/dashboard/space-types" className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm" title="Space Types">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            {isSidebarOpen && <span>Space Types</span>}
          </Link>
          <Link href="/dashboard/assets" className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm" title="Assets">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            {isSidebarOpen && <span>Assets</span>}
          </Link>
          <Link href="/dashboard/asset-types" className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm" title="Asset Types">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            {isSidebarOpen && <span>Asset Types</span>}
          </Link>
          <Link href="/dashboard/properties" className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm" title="Properties">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            {isSidebarOpen && <span>Properties</span>}
          </Link>
          <Link href="/dashboard/organizations" className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm" title="Organizations">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            {isSidebarOpen && <span>Organizations</span>}
          </Link>
          <Link href="/dashboard/users" className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm" title="Users">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>
            {isSidebarOpen && <span>Users</span>}
          </Link>
          <Link href="/dashboard/inspections" className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm" title="Inspections">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            {isSidebarOpen && <span>Inspections</span>}
          </Link>
          <Link href="/dashboard/map" className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm" title="Map">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            {isSidebarOpen && <span>Map</span>}
          </Link>
          <Link href="/dashboard/checklists" className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm" title="Checklists">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            {isSidebarOpen && <span>Checklists</span>}
          </Link>
          <Link href="/dashboard/work-orders" className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm" title="Work Orders">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {isSidebarOpen && <span>Work Orders</span>}
          </Link>
          <Link href="/dashboard/reports" className="flex items-center gap-3 px-3 py-2.5 mx-1 text-gray-700 hover:bg-[#005580] hover:text-white rounded-md transition-all font-medium text-sm" title="Reports">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            {isSidebarOpen && <span>Reports</span>}
          </Link>
        </nav>
      </aside>

      {/* Mobile Menu Button - Positioned in Header Area */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-6 left-4 z-50 text-[#005580] hover:text-[#0077b6] transition-colors p-2 rounded-lg bg-white shadow-lg border border-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>


      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-xl lg:hidden animate-slide-in">
            {/* Close button at top of menu */}
            <div className="p-4 flex justify-end border-b border-gray-100 flex-shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
              <Link 
                href="/dashboard" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </Link>
              <Link 
                href="/dashboard/spaces" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Spaces</span>
              </Link>
              <Link 
                href="/dashboard/space-types" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Space Types</span>
              </Link>
              <Link 
                href="/dashboard/assets" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Assets</span>
              </Link>
              <Link 
                href="/dashboard/asset-types" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Asset Types</span>
              </Link>
              <Link 
                href="/dashboard/properties" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Properties</span>
              </Link>
              <Link 
                href="/dashboard/organizations" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Organizations</span>
              </Link>
              <Link 
                href="/dashboard/users" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span>Users</span>
              </Link>
              <Link 
                href="/dashboard/inspections" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>Inspections</span>
              </Link>
              <Link 
                href="/dashboard/map" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Map</span>
              </Link>
              <Link 
                href="/dashboard/checklists" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>Checklists</span>
              </Link>
              <Link 
                href="/dashboard/work-orders" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Work Orders</span>
              </Link>
              <Link 
                href="/dashboard/reports" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Reports</span>
              </Link>
              <div className="border-t border-gray-100 my-4"></div>
              <Link 
                href="/dashboard/profile" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center space-x-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </>
      )}

        {/* Main Display Area - Scrollable */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 custom-scrollbar">
          {children}
        </main>
      </div>
      
      {/* Footer - FULL WIDTH across entire bottom */}
      <footer className="bg-gradient-to-r from-[#005580] to-[#0077b6] text-white py-4 border-t border-gray-300 flex-shrink-0">
        <div className="px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <img src="/new_logo.jpeg" alt="RoadsIntel" className="h-8 w-auto" />
              <div className="text-sm">
                <p className="font-semibold">RoadsIntel</p>
                <p className="text-xs text-white/80">Roads Infrastructure Maintenance System</p>
              </div>
            </div>
            
            <div className="text-center sm:text-right">
              <p className="text-sm font-medium">© 2025 RoadsIntel. All Rights Reserved.</p>
              <p className="text-xs text-white/80 mt-0.5">Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getApiUrl } from "../../lib/api-config";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    roleName: "",
    firstName: "",
    lastName: "",
    organizationName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  // Valid roles from the backend API
  const availableRoles = [
    "SuperUser",
    "Admin", 
    "Inspector",
    "Supervisor",
    "Viewer"
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Quick validation checks
    if (!formData.roleName) {
      toast.error("Please select a role!");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);
    
    // Debug: Log what we're sending
    console.log("Sending signup data:", formData);
    
    try {
      // Use the centralized API configuration
      const res = await fetch(getApiUrl('/api/User/signup'), {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      // Debug logging
      console.log("Signup response:", data);
      console.log("Response status:", res.status);

      if (res.ok && data?.meta?.status === "Success") {
        toast.success(data?.data?.message || "Signup successful!", {
          duration: 2000
        });
        // Redirect immediately after successful signup
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } else {
        const errorMessage = data?.meta?.messages?.[0]?.text || data?.detail || data?.title || "Signup failed. Please try again.";
        console.error("Signup error:", errorMessage);
        console.error("Full error data:", data);
        console.error("Response status:", res.status);
        console.error("Response headers:", res.headers);
        toast.error(`Signup failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error details:', error);
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
          <div className="login-container p-10 mx-auto max-w-4xl relative">
            {/* Back Button */}
            <div className="mb-6">
              <Link 
                href="/login" 
                className="inline-flex items-center text-white hover:text-[#90e0ef] transition-colors duration-200 group"
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
                <span className="text-sm font-medium">Back to Login</span>
              </Link>
            </div>
            
            <h1 className="text-white text-3xl font-bold text-center mb-8">SIGNUP</h1>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="roleName" className="block text-white mb-2">
                    Select Role <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="roleName"
                    value={formData.roleName}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded bg-[#90e0ef30] text-white border-none focus:outline-none focus:ring-2 focus:ring-[#005580]"
                    required
                  >
                    <option value="" className="bg-gray-800 text-white">Choose a role...</option>
                    {availableRoles.map((role) => (
                      <option key={role} value={role} className="bg-gray-800 text-white">
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="firstName" className="block text-white mb-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-white mb-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="organizationName" className="block text-white mb-2">
                    Organisation <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    placeholder="Organisation Name"
                    className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Email Id"
                    className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-white mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Phone Number"
                    className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-white mb-2">
                    Address <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter Address"
                    rows={4}
                    className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none resize-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="password" className="block text-white mb-2">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full p-3 pr-12 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-white mb-2">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-Enter Password"
                      className="w-full p-3 pr-12 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="bg-[#005580] text-white py-3 px-10 rounded-full hover:bg-[#004466] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#005580] focus:ring-offset-2"
                  disabled={loading}
                  style={{ 
                    cursor: loading ? 'not-allowed' : 'pointer',
                    minHeight: '48px',
                    minWidth: '120px'
                  }}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>
          </div>

          <div className="absolute top-0 right-0 bottom-0 hidden md:block">
            {/* Surveyor image would be placed here */}
            <div className="h-full w-64 bg-transparent"></div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>2025 RoadsIntel ALL RIGHT RESERVED | Privacy Policy</p>
      </footer>
    </div>
  );
}

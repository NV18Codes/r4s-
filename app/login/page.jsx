"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "../AuthContext";
import LoadingButton from "../../components/ui/loading-button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For static export, call backend directly
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://your-backend-url.com';
      const res = await fetch(`${backendUrl}/api/v1/User/signin`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok && data?.meta?.status === "Success" && data?.data?.token && data?.data?.user) {
        console.log("Login successful, setting auth and redirecting...");
        console.log("User data:", data.data.user);
        console.log("Token:", data.data.token);
        
        setAuth(data.data.user, data.data.token);
        
        // Check if cookie was set
        console.log("Cookie after setAuth:", document.cookie);
        toast.success(data?.data?.message || "Login successful!", {
          duration: 2000
        });
        
        // Redirect immediately after successful login
        console.log("Starting redirect to /dashboard...");
        setTimeout(() => {
          console.log("Executing redirect...");
          router.push("/dashboard");
        }, 1000);
      } else {
        const errorMessage = data?.meta?.messages?.[0]?.text || data?.detail || "Login failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white p-3 sm:p-4 shadow-sm">
        <div className="w-full px-2 sm:px-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex-shrink-0">
            <div className="h-6 w-16 sm:h-8 sm:w-24 relative">
              <img
                src="/new_logo.jpeg"
                alt="R4S Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          <nav className="ml-auto flex items-center gap-2 sm:gap-6">
            <Link href="/about" className="text-[#005580] text-sm sm:text-base hidden sm:inline">
              About Us
            </Link>
            <Link href="/community" className="text-[#005580] text-sm sm:text-base hidden sm:inline">
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

      <main className="flex-grow flex items-center justify-center p-2 sm:p-4">
        <div className="container mx-auto max-w-6xl relative w-full">
          <div className="login-container p-6 sm:p-8 md:p-10 mx-auto max-w-3xl relative">
            {/* Back Button */}
            <div className="mb-4 sm:mb-6">
              <Link 
                href="/" 
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
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
            </div>
            
            <h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
              LOGIN
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 sm:mb-6">
                <label htmlFor="email" className="block text-white mb-2 text-sm sm:text-base">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email Id"
                  className="w-full p-2 sm:p-3 text-sm sm:text-base rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 sm:mb-6">
                <label htmlFor="password" className="block text-white mb-2 text-sm sm:text-base">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••••••••••••••••••••"
                    className="w-full p-2 sm:p-3 pr-10 sm:pr-12 text-sm sm:text-base rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
                <div className="flex items-center gap-2">
                  <span className="text-white">🔒</span>
                  <Link
                    href="/forgot-password"
                    className="text-white hover:underline text-xs sm:text-sm"
                  >
                    Forget Password?
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white">🔧</span>
                  <Link
                    href="/contact-admin"
                    className="text-white hover:underline text-xs sm:text-sm"
                  >
                    Contact Admin
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <LoadingButton
                  type="submit"
                  loading={loading}
                  className="py-3 px-8 sm:px-10 rounded-full text-sm sm:text-base w-full sm:w-auto"
                >
                  Login
                </LoadingButton>
              </div>
            </form>
          </div>

          <div className="absolute bottom-0 right-0 hidden lg:block">
            {/* Construction worker image would be placed here */}
            <div className="h-48 w-48 xl:h-64 xl:w-64 bg-transparent"></div>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <p className="text-xs sm:text-sm px-4">2025 RoadsIntel ALL RIGHT RESERVED | Privacy Policy</p>
      </footer>
    </div>
  );
}

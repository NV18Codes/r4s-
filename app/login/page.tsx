"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Login successful!", {
          duration: 2000,
          onAutoClose: () => {
            router.push("/dashboard/spaces");
          },
        });
      } else {
        toast.error(data?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            {error && (
              <div className="mb-4 text-red-400 text-center">{error}</div>
            )}
            {success && (
              <div className="mb-4 text-green-400 text-center">{success}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-white mb-2">
                  User Name
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email Id"
                  className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
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
                <button
                  type="submit"
                  className="bg-[#005580] text-white py-3 px-10 rounded-full hover:bg-[#004466] transition disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
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

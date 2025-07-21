"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    roleName: "",
    name: "",
    organizationName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful response matching the API structure
      const mockResponse = {
        meta: {
          status: "Success",
          messages: [
            {
              code: "Success",
              level: "Info",
              text: null
            }
          ]
        },
        paging: null,
        data: {
          message: "User details registered successfully"
        }
      };

      // Simulate API call
      console.log('Form submitted with data:', formData);
      
      // Show success toast
      toast.success(mockResponse.data.message, {
        duration: 2000,
        onAutoClose: () => {
          router.push('/login');
        }
      });

    } catch (error) {
      console.error('Error details:', error);
      toast.error(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
            <h1 className="text-white text-3xl font-bold text-center mb-8">SIGNUP</h1>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="roleName" className="block text-white mb-2">
                    Select Role
                  </label>
                  <input
                    type="text"
                    id="roleName"
                    value={formData.roleName}
                    onChange={handleInputChange}
                    placeholder="Search Role"
                    className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="organizationName" className="block text-white mb-2">
                    Organisation
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
                    Email
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
                    Phone Number
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
                    Address
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
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-white mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-Enter Password"
                    className="w-full p-3 rounded bg-[#90e0ef30] text-white placeholder-[#ffffff80] border-none"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="bg-[#005580] text-white py-3 px-10 rounded-full hover:bg-[#004466] transition"
                >
                  Sign Up
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

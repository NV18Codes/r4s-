"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactAdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white p-3 sm:p-4 shadow-sm">
        <div className="w-full px-2 sm:px-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <div className="h-6 w-16 sm:h-8 sm:w-24 relative">
              <img
                src="/new_logo.jpeg"
                alt="RoadsIntel Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          <nav className="ml-auto flex items-center gap-2 sm:gap-6">
            <Link href="/about" className="text-[#005580] text-sm sm:text-base">
              About Us
            </Link>
            <Link href="/community" className="text-[#005580] text-sm sm:text-base">
              Community
            </Link>
            <Link href="/contact-admin" className="text-[#005580] text-sm sm:text-base font-medium">
              Contact Admin
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

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center">
            {/* Back Button */}
            <div className="mb-6">
              <Link 
                href="/" 
                className="inline-flex items-center text-[#005580] hover:text-[#004466] transition-colors duration-200 group"
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

            <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Admin</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-[#005580] mb-4">Get in Touch</h2>
                
                <p className="text-gray-600 mb-6">
                  Have questions, suggestions, or need support? Our admin team is here to help. 
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
                      placeholder="Your organization name"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
                      placeholder="Please describe your inquiry in detail..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-[#005580] text-white py-3 px-6 rounded-lg hover:bg-[#004466] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                    
                    <Link 
                      href="/login" 
                      className="flex-1 border border-[#005580] text-[#005580] py-3 px-6 rounded-lg hover:bg-[#005580] hover:text-white transition-colors font-medium text-center"
                    >
                      Login to Dashboard
                    </Link>
                  </div>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-[#005580] mb-3">Alternative Contact Methods</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <strong>Email:</strong> admin@roadsintel.com
                    </div>
                    <div>
                      <strong>Response Time:</strong> Within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

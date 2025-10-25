"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../AuthContext";
import { toast } from "sonner";
import Link from "next/link";
import { getApiUrl } from "../../../../lib/api-config";

export default function EditProfilePage() {
  const { user, token, setAuth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [form, setForm] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        userId: user.userId || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(getApiUrl("/api/profile/GetProfile"), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const data = await res.json();
        
        if (res.ok && data?.meta?.status === "Success" && data.data) {
          setProfileImage(data.data);
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const handleImageUpload = async (e) => {
    console.log("=== handleImageUpload called (Edit Profile) ===");
    console.log("Event:", e);
    console.log("Files:", e.target.files);
    
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Add userId to the FormData
      if (user?.userId) {
        formData.append('userId', user.userId);
        console.log("Added userId to FormData:", user.userId);
      } else {
        console.warn("No userId found in user object:", user);
        toast.error("User ID not found. Please refresh and try again.");
        setUploadingImage(false);
        return;
      }

      console.log("Uploading to /api/profile/uploadImage with userId:", user.userId);

      const res = await fetch(getApiUrl("/api/profile/uploadImage"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      console.log("=== UPLOAD RESPONSE (Edit Profile) ===");
      console.log("Status:", res.status);
      console.log("Response:", data);
      console.log("Meta status:", data?.meta?.status);
      console.log("Image data:", data?.data);

      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Profile image uploaded successfully!");
        setProfileImage(data.data);
        console.log("✅ Image uploaded successfully, URL/data:", data.data);
      } else {
        const errorMsg = data?.meta?.messages?.[0]?.text || data?.meta?.messages?.[0]?.message || data?.error || "Failed to upload image";
        toast.error(errorMsg);
        console.error("❌ Upload failed:", errorMsg, "Full response:", data);
      }
    } catch (err) {
      console.error("Upload image error:", err);
      toast.error("An error occurred while uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName) {
      toast.error("First name and last name are required");
      return;
    }

    setLoading(true);
    try {
      console.log("Updating profile with:", form);

      const res = await fetch(getApiUrl("/api/user"), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Update profile response:", data);

      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Profile updated successfully!", {
          duration: 2000
        });
        
        // Update the auth context with new user data
        if (data.data) {
          setAuth(data.data, token);
        }

        setTimeout(() => {
          router.push("/dashboard/profile");
        }, 1000);
      } else {
        const errorMessage = data?.meta?.messages?.[0]?.text || data?.detail || "Failed to update profile";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Update profile error:', err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/dashboard/profile" className="text-[#005580] hover:underline mb-4 inline-block">
          ← Back to Profile
        </Link>
        <h1 className="text-2xl font-bold text-[#005580]">Edit Profile</h1>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm max-w-3xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative h-32 w-32 mb-4">
              <div className="w-full h-full bg-gray-300 rounded-full overflow-hidden ring-4 ring-gray-100 shadow-lg">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-[#005580] to-[#0077b6]">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                )}
              </div>
              <input
                id="edit-profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploadingImage}
              />
              <label 
                htmlFor="edit-profile-image-upload"
                className="absolute bottom-0 right-0 bg-[#005580] rounded-full p-3 cursor-pointer shadow-xl hover:bg-[#004466] transition-all transform hover:scale-110 border-4 border-white"
                style={{ zIndex: 50 }}
                onClick={() => console.log("Edit profile label clicked!")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
              {uploadingImage && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center" style={{ zIndex: 100 }}>
                  <div className="spinner"></div>
                </div>
              )}
            </div>
            
            {/* Alternative: Visible Upload Button */}
            <button
              type="button"
              onClick={() => document.getElementById('edit-profile-image-upload').click()}
              className="mb-2 px-4 py-2 bg-[#005580] text-white rounded-lg hover:bg-[#004466] transition-colors font-medium text-sm"
              disabled={uploadingImage}
            >
              {uploadingImage ? "Uploading..." : "Upload Profile Picture"}
            </button>
            <p className="text-xs text-gray-400 mt-1">Max size: 5MB • Formats: JPG, PNG, GIF</p>
          </div>

          <div className="border-t border-gray-200 pt-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-[#005580] font-medium mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-[#005580] font-medium mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-[#005580] font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Enter phone number"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-[#005580] font-medium mb-2">
              Address
            </label>
            <textarea
              id="address"
              placeholder="Enter address"
              rows={4}
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580] resize-none"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Read-only Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Email:</span> {user?.emailId || "N/A"}</p>
              <p><span className="font-medium">Role:</span> {user?.role || "N/A"}</p>
              <p><span className="font-medium">Organization:</span> {user?.organizationName || "N/A"}</p>
              <p><span className="font-medium">User ID:</span> {user?.userId || "N/A"}</p>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link
              href="/dashboard/profile"
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="bg-[#005580] text-white px-6 py-2 rounded hover:bg-[#004466] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

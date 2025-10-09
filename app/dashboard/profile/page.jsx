"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { toast } from "sonner";
import Link from "next/link";

export default function ProfilePage() {
  const { user, token } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Fetch profile image/data from backend
        const res = await fetch("/api/profile/GetProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const data = await res.json();
        
        if (res.ok && data?.meta?.status === "Success") {
          setProfileImage(data.data); // This will be the image URL or data
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const handleImageUpload = async (e) => {
    console.log("=== handleImageUpload called ===");
    console.log("Event:", e);
    console.log("Files:", e.target.files);
    
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    console.log("=== IMAGE UPLOAD START ===");
    console.log("File name:", file.name);
    console.log("File type:", file.type);
    console.log("File size:", file.size, "bytes");

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

      console.log("Uploading to /api/profile/uploadImage");
      console.log("Token present:", !!token);
      console.log("User ID:", user.userId);

      const res = await fetch("/api/profile/uploadImage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      console.log("=== UPLOAD RESPONSE ===");
      console.log("Status:", res.status);
      console.log("Response:", data);
      console.log("Meta status:", data?.meta?.status);
      console.log("Image data:", data?.data);

      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Profile image uploaded successfully!");
        setProfileImage(data.data);
        console.log("Image uploaded successfully, URL/data:", data.data);
      } else {
        const errorMsg = data?.meta?.messages?.[0]?.text || data?.meta?.messages?.[0]?.message || "Failed to upload image";
        toast.error(errorMsg);
        console.error("Upload failed:", errorMsg);
      }
    } catch (err) {
      console.error("Upload image error:", err);
      toast.error("An error occurred while uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#005580]">Profile</h1>
        <div className="flex gap-3">
          <Link href="/dashboard/profile/change-password" className="border border-[#005580] text-[#005580] px-4 py-2 rounded hover:bg-[#005580] hover:text-white transition inline-block">
            Change Password
          </Link>
          <Link href="/dashboard/profile/edit" className="bg-[#005580] text-white px-4 py-2 rounded hover:bg-[#004466] transition inline-block">
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="profile-sidebar p-6 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white">
            <div className="relative h-32 w-32 mb-4">
              <div className="w-full h-full bg-gray-300 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
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
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploadingImage}
              />
              <label 
                htmlFor="profile-image-upload"
                className="absolute bottom-0 right-0 bg-[#005580] rounded-full p-3 cursor-pointer shadow-xl hover:bg-[#004466] transition-all transform hover:scale-110 border-4 border-white"
                style={{ zIndex: 50 }}
                onClick={() => console.log("Label clicked!")}
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
              onClick={() => document.getElementById('profile-image-upload').click()}
              className="mb-2 px-4 py-2 bg-[#005580] text-white rounded-lg hover:bg-[#004466] transition-colors font-medium text-sm"
              disabled={uploadingImage}
            >
              {uploadingImage ? "Uploading..." : "Upload Profile Picture"}
            </button>
            <p className="text-xs text-gray-500 text-center mb-2">or click the blue icon above</p>
            
            <h2 className="text-xl font-medium mb-1">
              {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
            </h2>
            <p className="text-sm mb-4">{user?.role || "-"}</p>

            <div className="bg-white text-[#005580] px-4 py-1 rounded-full mb-8 border border-[#005580]">
              {user?.role || "-"}
            </div>

            <div className="w-full border-t border-white/20 my-4"></div>

            <div className="w-full space-y-4">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">{user?.address || "No address"}</span>
              </div>

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-sm break-all">{user?.emailId || "No email"}</span>
              </div>

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm">{user?.phoneNumber || "No phone"}</span>
              </div>

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">{user?.organizationName || "No organization"}</span>
              </div>

              {user?.createdDate && (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Joined: {new Date(user.createdDate).toLocaleDateString()}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className={`text-sm px-2 py-1 rounded ${
                  user?.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user?.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-[#005580]">User Information</h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">User ID</label>
                  <p className="text-gray-900 font-mono text-sm">{user?.userId || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Organization ID</label>
                  <p className="text-gray-900 font-mono text-sm">{user?.orgId || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">First Name</label>
                  <p className="text-gray-900">{user?.firstName || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Name</label>
                  <p className="text-gray-900">{user?.lastName || "-"}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <p className="text-gray-900">{user?.emailId || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-gray-900">{user?.phoneNumber || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Role</label>
                  <p className="text-gray-900">{user?.role || "-"}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900">{user?.address || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../../../AuthContext";
import Link from "next/link";
import LoadingButton from "../../../../components/ui/loading-button";

export default function AddSpacePage() {
  const [form, setForm] = useState({
    name: "",
    orgName: "",
    location: "",
    status: "Active",
    longitude: "",
    latitude: "",
  });
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orgsLoading, setOrgsLoading] = useState(true);
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrganizations = async () => {
      setOrgsLoading(true);
      try {
        const res = await fetch("/api/organization", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const data = await res.json();
        
        if (res.ok && data?.meta?.status === "Success" && Array.isArray(data.data)) {
          setOrganizations(data.data);
        } else {
          setOrganizations([]);
        }
      } catch (err) {
        setOrganizations([]);
      } finally {
        setOrgsLoading(false);
      }
    };

    if (token) {
      fetchOrganizations();
    }
  }, [token]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.orgName || !form.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      console.log("=== CREATE SPACE REQUEST ===");
      console.log("Form data:", form);
      console.log("Name:", form.name);
      console.log("OrgName:", form.orgName);
      console.log("Location:", form.location);
      console.log("Status:", form.status);
      console.log("Latitude:", form.latitude);
      console.log("Longitude:", form.longitude);

      const res = await fetch("/api/space", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      console.log("=== CREATE SPACE RESPONSE ===");
      console.log("Response data:", data);
      console.log("Response status:", res.status);
      console.log("Meta:", data?.meta);
      console.log("Meta status:", data?.meta?.status);
      console.log("Messages:", data?.meta?.messages);
      console.log("Data:", data?.data);
      
      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Space created successfully!", {
          duration: 2000
        });
        setTimeout(() => {
          router.push("/dashboard/spaces");
          router.refresh(); // Force refresh the page
        }, 1000);
      } else {
        const errorMessage = data?.meta?.messages?.[0]?.text || data?.detail || "Failed to create space";
        console.error("=== CREATE SPACE FAILED ===");
        console.error("Error message:", errorMessage);
        console.error("Full response:", data);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Create space error:', err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/dashboard/spaces" className="text-[#005580] hover:underline mb-4 inline-block">
          ← Back to Spaces
        </Link>
        <h1 className="text-2xl font-bold text-[#005580]">Add New Workspace</h1>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm max-w-3xl">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-[#005580] font-medium mb-2">
              Space Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter space name"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="orgName" className="block text-[#005580] font-medium mb-2">
              Organization <span className="text-red-500">*</span>
            </label>
            <select
              id="orgName"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.orgName}
              onChange={handleChange}
              required
              disabled={orgsLoading}
            >
              <option value="">Choose organization...</option>
              {orgsLoading ? (
                <option disabled>Loading organizations...</option>
              ) : (
                organizations.map((org) => (
                  <option key={org.orgId} value={org.name}>
                    {org.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="location" className="block text-[#005580] font-medium mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter location"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="latitude" className="block text-[#005580] font-medium mb-2">
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              placeholder="Enter latitude"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.latitude}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="longitude" className="block text-[#005580] font-medium mb-2">
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              placeholder="Enter longitude"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.longitude}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-[#005580] font-medium mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-4">
            <Link
              href="/dashboard/spaces"
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <LoadingButton 
              type="submit" 
              loading={loading}
              className="px-6 py-2 rounded"
            >
              Create Space
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

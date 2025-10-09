"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../../../AuthContext";
import Link from "next/link";
import LoadingButton from "../../../../components/ui/loading-button";

export default function AddAssetPage() {
  const [form, setForm] = useState({
    spaceId: "",
    assetTypeId: "",
    name: "",
    location: "",
    status: "Active",
  });
  const [spaces, setSpaces] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spacesLoading, setSpacesLoading] = useState(true);
  const [typesLoading, setTypesLoading] = useState(true);
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    const fetchSpaces = async () => {
      setSpacesLoading(true);
      try {
        const res = await fetch("/api/space", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const data = await res.json();
        
        if (res.ok && data?.meta?.status === "Success") {
          const spacesData = Array.isArray(data.data) ? data.data : data.data ? [data.data] : [];
          setSpaces(spacesData);
        }
      } catch (err) {
        console.error("Fetch spaces error:", err);
      } finally {
        setSpacesLoading(false);
      }
    };

    const fetchAssetTypes = async () => {
      setTypesLoading(true);
      try {
        const res = await fetch("/api/assettype", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const data = await res.json();
        
        if (res.ok && data?.meta?.status === "Success" && Array.isArray(data.data)) {
          setAssetTypes(data.data);
        }
      } catch (err) {
        console.error("Fetch asset types error:", err);
      } finally {
        setTypesLoading(false);
      }
    };

    if (token) {
      fetchSpaces();
      fetchAssetTypes();
    }
  }, [token]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.spaceId || !form.assetTypeId || !form.name || !form.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      console.log("Creating asset with:", form);

      const res = await fetch("/api/asset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          assetTypeId: parseInt(form.assetTypeId), // Ensure it's a number
        }),
      });
      
      const data = await res.json();
      console.log("Create asset response:", data);
      
      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Asset created successfully!", {
          duration: 2000
        });
        setTimeout(() => {
          router.push("/dashboard/assets");
          router.refresh();
        }, 1000);
      } else {
        const errorMessage = data?.meta?.messages?.[0]?.text || data?.detail || "Failed to create asset";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Create asset error:', err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/dashboard/assets" className="text-[#005580] hover:underline mb-4 inline-block">
          ← Back to Assets
        </Link>
        <h1 className="text-2xl font-bold text-[#005580]">Add New Asset</h1>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm max-w-3xl">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-[#005580] font-medium mb-2">
              Asset Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter asset name"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="spaceId" className="block text-[#005580] font-medium mb-2">
              Space <span className="text-red-500">*</span>
            </label>
            <select
              id="spaceId"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.spaceId}
              onChange={handleChange}
              required
              disabled={spacesLoading}
            >
              <option value="">Choose space...</option>
              {spacesLoading ? (
                <option disabled>Loading spaces...</option>
              ) : spaces.length === 0 ? (
                <option disabled>No spaces available</option>
              ) : (
                spaces.map((space) => (
                  <option key={space.spaceId} value={space.spaceId}>
                    {space.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label htmlFor="assetTypeId" className="block text-[#005580] font-medium mb-2">
              Asset Type <span className="text-red-500">*</span>
            </label>
            <select
              id="assetTypeId"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.assetTypeId}
              onChange={handleChange}
              required
              disabled={typesLoading}
            >
              <option value="">Choose asset type...</option>
              {typesLoading ? (
                <option disabled>Loading asset types...</option>
              ) : assetTypes.length === 0 ? (
                <option disabled>No asset types available</option>
              ) : (
                assetTypes.map((type) => (
                  <option key={type.assetTypeId} value={type.assetTypeId}>
                    {type.name}
                  </option>
                ))
              )}
            </select>
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
              <option value="Retired">Retired</option>
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

          <div className="md:col-span-2 flex justify-end gap-4">
            <Link
              href="/dashboard/assets"
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <LoadingButton
              type="submit"
              loading={loading}
              className="px-6 py-2 rounded"
            >
              Create Asset
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../../../AuthContext";
import Link from "next/link";
import { getApiUrl } from "../../../../lib/api-config";

export default function AddAssetTypePage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name) {
      toast.error("Please enter asset type name");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(getApiUrl("/api/assettype"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Asset type created successfully!", {
          duration: 2000
        });
        setTimeout(() => {
          router.push("/dashboard/asset-types");
        }, 1000);
      } else {
        const errorMessage = data?.meta?.messages?.[0]?.text || data?.detail || "Failed to create asset type";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Create asset type error:', err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/dashboard/asset-types" className="text-[#005580] hover:underline mb-4 inline-block">
          ← Back to Asset Types
        </Link>
        <h1 className="text-2xl font-bold text-[#005580]">Add New Asset Type</h1>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-[#005580] font-medium mb-2">
              Asset Type Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter asset type name"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-[#005580] font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              rows={6}
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580] resize-none"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Link
              href="/dashboard/asset-types"
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="bg-[#005580] text-white px-6 py-2 rounded hover:bg-[#004466] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Asset Type"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

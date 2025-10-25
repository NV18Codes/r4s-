"use client";
import { useState } from "react";
import { useAuth } from "../../../AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getApiUrl } from "../../../../lib/api-config";

export default function AddChecklistPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      console.log("=== CREATE CHECKLIST REQUEST ===");
      console.log("Form data:", formData);

      const res = await fetch(getApiUrl("/api/checklist"), {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log("=== CREATE CHECKLIST RESPONSE ===");
      console.log("Status:", res.status);
      console.log("Response:", data);
      console.log("Meta status:", data?.meta?.status);

      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Checklist created successfully!");
        router.push("/dashboard/checklists");
      } else {
        const errorMsg = data?.meta?.messages?.[0]?.text || data?.meta?.messages?.[0]?.message || "Failed to create checklist";
        toast.error(errorMsg);
        console.error("Create checklist failed:", errorMsg, "Full response:", data);
      }
    } catch (error) {
      console.error("Create checklist error:", error);
      toast.error("An error occurred while creating checklist");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Checklist</h1>
        <p className="text-gray-500 mt-1">Create a new inspection checklist</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Checklist Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
              placeholder="Enter checklist name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
              placeholder="Enter checklist description"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#005580] text-white py-3 px-4 rounded-lg hover:bg-[#004466] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner mr-2"></div>
                  Creating...
                </div>
              ) : (
                "Create Checklist"
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

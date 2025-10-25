"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import Link from "next/link";
import { toast } from "sonner";
import { getApiUrl } from "../../../lib/api-config";

export default function SpaceTypesPage() {
  const { token, user } = useAuth();
  const [spaceTypes, setSpaceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSpaceType, setNewSpaceType] = useState({
    name: "",
    description: "",
    status: "Active"
  });

  useEffect(() => {
    if (token) {
      fetchSpaceTypes();
    }
  }, [token]);

  const fetchSpaceTypes = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      console.log("=== FETCHING SPACE TYPES ===");
      console.log("Token present:", !!token);

      const res = await fetch(getApiUrl("/api/spacetype"), { headers });
      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        if (data?.meta?.status === "Success") {
          setSpaceTypes(Array.isArray(data.data) ? data.data : []);
          console.log("Successfully loaded space types:", data.data);
        } else {
          console.error("Backend returned error:", data);
          toast.error(data?.meta?.messages?.[0]?.text || "Failed to fetch space types");
          setSpaceTypes([]);
        }
      } else {
        console.error("HTTP error:", res.status, data);
        // Handle 500 errors gracefully
        if (res.status === 500) {
          console.log("Backend returned 500 error, showing empty list");
          setSpaceTypes([]);
          toast.info("Backend service temporarily unavailable, showing empty list");
        } else {
          toast.error(`HTTP ${res.status}: ${data?.meta?.messages?.[0]?.text || "Failed to fetch space types"}`);
          setSpaceTypes([]);
        }
      }
    } catch (error) {
      console.error("Error fetching space types:", error);
      toast.error(`Error fetching space types: ${error.message}`);
      setSpaceTypes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSpaceType = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      console.log("=== CREATE SPACE TYPE ===");
      console.log("Form data:", newSpaceType);

      const res = await fetch(getApiUrl("/api/spacetype"), {
        method: "POST",
        headers,
        body: JSON.stringify(newSpaceType),
      });

      const data = await res.json();
      console.log("Create response:", data);

      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Space type created successfully!");
        setShowAddForm(false);
        setNewSpaceType({ name: "", description: "", status: "Active" });
        fetchSpaceTypes();
      } else {
        toast.error(data?.meta?.messages?.[0]?.text || "Failed to create space type");
      }
    } catch (error) {
      console.error("Error creating space type:", error);
      toast.error("Error creating space type");
    }
  };

  const handleDeleteSpaceType = async (spaceTypeId) => {
    if (!confirm("Are you sure you want to delete this space type?")) return;

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      console.log("=== DELETE SPACE TYPE ===");
      console.log("Space Type ID:", spaceTypeId);

      const res = await fetch(getApiUrl(`/api/spacetype/${spaceTypeId}`), {
        method: "DELETE",
        headers,
      });

      const data = await res.json();
      console.log("Delete response:", data);

      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Space type deleted successfully!");
        fetchSpaceTypes();
      } else {
        toast.error(data?.meta?.messages?.[0]?.text || "Failed to delete space type");
      }
    } catch (error) {
      console.error("Error deleting space type:", error);
      toast.error("Error deleting space type");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Space Types</h1>
          <p className="text-gray-500 mt-1">Manage space types and categories</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#005580] text-white px-4 py-2 rounded-lg hover:bg-[#004466] transition-colors font-medium"
        >
          Add Space Type
        </button>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Space Type</h2>
            <form onSubmit={handleAddSpaceType} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Space Type Name
                </label>
                <input
                  type="text"
                  value={newSpaceType.name}
                  onChange={(e) => setNewSpaceType({ ...newSpaceType, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newSpaceType.description}
                  onChange={(e) => setNewSpaceType({ ...newSpaceType, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newSpaceType.status}
                  onChange={(e) => setNewSpaceType({ ...newSpaceType, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#005580] text-white py-2 rounded-lg hover:bg-[#004466] transition-colors font-medium"
                >
                  Create Space Type
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-500">Loading space types...</p>
        </div>
      ) : spaceTypes.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Space Types</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first space type</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-[#005580] text-white px-6 py-3 rounded-lg hover:bg-[#004466] transition-colors font-medium"
          >
            Create Space Type
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Space Type Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {spaceTypes.map((spaceType) => (
                  <tr key={spaceType.spaceTypeId || spaceType.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {spaceType.name || spaceType.spaceTypeName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {spaceType.description || "No description"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        spaceType.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {spaceType.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {spaceType.createdDate ? new Date(spaceType.createdDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDeleteSpaceType(spaceType.spaceTypeId || spaceType.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

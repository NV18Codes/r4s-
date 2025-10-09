"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import Link from "next/link";
import { toast } from "sonner";

export default function PropertiesPage() {
  const { token, user } = useAuth();
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAttribute, setNewAttribute] = useState({
    name: "",
    dataType: "String",
    description: "",
    isRequired: false
  });

  useEffect(() => {
    if (token) {
      fetchAttributes();
    }
  }, [token]);

  const fetchAttributes = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      console.log("=== FETCHING ATTRIBUTES ===");
      console.log("Token present:", !!token);
      console.log("Headers:", headers);

      const res = await fetch("/api/attributes", { headers });
      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      const data = await res.json();
      console.log("Response data:", data);
      console.log("Data type:", typeof data);
      console.log("Data keys:", Object.keys(data));

      if (res.ok) {
        if (data?.meta?.status === "Success") {
          setAttributes(Array.isArray(data.data) ? data.data : []);
          console.log("Successfully loaded attributes:", data.data);
        } else {
          console.error("Backend returned error:", data);
          toast.error(data?.meta?.messages?.[0]?.text || "Failed to fetch properties");
          setAttributes([]);
        }
      } else {
        console.error("HTTP error:", res.status, data);
        // Handle 500 errors gracefully
        if (res.status === 500) {
          console.log("Backend returned 500 error, showing empty list");
          setAttributes([]);
          toast.info("Backend service temporarily unavailable, showing empty list");
        } else {
          toast.error(`HTTP ${res.status}: ${data?.meta?.messages?.[0]?.text || "Failed to fetch properties"}`);
          setAttributes([]);
        }
      }
    } catch (error) {
      console.error("Error fetching attributes:", error);
      toast.error(`Error fetching properties: ${error.message}`);
      setAttributes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAttribute = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      const res = await fetch("/api/attributes", {
        method: "POST",
        headers,
        body: JSON.stringify(newAttribute),
      });

      const data = await res.json();

      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Property created successfully!");
        setShowAddForm(false);
        setNewAttribute({ name: "", dataType: "String", description: "", isRequired: false });
        fetchAttributes();
      } else {
        toast.error(data?.meta?.messages?.[0]?.text || "Failed to create property");
      }
    } catch (error) {
      console.error("Error creating attribute:", error);
      toast.error("Error creating property");
    }
  };

  const handleDeleteAttribute = async (attributeId) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      const res = await fetch(`/api/attributes/${attributeId}`, {
        method: "DELETE",
        headers,
      });

      const data = await res.json();

      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Property deleted successfully!");
        fetchAttributes();
      } else {
        toast.error(data?.meta?.messages?.[0]?.text || "Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting attribute:", error);
      toast.error("Error deleting property");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-500 mt-1">Manage custom properties and attributes</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#005580] text-white px-4 py-2 rounded-lg hover:bg-[#004466] transition-colors font-medium"
        >
          Add Property
        </button>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
            <form onSubmit={handleAddAttribute} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name
                </label>
                <input
                  type="text"
                  value={newAttribute.name}
                  onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Type
                </label>
                <select
                  value={newAttribute.dataType}
                  onChange={(e) => setNewAttribute({ ...newAttribute, dataType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
                >
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Boolean">Boolean</option>
                  <option value="Date">Date</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newAttribute.description}
                  onChange={(e) => setNewAttribute({ ...newAttribute, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005580] focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isRequired"
                  checked={newAttribute.isRequired}
                  onChange={(e) => setNewAttribute({ ...newAttribute, isRequired: e.target.checked })}
                  className="h-4 w-4 text-[#005580] focus:ring-[#005580] border-gray-300 rounded"
                />
                <label htmlFor="isRequired" className="ml-2 text-sm text-gray-700">
                  Required field
                </label>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#005580] text-white py-2 rounded-lg hover:bg-[#004466] transition-colors font-medium"
                >
                  Create Property
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
          <p className="text-gray-500">Loading properties...</p>
        </div>
      ) : attributes.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🏷️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first property</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-[#005580] text-white px-6 py-3 rounded-lg hover:bg-[#004466] transition-colors font-medium"
          >
            Create Property
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Required
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attributes.map((attribute) => (
                  <tr key={attribute.attributeId || attribute.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {attribute.name || attribute.attributeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {attribute.dataType || attribute.type || "String"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {attribute.description || "No description"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {attribute.isRequired ? (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Required
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          Optional
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDeleteAttribute(attribute.attributeId || attribute.id)}
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

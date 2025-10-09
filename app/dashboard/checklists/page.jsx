"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import Link from "next/link";

export default function ChecklistsPage() {
  const { token, user } = useAuth();
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchChecklists();
    }
  }, [token]);

  const fetchChecklists = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      const res = await fetch("/api/checklist", { headers });
      const data = await res.json();

      if (res.ok && data?.meta?.status === "Success") {
        setChecklists(Array.isArray(data.data) ? data.data : []);
      } else {
        console.error("Error fetching checklists:", data);
      }
    } catch (error) {
      console.error("Error fetching checklists:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Checklists</h1>
          <p className="text-gray-500 mt-1">Manage inspection checklists</p>
        </div>
        <Link
          href="/dashboard/checklists/add"
          className="bg-[#005580] text-white px-4 py-2 rounded-lg hover:bg-[#004466] transition-colors font-medium"
        >
          Add Checklist
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-500">Loading checklists...</p>
        </div>
      ) : checklists.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Checklists</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first checklist</p>
          <Link
            href="/dashboard/checklists/add"
            className="bg-[#005580] text-white px-6 py-3 rounded-lg hover:bg-[#004466] transition-colors font-medium"
          >
            Create Checklist
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checklists.map((checklist) => (
            <div key={checklist.checkListId || checklist.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-2xl">📋</div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {checklist.status || "Active"}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {checklist.name || checklist.title || "Untitled Checklist"}
              </h3>
              
              <p className="text-gray-500 text-sm mb-4">
                {checklist.description || "No description available"}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Items: {checklist.itemCount || 0}</span>
                <span>Created: {checklist.createdDate ? new Date(checklist.createdDate).toLocaleDateString() : "N/A"}</span>
              </div>
              
              <div className="flex space-x-2">
                <Link
                  href={`/dashboard/checklists/${checklist.checkListId || checklist.id}`}
                  className="flex-1 bg-[#005580] text-white text-center px-3 py-2 rounded-lg hover:bg-[#004466] transition-colors text-sm font-medium"
                >
                  View
                </Link>
                <button className="px-3 py-2 text-red-600 hover:text-red-900 text-sm font-medium">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

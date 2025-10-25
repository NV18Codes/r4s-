"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../AuthContext";
import { toast } from "sonner";
import { getApiUrl } from "../../../lib/api-config";

// Delete Confirmation Modal Component
function DeleteModal({ isOpen, onClose, onConfirm, assetName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Delete Asset</h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong className="text-gray-900">"{assetName}"</strong>? This action cannot be undone.
        </p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AssetsPage() {
  const { token } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, asset: null });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(getApiUrl("/api/asset"), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const data = await res.json();
        console.log("Assets API response:", data);
        
        if (res.ok && data?.meta?.status === "Success" && Array.isArray(data.data)) {
          setAssets(data.data);
        } else {
          setError(data?.meta?.messages?.[0]?.text || "Failed to fetch assets");
          setAssets([]);
        }
      } catch (err) {
        console.error("Fetch assets error:", err);
        setError("An error occurred while fetching assets");
        setAssets([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAssets();
    }
  }, [token]);

  const openDeleteModal = (asset) => {
    console.log("Opening delete modal for asset:", asset);
    setDeleteModal({ isOpen: true, asset });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, asset: null });
  };

  const handleDelete = async () => {
    if (!deleteModal.asset) return;

    const assetId = deleteModal.asset.assetId;
    console.log("Deleting asset with ID:", assetId);

    setDeleting(true);
    try {
      const res = await fetch(getApiUrl(`/api/asset?AssetId=${assetId}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      const data = await res.json();
      console.log("Delete asset response:", data);

      if (res.ok && data?.meta?.status === "Success") {
        toast.success(data?.data?.message || "Asset deleted successfully!");
        // Refresh the list
        setAssets(assets.filter(a => a.assetId !== assetId));
        closeDeleteModal();
      } else {
        toast.error(data?.meta?.messages?.[0]?.text || "Failed to delete asset");
      }
    } catch (err) {
      console.error("Delete asset error:", err);
      toast.error("An error occurred while deleting asset");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#005580]">Assets</h1>
        <Link
          href="/dashboard/assets/add"
          className="bg-[#005580] text-white px-6 py-2 rounded hover:bg-[#004466] transition"
        >
          Add New Asset
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10 text-[#005580]">Loading assets...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : assets.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No assets found. Create your first asset!
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#005580] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Space</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Asset Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assets.map(asset => (
                  <tr key={asset.assetId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{asset.assetId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {asset.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.spaceName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Type #{asset.assetTypeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.location || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        asset.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {asset.status || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/assets/${asset.assetId}`}
                          className="text-[#005580] hover:text-[#004466]"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => openDeleteModal(asset)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        assetName={deleteModal.asset?.name || ""}
      />

      {/* Loading Overlay for Delete */}
      {deleting && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005580]"></div>
              <span className="text-gray-700">Deleting...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

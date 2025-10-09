"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../AuthContext";
import { toast } from "sonner";

// Delete Confirmation Modal Component
function DeleteModal({ isOpen, onClose, onConfirm, assetTypeName }) {
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
          <h3 className="text-xl font-semibold text-gray-900">Delete Asset Type</h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong className="text-gray-900">"{assetTypeName}"</strong>? This action cannot be undone.
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

export default function AssetTypesPage() {
  const { token } = useAuth();
  const [assetTypes, setAssetTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, assetType: null });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchAssetTypes = async () => {
      setLoading(true);
      setError("");
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
        } else {
          setError(data?.meta?.messages?.[0]?.text || "Failed to fetch asset types");
          setAssetTypes([]);
        }
      } catch (err) {
        setError("An error occurred while fetching asset types");
        setAssetTypes([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAssetTypes();
    }
  }, [token]);

  const openDeleteModal = (assetType) => {
    console.log("Opening delete modal for:", assetType);
    setDeleteModal({ isOpen: true, assetType });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, assetType: null });
  };

  const handleDelete = async () => {
    if (!deleteModal.assetType) return;

    const assetTypeId = deleteModal.assetType.assetTypeId;
    console.log("Deleting asset type with ID:", assetTypeId);

    setDeleting(true);
    try {
      const res = await fetch(`/api/assettype?AssetTypeId=${assetTypeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      const data = await res.json();
      console.log("Delete response:", data);
      console.log("Delete response status:", res.status);
      console.log("Delete meta:", data?.meta);
      console.log("Delete messages:", data?.meta?.messages);

      if (res.ok && data?.meta?.status === "Success") {
        toast.success(data?.data?.message || "Asset type deleted successfully!");
        // Refresh the list
        setAssetTypes(assetTypes.filter(at => at.assetTypeId !== assetTypeId));
        closeDeleteModal();
      } else {
        const errorMsg = data?.meta?.messages?.[0]?.text || data?.detail || "Failed to delete asset type";
        console.error("Delete failed:", errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An error occurred while deleting asset type");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#005580]">Asset Types</h1>
        <Link
          href="/dashboard/asset-types/add"
          className="bg-[#005580] text-white px-6 py-2 rounded hover:bg-[#004466] transition"
        >
          Add New Asset Type
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10 text-[#005580]">Loading asset types...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : assetTypes.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No asset types found. Create your first asset type!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {assetTypes.map((assetType) => (
            <div
              key={assetType.assetTypeId}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#005580] text-white w-12 h-12 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">
                    #{assetType.assetTypeId}
                  </span>
                </div>
                
                <h2 className="text-lg font-semibold text-[#005580] mb-2">
                  {assetType.name}
                </h2>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {assetType.description || "No description provided"}
                </p>

                {assetType.createdDate && (
                  <p className="text-xs text-gray-500 mb-4">
                    Created: {new Date(assetType.createdDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t border-gray-200">
                <Link
                  href={`/dashboard/asset-types/${assetType.assetTypeId}`}
                  className="text-[#005580] hover:text-[#004466] text-sm font-medium flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View Details
                </Link>
                
                <button
                  onClick={() => openDeleteModal(assetType)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        assetTypeName={deleteModal.assetType?.name || ""}
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
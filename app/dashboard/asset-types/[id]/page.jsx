"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "../../../AuthContext";
import Link from "next/link";

export default function AssetTypeDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [assetType, setAssetType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssetTypeDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/assettype/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const data = await res.json();
        
        if (res.ok && data?.meta?.status === "Success" && data.data) {
          setAssetType(data.data);
        } else {
          setError(data?.meta?.messages?.[0]?.text || "Failed to fetch asset type details");
        }
      } catch (err) {
        setError("An error occurred while fetching asset type details");
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchAssetTypeDetails();
    }
  }, [token, id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-10 text-[#005580]">Loading asset type details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-10 text-red-500">{error}</div>
        <div className="text-center">
          <Link href="/dashboard/asset-types" className="text-[#005580] hover:underline">
            ← Back to Asset Types
          </Link>
        </div>
      </div>
    );
  }

  if (!assetType) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-10 text-gray-500">Asset type not found</div>
        <div className="text-center">
          <Link href="/dashboard/asset-types" className="text-[#005580] hover:underline">
            ← Back to Asset Types
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/dashboard/asset-types" className="text-[#005580] hover:underline mb-4 inline-block">
          ← Back to Asset Types
        </Link>
        <h1 className="text-3xl font-bold text-[#005580]">{assetType.name}</h1>
        <p className="text-gray-600 mt-2">Asset Type ID: {assetType.assetTypeId}</p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#005580] mb-4">Details</h2>
        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-700">Name:</span>
            <span className="ml-2">{assetType.name}</span>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">Description:</span>
            <p className="ml-2 mt-1 text-gray-600">{assetType.description || "No description provided"}</p>
          </div>

          {assetType.spaceId && (
            <div>
              <span className="font-medium text-gray-700">Space ID:</span>
              <span className="ml-2">{assetType.spaceId}</span>
            </div>
          )}

          {assetType.spaceName && (
            <div>
              <span className="font-medium text-gray-700">Space Name:</span>
              <span className="ml-2">{assetType.spaceName}</span>
            </div>
          )}

          {assetType.createdDate && (
            <div>
              <span className="font-medium text-gray-700">Created:</span>
              <span className="ml-2">{new Date(assetType.createdDate).toLocaleString()}</span>
            </div>
          )}

          {assetType.modifiedDate && (
            <div>
              <span className="font-medium text-gray-700">Last Modified:</span>
              <span className="ml-2">{new Date(assetType.modifiedDate).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
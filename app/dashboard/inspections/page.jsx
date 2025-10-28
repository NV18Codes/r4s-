"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { getApiUrl } from "../../../lib/api-config";
import Link from "next/link";
import { toast } from "sonner";

export default function InspectionsPage() {
  const { token, user } = useAuth();
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  useEffect(() => {
    if (token) {
      fetchInspections();
    }
  }, [token]);

  const fetchInspections = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      const res = await fetch(getApiUrl("/api/inspection"), { 
        headers,
        method: 'GET'
      });
      
      if (res.status === 405 || !res.ok) {
        // API endpoint not available, set empty array
        setInspections([]);
        return;
      }

      const data = await res.json();

      if (res.ok && data?.meta?.status === "Success") {
        setInspections(Array.isArray(data.data) ? data.data : []);
      } else {
        setInspections([]);
      }
    } catch (error) {
      console.error("Error fetching inspections:", error);
      setInspections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setUploadResult(null);
      } else {
        toast.error("Please select an image file");
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    setUploading(true);
    try {
      // Convert image to base64
      const reader = new FileReader();
      
      reader.onload = async () => {
        try {
          const base64Data = reader.result;
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
          
          // Detect environment
          const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
          const isNetlify = window.location.hostname.includes('netlify.app');
          
          console.log('Environment:', { isLocal, isNetlify, backendUrl });
          
          // Use Netlify function if on Netlify domain, otherwise use localhost
          let uploadUrl;
          if (isNetlify) {
            uploadUrl = '/.netlify/functions/upload-image';
          } else {
            uploadUrl = `${backendUrl || 'http://localhost:3001'}/images`;
          }

          const requestBody = { image: base64Data, filename: selectedFile.name };

          console.log('Uploading to:', uploadUrl);
          
          const res = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          // Check if response is ok and has content
          if (!res.ok) {
            const errorText = await res.text();
            console.error('Upload failed:', res.status, errorText);
            toast.error(`Upload failed: ${res.statusText}`);
            return;
          }

          const text = await res.text();
          if (!text) {
            toast.error("Empty response from server");
            return;
          }

          let data;
          try {
            data = JSON.parse(text);
          } catch (jsonError) {
            console.error('Failed to parse JSON:', text);
            toast.error("Invalid response from server");
            return;
          }

          // Success case - data is already parsed
          setUploadResult(data);
          toast.success(`Detection complete! Found ${data.crackCount || 0} cracks`);
          setSelectedFile(null);
        } catch (error) {
          console.error("Upload error:", error);
          toast.error(error.message || "Failed to upload image");
        } finally {
          setUploading(false);
        }
      };

      reader.onerror = () => {
        toast.error("Failed to read image file");
        setUploading(false);
      };

      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
      setUploading(false);
    }
  };

  const fetchImageStatus = async (imageId) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const res = await fetch(`${backendUrl}/images/${imageId}`);
      const data = await res.json();
      setUploadResult(data);
      
      if (data.status === 'completed') {
        toast.success(`Detection complete! Found ${data.crackCount || 0} cracks`);
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  const fetchWorkOrders = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const res = await fetch(`${backendUrl}/workorders`);
      const data = await res.json();
      console.log("Work Orders:", data);
    } catch (error) {
      console.error("Error fetching work orders:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inspections</h1>
          <p className="text-gray-500 mt-1">Manage and track inspections</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            {showUpload ? "Hide" : "Upload Road Image"}
          </button>
          <Link
            href="/dashboard/inspections/add"
            className="bg-[#005580] text-white px-4 py-2 rounded-lg hover:bg-[#004466] transition-colors font-medium"
          >
            + Add Inspection
          </Link>
        </div>
      </div>

      {/* Road Image Upload Section */}
      {showUpload && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 Road Crack Detection</h2>
          <p className="text-gray-600 mb-4">Upload a road image to automatically detect cracks using AI</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Road Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#005580] file:text-white hover:file:bg-[#004466]"
              />
            </div>

            {selectedFile && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Selected:</span> {selectedFile.name}
                </p>
              </div>
            )}

            {uploadResult && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {uploadResult.status === 'completed' ? '✅' : '⏳'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Status: {uploadResult.status}
                    </p>
                    {uploadResult.crackCount !== undefined && (
                      <p className="text-sm text-gray-600">
                        Cracks detected: {uploadResult.crackCount}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading & Analyzing..." : "Upload & Analyze"}
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-500">Loading inspections...</p>
        </div>
      ) : inspections.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Inspections</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first inspection</p>
          <Link
            href="/dashboard/inspections/add"
            className="bg-[#005580] text-white px-6 py-3 rounded-lg hover:bg-[#004466] transition-colors font-medium"
          >
            + Add Inspection
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inspection ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inspector
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inspections.map((inspection) => (
                  <tr key={inspection.inspectionId || inspection.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {inspection.inspectionId || inspection.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {inspection.type || inspection.inspectionType || "General"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {inspection.status || "Completed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {inspection.inspector || inspection.inspectorName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {inspection.inspectionDate ? new Date(inspection.inspectionDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/dashboard/inspections/${inspection.inspectionId || inspection.id}`}
                        className="text-[#005580] hover:text-[#004466] mr-3"
                      >
                        View
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
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

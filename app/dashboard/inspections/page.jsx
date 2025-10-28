"use client";
import { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";
import { getApiUrl } from "../../../lib/api-config";
import ImageViewer from "../../../components/ui/ImageViewer";
import { toast } from 'sonner';
import Link from 'next/link';

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

      const res = await fetch(getApiUrl("/api/inspections"), { 
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
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://r4s.onrender.com';
      
      // Create FormData
      const formData = new FormData();
      formData.append('image', selectedFile);

      const uploadUrl = `${backendUrl}/api/v1/images/upload`;
      
      console.log('Uploading to:', uploadUrl);
      
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Upload failed:', res.status, errorText);
        toast.error(`Upload failed: ${res.statusText}`);
        setUploading(false);
        return;
      }

      const response = await res.json();
      
      // Extract data from response
      const data = response?.data || response;
      
      setUploadResult(data);
      toast.success(data.message || `Detection complete! Found ${data.crackCount || 0} cracks`);
      setSelectedFile(null);
      fetchInspections(); // Refresh inspections list
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload image");
    } finally {
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
              <div className="space-y-4">
                {/* Results Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">✅</div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Detection Complete!
                      </p>
                      {uploadResult.crackCount !== undefined && (
                        <p className="text-sm text-gray-600">
                          Cracks detected: {uploadResult.crackCount} | Severity: {uploadResult.severity || 'N/A'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Annotated Image */}
                {uploadResult && (
                  <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Crack Detection Results</h3>
                    
                    {/* Image Viewer with Download */}
                    {uploadResult.originalImageUrl && (
                      <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                        <ImageViewer
                          originalImageUrl={uploadResult.originalImageUrl}
                          annotatedImageUrl={uploadResult.annotatedImageUrl}
                          cracks={uploadResult.cracks || []}
                          severity={uploadResult.severity}
                          crackCount={uploadResult.crackCount}
                          inspectionId={uploadResult.inspection?.id || 'temp'}
                        />
                      </div>
                    )}

                    {/* Crack Details */}
                    {uploadResult.cracks && uploadResult.cracks.length > 0 && (
                      <div className="mt-4 p-4 bg-white rounded-lg">
                        <h4 className="font-semibold mb-3">Crack Analysis:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          {uploadResult.cracks.map((crack, idx) => (
                            <div key={idx} className="border border-gray-300 p-3 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`w-3 h-3 rounded-full ${
                                  uploadResult.severity === 'High' ? 'bg-red-500' : 
                                  uploadResult.severity === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'
                                }`}></div>
                                <strong>Crack #{crack.id || idx + 1}</strong>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {Math.round((crack.confidence || 0.85) * 100)}% confidence
                                </span>
                              </div>
                              <p><strong>Position:</strong> ({Math.round(crack.x)}, {Math.round(crack.y)})</p>
                              <p><strong>Size:</strong> {Math.round(crack.width)} × {Math.round(crack.height)} pixels</p>
                              <p><strong>Type:</strong> {crack.type || 'linear'}</p>
                              <p><strong>Points:</strong> {crack.points?.length || 0} detected</p>
                            </div>
                          ))}
                        </div>
                        
                        {/* AI Summary */}
                        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🧠</span>
                            <div>
                              <p className="font-semibold">AI Analysis Summary</p>
                              <p className="text-sm text-gray-600">
                                Model processed image in ~{uploadResult.processingTime?.toFixed(1) || '2.0'}s
                              </p>
                              <p className="text-xs text-gray-500">
                                Model Version: {uploadResult.modelVersion || 'v1.0'} | Confidence: {Math.round((uploadResult.cracks?.[0]?.confidence || 0.85) * 100)}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inspection ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cracks Found
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      {inspection.original_image_url ? (
                        <img 
                          src={inspection.original_image_url} 
                          alt="Inspection" 
                          className="w-16 h-12 object-cover rounded-lg border border-gray-300"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {inspection.inspectionId || inspection.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${
                          inspection.crack_count > 3 ? 'text-red-600' : 
                          inspection.crack_count > 1 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {inspection.crack_count || 0}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          inspection.crack_severity === 'High' ? 'bg-red-100 text-red-800' : 
                          inspection.crack_severity === 'Medium' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {inspection.crack_severity || 'Low'}
                        </span>
                      </div>
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
                      {inspection.inspection_date ? new Date(inspection.inspection_date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/dashboard/inspections/${inspection.inspectionId || inspection.id}`}
                        className="text-[#005580] hover:text-[#004466] mr-3"
                      >
                        View Details
                      </Link>
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

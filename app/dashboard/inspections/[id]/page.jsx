"use client";
import { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";
import { getApiUrl } from "../../../lib/api-config";
import ImageViewer from "../../../components/ui/ImageViewer";
import Link from "next/link";
import { toast } from 'sonner';

export default function InspectionDetailPage({ params }) {
  const { token } = useAuth();
  const [inspection, setInspection] = useState(null);
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && params?.id) {
      fetchInspection();
      fetchWorkOrders();
    }
  }, [token, params?.id]);

  const fetchInspection = async () => {
    try {
      const res = await fetch(getApiUrl(`/api/inspections/${params.id}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setInspection(data.data);
      }
    } catch (error) {
      console.error("Error fetching inspection:", error);
      toast.error("Failed to load inspection details");
    }
  };

  const fetchWorkOrders = async () => {
    try {
      const res = await fetch(getApiUrl(`/api/inspections/${params.id}/workorders`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setWorkOrders(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching work orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-500">Loading inspection details...</p>
        </div>
      </div>
    );
  }

  if (!inspection) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Inspection Not Found</h3>
        <p className="text-gray-500 mb-6">The requested inspection could not be found</p>
        <Link
          href="/dashboard/inspections"
          className="bg-[#005580] text-white px-6 py-3 rounded-lg hover:bg-[#004466] transition-colors font-medium"
        >
          ← Back to Inspections
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{inspection.name}</h1>
          <p className="text-gray-500 mt-1">Inspection ID: {inspection.id}</p>
        </div>
        <Link
          href="/dashboard/inspections"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          ← Back to Inspections
        </Link>
      </div>

      {/* Inspection Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          {inspection.original_image_url && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Images</h2>
              <ImageViewer
                originalImageUrl={inspection.original_image_url}
                annotatedImageUrl={inspection.annotated_image_url}
                cracks={inspection.crack_data || []}
                severity={inspection.crack_severity}
                crackCount={inspection.crack_count}
                inspectionId={inspection.id}
              />
            </div>
          )}

          {/* Crack Analysis */}
          {inspection.crack_data && inspection.crack_data.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Crack Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inspection.crack_data.map((crack, idx) => (
                  <div key={idx} className="border border-gray-300 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        inspection.crack_severity === 'High' ? 'bg-red-500' : 
                        inspection.crack_severity === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'
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
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Inspection Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspection Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  inspection.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {inspection.status}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Inspector:</span>
                <span className="ml-2 text-gray-900">{inspection.inspector}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Location:</span>
                <span className="ml-2 text-gray-900">{inspection.location}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Date:</span>
                <span className="ml-2 text-gray-900">
                  {new Date(inspection.inspection_date || inspection.created_at).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Description:</span>
                <p className="ml-2 text-gray-900 mt-1">{inspection.description}</p>
              </div>
            </div>
          </div>

          {/* Detection Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Cracks Found:</span>
                <span className="font-semibold text-gray-900">{inspection.crack_count || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Severity:</span>
                <span className={`font-semibold ${
                  inspection.crack_severity === 'High' ? 'text-red-600' : 
                  inspection.crack_severity === 'Medium' ? 'text-orange-600' : 'text-yellow-600'
                }`}>
                  {inspection.crack_severity || 'Low'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Work Orders:</span>
                <span className="font-semibold text-green-600">{workOrders.length}</span>
              </div>
            </div>
          </div>

          {/* Work Orders */}
          {workOrders.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Orders</h3>
              <div className="space-y-3">
                {workOrders.map((workOrder) => (
                  <div key={workOrder.id} className="border border-gray-200 p-3 rounded-lg">
                    <div className="font-medium text-gray-900">{workOrder.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{workOrder.description}</div>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        workOrder.priority === 'High' ? 'bg-red-100 text-red-800' : 
                        workOrder.priority === 'Medium' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {workOrder.priority}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        workOrder.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {workOrder.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

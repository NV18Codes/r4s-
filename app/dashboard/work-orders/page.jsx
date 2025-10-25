"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { getApiUrl } from "../../../lib/api-config";
import Link from "next/link";

export default function WorkOrdersPage() {
  const { token, user } = useAuth();
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchWorkOrders();
    }
  }, [token]);

  const fetchWorkOrders = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      const res = await fetch(getApiUrl("/api/workorder"), { headers });
      const data = await res.json();

      if (res.ok && data?.meta?.status === "Success") {
        setWorkOrders(Array.isArray(data.data) ? data.data : []);
      } else {
        console.error("Error fetching work orders:", data);
      }
    } catch (error) {
      console.error("Error fetching work orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Work Orders</h1>
          <p className="text-gray-500 mt-1">Manage and track work orders</p>
        </div>
        <Link
          href="/dashboard/work-orders/add"
          className="bg-[#005580] text-white px-4 py-2 rounded-lg hover:bg-[#004466] transition-colors font-medium"
        >
          Add Work Order
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-500">Loading work orders...</p>
        </div>
      ) : workOrders.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Work Orders</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first work order</p>
          <Link
            href="/dashboard/work-orders/add"
            className="bg-[#005580] text-white px-6 py-3 rounded-lg hover:bg-[#004466] transition-colors font-medium"
          >
            Create Work Order
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Work Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
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
                {workOrders.map((workOrder) => (
                  <tr key={workOrder.workOrderId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {workOrder.workOrderId || workOrder.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {workOrder.title || workOrder.name || "Untitled"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {workOrder.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {workOrder.priority || "Medium"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {workOrder.createdDate ? new Date(workOrder.createdDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/dashboard/work-orders/${workOrder.workOrderId || workOrder.id}`}
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

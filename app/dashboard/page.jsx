"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Link from "next/link";
import { getApiUrl } from "../../lib/api-config";
import LoadingSpinner from "../../components/ui/loading-spinner";
import ErrorMessage from "../../components/ui/error-message";

export default function DashboardPage() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState({
    spaces: 0,
    assets: 0,
    assetTypes: 0,
    organizations: 0,
    users: 0,
    inspections: 0,
    workOrders: 0,
    checklists: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      fetchAllStats();
    }
  }, [token]);

  const fetchAllStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      console.log("=== DASHBOARD: Fetching Stats ===");
      console.log("User orgId:", user?.orgId);

      // Fetch spaces - try multiple approaches
      let spacesData = null;
      
      // First try: Get all spaces
      try {
        console.log("Fetching all spaces...");
        const spacesRes = await fetch(getApiUrl("/api/v1/space"), { headers });
        if (spacesRes.ok) {
          spacesData = await spacesRes.json();
          console.log("All spaces response:", spacesData);
        }
      } catch (err) {
        console.error("Error fetching all spaces:", err);
      }
      
      // Second try: Organization specific if first failed
      if (!spacesData && user?.orgId) {
        try {
          console.log("Fetching spaces for orgId:", user.orgId);
          const spacesRes = await fetch(getApiUrl(`/api/v1/space/${user.orgId}`), { headers });
          spacesData = spacesRes.ok ? await spacesRes.json() : null;
          console.log("Org spaces response:", spacesData);
        } catch (err) {
          console.error("Error fetching org spaces:", err);
        }
      }

      // Fetch all other data in parallel
      const [
        assetsRes,
        assetTypesRes,
        organizationsRes,
        usersRes,
        inspectionsRes,
        workOrdersRes,
        checklistsRes,
      ] = await Promise.all([
        fetch(getApiUrl("/api/v1/asset"), { headers }).catch(() => ({ ok: false })),
        fetch(getApiUrl("/api/v1/assettype"), { headers }).catch(() => ({ ok: false })),
        fetch(getApiUrl("/api/v1/organization"), { headers }).catch(() => ({ ok: false })),
        fetch(getApiUrl("/api/v1/organization/users"), { headers }).catch(() => ({ ok: false })),
        fetch(getApiUrl("/api/v1/inspection"), { headers }).catch(() => ({ ok: false })),
        fetch(getApiUrl("/api/v1/workorder"), { headers }).catch(() => ({ ok: false })),
        fetch(getApiUrl("/api/v1/checklist"), { headers }).catch(() => ({ ok: false })),
      ]);

      // Parse responses
      const assetsData = assetsRes.ok ? await assetsRes.json() : null;
      const assetTypesData = assetTypesRes.ok ? await assetTypesRes.json() : null;
      const organizationsData = organizationsRes.ok ? await organizationsRes.json() : null;
      const usersData = usersRes.ok ? await usersRes.json() : null;
      const inspectionsData = inspectionsRes.ok ? await inspectionsRes.json() : null;
      const workOrdersData = workOrdersRes.ok ? await workOrdersRes.json() : null;
      const checklistsData = checklistsRes.ok ? await checklistsRes.json() : null;

      const spacesCount = Array.isArray(spacesData?.data) ? spacesData.data.length : 0;
      console.log("Spaces count:", spacesCount);

      setStats({
        spaces: spacesCount,
        assets: Array.isArray(assetsData?.data) ? assetsData.data.length : 0,
        assetTypes: Array.isArray(assetTypesData?.data) ? assetTypesData.data.length : 0,
        organizations: Array.isArray(organizationsData?.data) ? organizationsData.data.length : 0,
        users: Array.isArray(usersData?.data) ? usersData.data.length : 0,
        inspections: Array.isArray(inspectionsData?.data) ? inspectionsData.data.length : 0,
        workOrders: Array.isArray(workOrdersData?.data) ? workOrdersData.data.length : 0,
        checklists: Array.isArray(checklistsData?.data) ? checklistsData.data.length : 0,
      });

      console.log("Final stats:", {
        spaces: spacesCount,
        assets: Array.isArray(assetsData?.data) ? assetsData.data.length : 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Spaces",
      count: stats.spaces,
      icon: "🏢",
      link: "/dashboard/spaces",
      isBlue: true,
    },
    {
      title: "Assets",
      count: stats.assets,
      icon: "📦",
      link: "/dashboard/assets",
      isBlue: false,
    },
    {
      title: "Asset Types",
      count: stats.assetTypes,
      icon: "🏷️",
      link: "/dashboard/asset-types",
      isBlue: true,
    },
    {
      title: "Organizations",
      count: stats.organizations,
      icon: "🏛️",
      link: "/dashboard/organizations",
      isBlue: false,
    },
    {
      title: "Users",
      count: stats.users,
      icon: "👥",
      link: "/dashboard/users",
      isBlue: true,
    },
    {
      title: "Inspections",
      count: stats.inspections,
      icon: "🔍",
      link: "/dashboard/inspections",
      isBlue: false,
    },
    {
      title: "Work Orders",
      count: stats.workOrders,
      icon: "🛠️",
      link: "/dashboard/work-orders",
      isBlue: true,
    },
    {
      title: "Checklists",
      count: stats.checklists,
      icon: "✅",
      link: "/dashboard/checklists",
      isBlue: false,
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || "Admin"}! 👋
          </h1>
          <p className="text-gray-500">
            Here's an overview of your Road Management System
          </p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <LoadingSpinner size="lg" text="Loading dashboard..." />
        ) : error ? (
          <ErrorMessage error={error} onRetry={fetchAllStats} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((card, index) => (
              <Link
                key={index}
                href={card.link}
                className="group block transform hover:scale-[1.02] transition-all duration-200"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden group-hover:border-[#005580] h-full">
                  {/* Gradient Header */}
                  <div className="h-2 bg-gradient-to-r from-[#005580] to-[#0077b6]"></div>
                  
                  {/* Content Section */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{card.icon}</div>
                      <div className="bg-[#005580]/10 rounded-lg p-2 group-hover:bg-[#005580] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#005580] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {card.title}
                    </h3>
                    <p className="text-4xl font-bold text-[#005580] mb-1">
                      {card.count}
                    </p>
                    <p className="text-xs text-gray-400">
                      Total {card.title.toLowerCase()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-full bg-[#005580]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#005580]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/spaces/add" className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-[#005580] to-[#0077b6] text-white rounded-lg shadow-sm hover:shadow-md transition-all hover:from-[#004466] hover:to-[#005580] font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Space</span>
            </Link>

            <Link href="/dashboard/assets/add" className="flex items-center justify-center gap-2 p-4 bg-white text-[#005580] border-2 border-[#005580] rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-[#005580] hover:text-white font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Asset</span>
            </Link>

            <Link href="/dashboard/users/add" className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-[#005580] to-[#0077b6] text-white rounded-lg shadow-sm hover:shadow-md transition-all hover:from-[#004466] hover:to-[#005580] font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Add User</span>
            </Link>

            <Link href="/dashboard/reports" className="flex items-center justify-center gap-2 p-4 bg-white text-[#005580] border-2 border-[#005580] rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-[#005580] hover:text-white font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>View Reports</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


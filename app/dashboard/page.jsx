"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Link from "next/link";

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

  useEffect(() => {
    if (token) {
      fetchAllStats();
    }
  }, [token]);

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      console.log("=== DASHBOARD: Fetching Stats ===");
      console.log("User orgId:", user?.orgId);

      // Fetch spaces with organization ID
      let spacesData = null;
      if (user?.orgId) {
        try {
          console.log("Fetching spaces for orgId:", user.orgId);
          const spacesRes = await fetch(`/api/space/${user.orgId}`, { headers });
          spacesData = spacesRes.ok ? await spacesRes.json() : null;
          console.log("Spaces response:", spacesData);
        } catch (err) {
          console.error("Error fetching spaces:", err);
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
        fetch("/api/asset", { headers }).catch(() => ({ ok: false })),
        fetch("/api/assettype", { headers }).catch(() => ({ ok: false })),
        fetch("/api/organization", { headers }).catch(() => ({ ok: false })),
        fetch("/api/organization/users", { headers }).catch(() => ({ ok: false })),
        fetch("/api/inspection", { headers }).catch(() => ({ ok: false })),
        fetch("/api/workorder", { headers }).catch(() => ({ ok: false })),
        fetch("/api/checklist", { headers }).catch(() => ({ ok: false })),
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
    <div className="p-6 sm:p-8 bg-gray-50">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName || "Admin"}! 👋
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Here's an overview of your Road Management System
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden group-hover:border-[#005580]">
                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{card.icon}</div>
                    <div className="bg-[#005580]/10 rounded-lg p-2 group-hover:bg-[#005580] transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#005580] group-hover:text-white transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {card.title}
                  </h3>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
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
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/spaces/add"
            className="flex items-center justify-center space-x-2 p-4 bg-[#005580] text-white rounded-xl shadow-sm hover:shadow-lg transition-all hover:bg-[#004466] font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Space</span>
          </Link>

          <Link
            href="/dashboard/assets/add"
            className="flex items-center justify-center space-x-2 p-4 bg-white text-[#005580] border-2 border-[#005580] rounded-xl shadow-sm hover:shadow-lg transition-all hover:bg-[#005580] hover:text-white font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Asset</span>
          </Link>

          <Link
            href="/dashboard/users/add"
            className="flex items-center justify-center space-x-2 p-4 bg-[#005580] text-white rounded-xl shadow-sm hover:shadow-lg transition-all hover:bg-[#004466] font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>Add User</span>
          </Link>

          <Link
            href="/dashboard/reports"
            className="flex items-center justify-center space-x-2 p-4 bg-white text-[#005580] border-2 border-[#005580] rounded-xl shadow-sm hover:shadow-lg transition-all hover:bg-[#005580] hover:text-white font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>View Reports</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


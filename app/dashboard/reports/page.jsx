"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../AuthContext";
import { getApiUrl } from "../../../lib/api-config";
import Chart from "chart.js/auto";

export default function ReportsPage() {
  const { token } = useAuth();
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [stats, setStats] = useState({
    assets: 0,
    organizations: 0,
    spaces: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);
  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch assets
        const assetsRes = await fetch(getApiUrl("/api/asset"), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        const assetsData = await assetsRes.json();
        const assetsCount = assetsData?.data?.length || 0;

        // Fetch organizations
        const orgsRes = await fetch(getApiUrl("/api/organization"), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        const orgsData = await orgsRes.json();
        const orgsCount = orgsData?.data?.length || 0;
        
        // Store org data for charts
        if (orgsData?.data) {
          setOrgData(orgsData.data);
        }

        // Fetch spaces (need to use user's org)
        // For now, set to 0 or fetch if available
        const spacesCount = 0;

        setStats({
          assets: assetsCount,
          organizations: orgsCount,
          spaces: spacesCount,
          users: 0, // Will need specific endpoint
        });

      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  useEffect(() => {
    // Bar Chart - Organizations vs Assets
    if (barChartRef.current && orgData.length > 0) {
      const barCtx = barChartRef.current.getContext("2d");

      if (barCtx) {
        const barChart = new Chart(barCtx, {
          type: "bar",
          data: {
            labels: orgData.map(org => org.name || org.orgCode).slice(0, 5),
            datasets: [
              {
                label: "Organizations",
                data: orgData.slice(0, 5).map(() => 1),
                backgroundColor: "#005580",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  color: "#e5e7eb",
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "#e5e7eb",
                },
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  boxWidth: 10,
                },
              },
              title: {
                display: true,
                text: "Organizations Overview",
                font: {
                  size: 16,
                  weight: "bold",
                },
              },
            },
          },
        });

        return () => {
          barChart.destroy();
        };
      }
    }
  }, [orgData]);

  useEffect(() => {
    // Pie Chart - Statistics Breakdown
    if (pieChartRef.current && !loading) {
      const pieCtx = pieChartRef.current.getContext("2d");

      if (pieCtx) {
        const pieChart = new Chart(pieCtx, {
          type: "pie",
          data: {
            labels: ["Assets", "Organizations", "Spaces"],
            datasets: [
              {
                data: [stats.assets, stats.organizations, stats.spaces || 1],
                backgroundColor: ["#f59e0b", "#84cc16", "#38bdf8"],
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "right",
                labels: {
                  usePointStyle: true,
                  boxWidth: 10,
                },
              },
              title: {
                display: true,
                text: "System Overview - Resource Distribution",
                position: "top",
                align: "center",
                font: {
                  size: 14,
                  weight: "normal",
                },
                padding: {
                  top: 10,
                  bottom: 20,
                },
              },
            },
          },
        });

        return () => {
          pieChart.destroy();
        };
      }
    }
  }, [stats, loading]);

  const statsDisplay = [
    {
      title: "Assets",
      count: loading ? "..." : stats.assets,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      ),
    },
    {
      title: "Organisations",
      count: loading ? "..." : stats.organizations,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      title: "Asset Types",
      count: loading ? "..." : "N/A",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="7" />
          <path d="M12 9v3l1.5 1.5" />
          <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
          <path d="m1 14 3-3 3 3" />
          <path d="m17 14 3-3 3 3" />
        </svg>
      ),
    },
    {
      title: "Spaces",
      count: loading ? "..." : stats.spaces,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#005580]">Reports & Analytics</h1>
        <button className="bg-[#005580] text-white px-4 py-2 rounded hover:bg-[#004466] transition">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsDisplay.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-sm flex justify-between items-center p-6 text-white"
            style={{
              background: "linear-gradient(135deg, #005580 0%, #0077b6 100%)",
            }}
          >
            <div className="text-white">{stat.icon}</div>
            <div className="text-right">
              <div className="text-4xl font-bold">{stat.count}</div>
              <div className="text-lg">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#005580] mb-4">Organizations Overview</h2>
          <div className="h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading chart data...
              </div>
            ) : orgData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No organization data available
              </div>
            ) : (
              <canvas ref={barChartRef}></canvas>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#005580] mb-4">Resource Distribution</h2>
          <div className="h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading chart data...
              </div>
            ) : (
              <canvas ref={pieChartRef}></canvas>
            )}
          </div>
          <div className="text-center text-xs text-gray-500 mt-4">
            Real-time data from backend
          </div>
        </div>
      </div>
    </div>
  );
}
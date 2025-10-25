"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, use } from "react";
import { useAuth } from "../../../AuthContext";
import { getApiUrl } from "../../../../lib/api-config";

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("../../map/map-component"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-200 flex items-center justify-center">Loading Map...</div>,
});

// Note: generateStaticParams not compatible with "use client" in static export

export default function SiteDetailPage({ params }) {
  const resolvedParams = use(params);
  const spaceId = resolvedParams.id;
  const { token, user } = useAuth();
  const [space, setSpace] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [measurement, setMeasurement] = useState("0");

  useEffect(() => {
    // Debug spaceId
    console.log("=== SPACE DETAIL PAGE ===");
    console.log("Space ID from params:", spaceId);
    console.log("Space ID type:", typeof spaceId);
    console.log("Space ID truthy:", !!spaceId);
    
    // Check if spaceId is provided
    if (!spaceId) {
      console.log("No spaceId provided, showing error");
      setError("Space ID is required");
      setLoading(false);
      return;
    }

    const fetchSpaceDetails = async () => {
      setLoading(true);
      setError("");
      try {
        // Use the same multi-strategy approach as spaces list page
        let foundSpace = null;
        let lastError = null;
        
        // First try: User's orgId
        const userOrgId = user?.orgId;
        if (userOrgId && !foundSpace) {
          try {
            console.log("Trying user's orgId for space details:", userOrgId);
            const userRes = await fetch(getApiUrl(`/api/space/${userOrgId}`), {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                accept: "application/json",
              },
            });
            const userData = await userRes.json();
            console.log("User orgId space details response:", userData);
            
            if (userRes.ok && userData?.meta?.status === "Success" && userData.data) {
              const spaces = Array.isArray(userData.data) ? userData.data : [userData.data];
              foundSpace = spaces.find(s => s.spaceId === spaceId || s.spaceCode === spaceId);
              if (foundSpace) {
                console.log("Found space with user's orgId:", foundSpace);
              }
            }
          } catch (err) {
            console.log("User orgId failed for space details:", err);
            lastError = err;
          }
        }
        
        // Second try: Known space orgId
        const knownSpaceOrgId = '08de069f-4324-4fee-85f8-fb6d8a41b02f';
        if (!foundSpace) {
          try {
            console.log("Trying known space orgId for space details:", knownSpaceOrgId);
            const spaceRes = await fetch(getApiUrl(`/api/space/${knownSpaceOrgId}`), {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                accept: "application/json",
              },
            });
            const spaceData = await spaceRes.json();
            console.log("Known space orgId space details response:", spaceData);
            
            if (spaceRes.ok && spaceData?.meta?.status === "Success" && spaceData.data) {
              const spaces = Array.isArray(spaceData.data) ? spaceData.data : [spaceData.data];
              foundSpace = spaces.find(s => s.spaceId === spaceId || s.spaceCode === spaceId);
              if (foundSpace) {
                console.log("Found space with known space orgId:", foundSpace);
              }
            }
          } catch (err) {
            console.log("Known space orgId failed for space details:", err);
            lastError = err;
          }
        }
        
        // Third try: All spaces
        if (!foundSpace) {
          try {
            console.log("Trying all spaces for space details");
            const allRes = await fetch(getApiUrl("/api/space"), {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                accept: "application/json",
              },
            });
            const allData = await allRes.json();
            console.log("All spaces space details response:", allData);
            
            if (allRes.ok && allData?.meta?.status === "Success" && allData.data) {
              const spaces = Array.isArray(allData.data) ? allData.data : [allData.data];
              foundSpace = spaces.find(s => s.spaceId === spaceId || s.spaceCode === spaceId);
              if (foundSpace) {
                console.log("Found space with all spaces:", foundSpace);
              }
            }
          } catch (err) {
            console.log("All spaces failed for space details:", err);
            lastError = err;
          }
        }
        
        if (foundSpace) {
          setSpace(foundSpace);
          console.log("Space found and set:", foundSpace);
        } else {
          setError("Space not found. The space may not exist or you may not have access to it.");
          console.log("Space not found with any method");
        }
      } catch (err) {
        console.error("Fetch space details error:", err);
        setError("An error occurred while fetching space details");
      } finally {
        setLoading(false);
      }
    };

    const fetchAssets = async () => {
      try {
        const res = await fetch(getApiUrl("/api/asset"), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const data = await res.json();
        
        if (res.ok && data?.meta?.status === "Success" && Array.isArray(data.data)) {
          // Filter assets for this space
          const spaceAssets = data.data.filter(asset => asset.spaceId === spaceId);
          console.log(`Found ${spaceAssets.length} assets for space ${spaceId}:`, spaceAssets);
          setAssets(spaceAssets);
        }
      } catch (err) {
        console.error("Fetch assets error:", err);
      }
    };

    if (token && spaceId) {
      fetchSpaceDetails();
      fetchAssets();
    }
  }, [token, spaceId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-10 text-[#005580]">Loading space details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-10 text-red-500">{error}</div>
        <div className="text-center">
          <Link href="/dashboard/spaces" className="text-[#005580] hover:underline">
            ← Back to Spaces
          </Link>
        </div>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-10 text-gray-500">Space not found</div>
        <div className="text-center">
          <Link href="/dashboard/spaces" className="text-[#005580] hover:underline">
            ← Back to Spaces
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/dashboard/spaces" className="text-[#005580] hover:underline mb-4 inline-block">
          ← Back to Spaces
        </Link>
        <h1 className="text-2xl font-bold text-[#005580]">
          {space.name}
        </h1>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder={`Search in ${space.name}`}
              className="search-input pr-10"
            />
            <button className="absolute right-0 top-0 h-full px-3 bg-[#005580] text-white rounded-r-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-96 bg-gray-200 relative">
              <MapComponent setMeasurement={setMeasurement} readOnly={true} />
            </div>
            <div className="bg-[#005580] text-white p-4">
              <h2 className="text-xl font-medium mb-2">{space.spaceCode || space.name}</h2>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-sm font-medium">Organization:</p>
                  <p className="text-sm">{space.orgName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status:</p>
                  <p className="text-sm">{space.status || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Location:</p>
                  <p className="text-sm">{space.location || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Coordinates:</p>
                  <p className="text-xs">
                    Lat: {space.latitude || "N/A"}<br/>
                    Long: {space.longitude || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Link href="/dashboard/map">
                  <button className="bg-white text-[#005580] hover:bg-gray-100 px-4 py-2 rounded text-sm transition">
                    View on Map
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-medium text-[#005580] mb-4">
              Assets in this Space
            </h2>
            {assets.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No assets found</p>
            ) : (
              <div className="space-y-4">
                {assets.map((asset) => (
                  <div
                    key={asset.assetId}
                    className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-[#005580]">{asset.name}</h3>
                      <p className="text-sm text-gray-500">{asset.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gradient-to-br from-[#005580] to-[#0077b6] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-2">📍</div>
                  <h3 className="text-xl font-bold">Space Details</h3>
                  <p className="text-sm mt-2">{space.spaceCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../AuthContext";
import { toast } from "sonner";
import { getApiUrl } from "../../../lib/api-config";

export default function SpacesPage() {
  const { token } = useAuth();
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchSpaces = async () => {
      setLoading(true);
      setError("");
      try {
        // Debug user and orgId
        console.log("=== SPACES PAGE DEBUG ===");
        console.log("User:", user);
        console.log("User orgId:", user?.orgId);
        console.log("User organizationName:", user?.organizationName);
        
        // Try multiple approaches to find spaces
        const userOrgId = user?.orgId;
        const knownSpaceOrgId = '08de069f-4324-4fee-85f8-fb6d8a41b02f'; // From space creation response
        
        console.log("User's orgId:", userOrgId);
        console.log("Known space orgId:", knownSpaceOrgId);
        
        // Try different endpoints to find spaces
        let spacesData = [];
        let lastError = null;
        
        // First try: User's orgId
        if (userOrgId) {
          try {
            console.log("Trying user's orgId:", userOrgId);
            const userRes = await fetch(getApiUrl(`/api/v1/spaces/${userOrgId}`), {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                accept: "application/json",
              },
            });
            const userData = await userRes.json();
            console.log("User orgId response:", userData);
            
            if (userRes.ok && userData?.meta?.status === "Success" && userData.data) {
              spacesData = Array.isArray(userData.data) ? userData.data : [userData.data];
              console.log("Found spaces with user's orgId:", spacesData);
            }
          } catch (err) {
            console.log("User orgId failed:", err);
            lastError = err;
          }
        }
        
        // Second try: Known space orgId (if user's orgId didn't work)
        if (spacesData.length === 0) {
          try {
            console.log("Trying known space orgId:", knownSpaceOrgId);
            const spaceRes = await fetch(getApiUrl(`/api/v1/spaces/${knownSpaceOrgId}`), {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                accept: "application/json",
              },
            });
            const spaceData = await spaceRes.json();
            console.log("Known space orgId response:", spaceData);
            
            if (spaceRes.ok && spaceData?.meta?.status === "Success" && spaceData.data) {
              spacesData = Array.isArray(spaceData.data) ? spaceData.data : [spaceData.data];
              console.log("Found spaces with known space orgId:", spacesData);
            }
          } catch (err) {
            console.log("Known space orgId failed:", err);
            lastError = err;
          }
        }
        
        // Third try: All spaces (if specific orgIds didn't work)
        if (spacesData.length === 0) {
          try {
            console.log("Trying all spaces endpoint");
            const allRes = await fetch(getApiUrl("/api/v1/spaces"), {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                accept: "application/json",
              },
            });
            const allData = await allRes.json();
            console.log("All spaces response:", allData);
            
            if (allRes.ok && allData?.meta?.status === "Success" && allData.data) {
              spacesData = Array.isArray(allData.data) ? allData.data : [allData.data];
              console.log("Found spaces with all spaces endpoint:", spacesData);
            }
          } catch (err) {
            console.log("All spaces failed:", err);
            lastError = err;
          }
        }
        
        console.log("Final spaces data:", spacesData);
        setSpaces(spacesData);
        
        if (spacesData.length === 0) {
          setError("No spaces found. Try creating a new space.");
        }
      } catch (err) {
        console.error("Fetch spaces error:", err);
        setError("An error occurred while fetching spaces");
        setSpaces([]);
      } finally {
        setLoading(false);
      }
    };

    if (token && user) {
      fetchSpaces();
    }
  }, [token, user]);

  const filteredSpaces = spaces.filter(space => {
    const searchLower = searchTerm.toLowerCase();
    return (
      space.name?.toLowerCase().includes(searchLower) ||
      space.location?.toLowerCase().includes(searchLower) ||
      space.spaceCode?.toLowerCase().includes(searchLower) ||
      space.orgName?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container-responsive py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-[#005580]">Explore Work Spaces</h1>
        <Link
          href="/dashboard/spaces/add"
          className="flex items-center gap-2 bg-[#005580] text-white px-4 py-2 rounded hover:bg-[#004466] transition text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Workspace
        </Link>
      </div>

      <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search By Site Name, Location"
              className="search-input pr-10 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full px-2 sm:px-3 bg-[#005580] text-white rounded-r-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
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

      {loading ? (
        <div className="text-center py-10 text-[#005580]">
          <div className="spinner mx-auto mb-2"></div>
          <p className="text-sm sm:text-base">Loading spaces...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500 text-sm sm:text-base">{error}</div>
      ) : filteredSpaces.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm sm:text-base px-4">
          {searchTerm ? "No spaces found matching your search." : "No spaces found. Create your first workspace!"}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredSpaces.map((space) => (
            <div key={space.spaceId} className="site-card hover:shadow-lg transition-shadow">
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-[#005580] to-[#0077b6] flex items-center justify-center">
                <div className="site-label text-xs sm:text-sm">{space.spaceCode || space.name}</div>
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                    space.status === 'Active' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {space.status || 'Unknown'}
                  </span>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#005580] mb-2 truncate" title={space.name}>
                  {space.name}
                </h3>
                <div className="space-y-1 mb-3 sm:mb-4">
                  {space.orgName && (
                    <p className="text-xs sm:text-sm text-gray-600 truncate" title={space.orgName}>
                      <span className="font-medium">Organization:</span> {space.orgName}
                    </p>
                  )}
                  {space.location && (
                    <p className="text-xs sm:text-sm text-gray-600 truncate" title={space.location}>
                      <span className="font-medium">Location:</span> {space.location}
                    </p>
                  )}
                  {(space.latitude || space.longitude) && (
                    <p className="text-xs text-gray-500 truncate">
                      Coordinates: {space.latitude}, {space.longitude}
                    </p>
                  )}
                </div>
                <div className="flex justify-center">
                  <Link href={`/dashboard/spaces/${space.spaceId}`} className="view-button text-xs sm:text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
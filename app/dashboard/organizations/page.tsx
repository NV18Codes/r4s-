"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";

export default function OrganizationsPage() {
  const { token } = useAuth();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/organization", {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "text/plain",
          },
        });
        const data = await res.json();
        if (res.ok && data?.meta?.status === "Success" && Array.isArray(data.data)) {
          setOrganizations(data.data);
        } else {
          setError(data?.meta?.messages?.[0]?.text || "Failed to fetch organizations.");
        }
      } catch (err) {
        setError("An error occurred while fetching organizations.");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchOrganizations();
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#005580]">Explore Organizations</h1>
        <Link
          href="/dashboard/organizations/add"
          className="flex items-center gap-2 bg-[#005580] text-white px-4 py-2 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Organizations
        </Link>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input type="text" placeholder="Search By Name, Organisation And More" className="search-input pr-10" />
            <button className="absolute right-0 top-0 h-full px-3 bg-[#005580] text-white rounded-r-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <button className="p-3 border rounded-md text-[#005580]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-[#005580]">Loading organizations...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org, idx) => (
            <div key={org.orgCode || idx} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <div className="flex items-center gap-2 text-[#005580] mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{org.address}</span>
                </div>
                <h2 className="text-lg font-medium text-[#005580]">{org.name}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">{org.orgType} | {org.responsiblePerson}</p>
              <div className="flex justify-center">
                <Link href={`/dashboard/organizations/${org.orgCode}`} className="view-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
          ))}
        </div>
      )}
    </div>
  );
}

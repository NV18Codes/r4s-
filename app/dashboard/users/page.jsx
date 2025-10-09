"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";

export default function UsersPage() {
  const { token } = useAuth();
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingOrgs, setLoadingOrgs] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoadingOrgs(true);
      try {
        const res = await fetch("/api/organization", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        const data = await res.json();
        if (res.ok && data?.meta?.status === "Success" && Array.isArray(data.data)) {
          setOrganizations(data.data);
          if (data.data.length > 0) setSelectedOrgId(data.data[0].orgId);
        } else {
          setOrganizations([]);
        }
      } catch {
        setOrganizations([]);
      } finally {
        setLoadingOrgs(false);
      }
    };
    if (token) fetchOrganizations();
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!selectedOrgId) return;
      setLoadingUsers(true);
      setError("");
      try {
        const res = await fetch(`/api/organization/${selectedOrgId}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        const data = await res.json();
        if (res.ok && data?.meta?.status === "Success" && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          setUsers([]);
          setError(data?.meta?.messages?.[0]?.text || "No users found.");
        }
      } catch {
        setUsers([]);
        setError("An error occurred while fetching users.");
      } finally {
        setLoadingUsers(false);
      }
    };
    if (selectedOrgId && token) fetchUsers();
  }, [selectedOrgId, token]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#005580]">Explore Users</h1>
        <Link href="/dashboard/users/add" className="flex items-center gap-2 bg-[#005580] text-white px-4 py-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New User
        </Link>
      </div>

      <div className="mb-6">
        <label htmlFor="org-select" className="block text-[#005580] font-medium mb-2">
          Select Organization
        </label>
        <select
          id="org-select"
          className="w-full md:w-1/3 p-3 border border-gray-200 rounded"
          value={selectedOrgId}
          onChange={e => setSelectedOrgId(e.target.value)}
          disabled={loadingOrgs}
        >
          {loadingOrgs ? (
            <option>Loading organizations...</option>
          ) : organizations.length === 0 ? (
            <option>No organizations found</option>
          ) : (
            organizations.map(org => (
              <option key={org.orgId} value={org.orgId}>{org.name}</option>
            ))
          )}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loadingUsers ? (
          <div className="p-6 text-center text-[#005580]">Loading users...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#005580] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Created At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.firstName} {user.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0077b6]">{user.emailId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-${user.isActive ? "active" : "inactive"}`}>{user.isActive ? "Active" : "Inactive"}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.createdDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


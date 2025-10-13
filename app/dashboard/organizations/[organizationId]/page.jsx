"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "../../../AuthContext";
import { toast } from "sonner";
import Link from "next/link";

// Note: generateStaticParams not compatible with "use client" in static export

export default function OrganizationDetailPage() {
  const { organizationId } = useParams();
  const { token } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("OrganizationDetailPage loaded with organizationId:", organizationId);

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      setLoading(true);
      setError("");
      try {
        // First, get all organizations to find the one with matching organizationId
        const res = await fetch("/api/organization", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const data = await res.json();
        
        if (res.ok && data?.meta?.status === "Success" && Array.isArray(data.data)) {
          const foundOrg = data.data.find(org => 
            org.orgCode === organizationId || 
            org.orgId === organizationId ||
            org.name === organizationId
          );
          if (foundOrg) {
            setOrganization(foundOrg);
            // Fetch users for this organization
            await fetchOrganizationUsers(foundOrg.orgId);
          } else {
            setError("Organization not found");
          }
        } else {
          setError(data?.meta?.messages?.[0]?.text || "Failed to fetch organization details");
        }
      } catch (err) {
        setError("An error occurred while fetching organization details");
      } finally {
        setLoading(false);
      }
    };

    if (token && organizationId) {
      fetchOrganizationDetails();
    }
  }, [token, organizationId]);

  const fetchOrganizationUsers = async (orgId) => {
    setUsersLoading(true);
    try {
      const res = await fetch(`/api/organization/${orgId}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      
      const data = await res.json();
      
      console.log("Fetch users response:", data);
      console.log("Fetch users status:", res.status);
      
      if (res.ok && data?.meta?.status === "Success" && Array.isArray(data.data)) {
        setUsers(data.data);
        console.log("Loaded users:", data.data);
      } else {
        setUsers([]);
        const message = data?.meta?.messages?.[0]?.text || "No users";
        console.log("No users for organization:", message);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-10 text-[#005580]">Loading organization details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-10 text-red-500">{error}</div>
        <div className="text-center">
          <Link href="/dashboard/organizations" className="text-[#005580] hover:underline">
            ← Back to Organizations
          </Link>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-10 text-gray-500">Organization not found</div>
        <div className="text-center">
          <Link href="/dashboard/organizations" className="text-[#005580] hover:underline">
            ← Back to Organizations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/dashboard/organizations" className="text-[#005580] hover:underline mb-4 inline-block">
          ← Back to Organizations
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-[#005580]">{organization.name}</h1>
            <p className="text-gray-600 mt-2">Organization Code: {organization.orgCode}</p>
          </div>
          <Link
            href={`/dashboard/organizations/${organizationId}/roles`}
            className="bg-[#005580] text-white px-4 py-2 rounded hover:bg-[#004466] transition"
          >
            Manage Roles
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Organization Details */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#005580] mb-4">Organization Details</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Name:</span>
              <span className="ml-2">{organization.name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Type:</span>
              <span className="ml-2">{organization.orgType}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Responsible Person:</span>
              <span className="ml-2">{organization.responsiblePerson}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Address:</span>
              <span className="ml-2">{organization.address}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Status:</span>
              <span className={`ml-2 px-2 py-1 rounded text-sm ${organization.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {organization.status ? 'Active' : 'Inactive'}
              </span>
            </div>
            {organization.createdDate && (
              <div>
                <span className="font-medium text-gray-700">Created:</span>
                <span className="ml-2">{new Date(organization.createdDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Organization Stats */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#005580] mb-4">Statistics</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Total Users:</span>
              <span className="text-[#005580] font-semibold">{users.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Active Users:</span>
              <span className="text-green-600 font-semibold">
                {users.filter(user => user.isActive).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Inactive Users:</span>
              <span className="text-red-600 font-semibold">
                {users.filter(user => !user.isActive).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#005580]">Organization Users</h2>
        </div>
        
        {usersLoading ? (
          <div className="p-6 text-center text-[#005580]">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No users found for this organization</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0077b6]">
                      {user.emailId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdDate ? new Date(user.createdDate).toLocaleDateString() : '-'}
                    </td>
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

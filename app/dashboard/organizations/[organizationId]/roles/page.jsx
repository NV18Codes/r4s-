"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "../../../../AuthContext";
import { toast } from "sonner";
import { getApiUrl } from "../../../../../lib/api-config";
import Link from "next/link";

// Note: generateStaticParams not compatible with "use client" in static export

export default function OrganizationRolesPage() {
  const { organizationId } = useParams();
  const { token } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [orgRoles, setOrgRoles] = useState([]);
  const [globalRoles, setGlobalRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newRoleMapping, setNewRoleMapping] = useState({
    globalRoleName: "",
    aliasRoleName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all organizations to find this one
        const orgsRes = await fetch(getApiUrl("/api/organization"), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const orgsData = await orgsRes.json();
        
        if (orgsRes.ok && orgsData?.meta?.status === "Success" && Array.isArray(orgsData.data)) {
          const foundOrg = orgsData.data.find(org => 
            org.orgCode === organizationId || org.orgId === organizationId
          );
          setOrganization(foundOrg);
          
          if (foundOrg) {
            // Fetch organization-specific roles
            const rolesRes = await fetch(getApiUrl(`/api/role/org/${foundOrg.orgId}`), {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                accept: "application/json",
              },
            });
            
            const rolesData = await rolesRes.json();
            console.log("Org roles response:", rolesData);
            
            if (rolesRes.ok && rolesData?.meta?.status === "Success" && Array.isArray(rolesData.data)) {
              setOrgRoles(rolesData.data);
            }
          }
        }
        
        // Fetch global roles
        const globalRes = await fetch(getApiUrl("/api/role/global"), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const globalData = await globalRes.json();
        
        if (globalRes.ok && globalData?.meta?.status === "Success" && Array.isArray(globalData.data)) {
          setGlobalRoles(globalData.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (token && organizationId) {
      fetchData();
    }
  }, [token, organizationId]);

  const handleAddRoleMapping = async (e) => {
    e.preventDefault();
    
    if (!newRoleMapping.globalRoleName) {
      toast.error("Please select a global role");
      return;
    }

    if (!organization) {
      toast.error("Organization not found");
      return;
    }

    setSaving(true);
    try {
      const payload = [{
        globalRoleName: newRoleMapping.globalRoleName,
        aliasRoleName: newRoleMapping.aliasRoleName || newRoleMapping.globalRoleName,
      }];

      console.log("Creating role mapping:", payload);

      const res = await fetch(getApiUrl(`/api/organization/${organization.orgId}/role`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Create role mapping response:", data);

      if (res.ok && data?.meta?.status === "Success") {
        toast.success("Role mapping created successfully!");
        setNewRoleMapping({ globalRoleName: "", aliasRoleName: "" });
        // Refresh the page
        window.location.reload();
      } else {
        const errorMsg = data?.meta?.messages?.[0]?.text || "Failed to create role mapping";
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Error creating role mapping:", err);
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-10 text-[#005580]">Loading...</div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-10 text-red-500">Organization not found</div>
        <Link href="/dashboard/organizations" className="text-[#005580] hover:underline">
          ← Back to Organizations
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href={`/dashboard/organizations/${organizationId}`} className="text-[#005580] hover:underline mb-4 inline-block">
          ← Back to Organization
        </Link>
        <h1 className="text-2xl font-bold text-[#005580]">
          Role Mappings for {organization.name}
        </h1>
        <p className="text-gray-600 mt-2">Map global roles to this organization</p>
      </div>

      {/* Add New Role Mapping */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-[#005580] mb-4">Add Role Mapping</h2>
        <form onSubmit={handleAddRoleMapping} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Global Role <span className="text-red-500">*</span>
            </label>
            <select
              value={newRoleMapping.globalRoleName}
              onChange={(e) => setNewRoleMapping({ ...newRoleMapping, globalRoleName: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              required
            >
              <option value="">Select global role...</option>
              {globalRoles.map((role) => (
                <option key={role.globalRoleId} value={role.roleName}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alias Name (Optional)
            </label>
            <input
              type="text"
              value={newRoleMapping.aliasRoleName}
              onChange={(e) => setNewRoleMapping({ ...newRoleMapping, aliasRoleName: e.target.value })}
              placeholder="Leave empty to use global name"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#005580] text-white px-6 py-3 rounded hover:bg-[#004466] transition disabled:opacity-50"
            >
              {saving ? "Adding..." : "Add Role"}
            </button>
          </div>
        </form>
      </div>

      {/* Existing Role Mappings */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#005580]">Current Role Mappings</h2>
        </div>

        {orgRoles.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No role mappings configured for this organization.
            <br />
            <span className="text-sm">Add role mappings above to allow users to be added with specific roles.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Global Role Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alias Names
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orgRoles.map((role, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {role.globalRoleName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {role.aliasName && role.aliasName.length > 0 
                        ? role.aliasName.join(", ") 
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">ℹ️ How Role Mappings Work:</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Global roles (SuperUser, Admin, Inspector, etc.) must be mapped to each organization</li>
          <li>Users can only be assigned roles that are mapped to their organization</li>
          <li>You can optionally give the role a different name (alias) for this organization</li>
          <li>Add all roles that you want to assign to users in this organization</li>
        </ul>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../../../AuthContext";
import { getApiUrl } from "../../../../lib/api-config";

export default function AddUserPage() {
  const [form, setForm] = useState({
    roleName: "",
    firstName: "",
    lastName: "",
    organizationName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [orgsLoading, setOrgsLoading] = useState(true);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrganizations = async () => {
      setOrgsLoading(true);
      try {
        const res = await fetch(getApiUrl("/api/organization"), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        const data = await res.json();
        if (res.ok && data?.meta?.status === "Success" && Array.isArray(data.data)) {
          setOrganizations(data.data);
        } else {
          setOrganizations([]);
          toast.error(data?.meta?.messages?.[0]?.text || "Failed to fetch organizations");
        }
      } catch (err) {
        setOrganizations([]);
        toast.error("Failed to fetch organizations");
      } finally {
        setOrgsLoading(false);
      }
    };
    const fetchRoles = async (orgId) => {
      setRolesLoading(true);
      try {
        // Try to fetch organization-specific roles first if we have an orgId
        const endpoint = orgId ? `/api/role/org/${orgId}` : "/api/role/global";
        console.log("Fetching roles from:", endpoint);
        
        const res = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        
        const data = await res.json();
        console.log("Roles response:", data);
        
        if (res.ok && data?.meta?.status === "Success") {
          // Handle organization-specific role response format
          if (Array.isArray(data.data)) {
            // For org-specific roles: [{globalRoleName: "...", aliasName: ["..."]}]
            if (data.data[0]?.globalRoleName) {
              const roleNames = data.data.map(role => role.globalRoleName);
              setAvailableRoles(roleNames);
              console.log("Loaded org-specific roles:", roleNames);
            } else if (data.data[0]?.roleName) {
              // For global roles: [{roleName: "..."}]
              const roleNames = data.data.map(role => role.roleName);
              setAvailableRoles(roleNames);
              console.log("Loaded global roles:", roleNames);
            }
            console.log("Full roles data:", data.data);
          } else if (data.data && data.data.roleName) {
            setAvailableRoles([data.data.roleName]);
            console.log("Loaded single role:", data.data.roleName);
          } else {
            // Fallback to default roles
            console.warn("No roles in response, using fallback");
            setAvailableRoles(["SuperUser", "Admin", "Inspector", "Supervisor", "Viewer"]);
          }
        } else {
          // Fallback to default roles
          console.warn("Failed to fetch roles from backend, using fallback");
          setAvailableRoles(["SuperUser", "Admin", "Inspector", "Supervisor", "Viewer"]);
        }
      } catch (err) {
        console.error("Failed to fetch roles:", err);
        // Fallback to default roles
        setAvailableRoles(["SuperUser", "Admin", "Inspector", "Supervisor", "Viewer"]);
      } finally {
        setRolesLoading(false);
      }
    };

    if (token) {
      fetchOrganizations();
      fetchRoles(); // Fetch global roles initially
    }
  }, [token]);

  // Fetch roles when organization is selected
  useEffect(() => {
    if (form.organizationName && organizations.length > 0) {
      const selectedOrg = organizations.find(org => org.name === form.organizationName);
      if (selectedOrg && selectedOrg.orgId) {
        console.log("Organization selected, fetching org-specific roles for orgId:", selectedOrg.orgId);
        const fetchOrgRoles = async () => {
          setRolesLoading(true);
          try {
            const res = await fetch(getApiUrl(`/api/role/org/${selectedOrg.orgId}`), {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                accept: "application/json",
              },
            });
            
            const data = await res.json();
            console.log("Org-specific roles response:", data);
            
            if (res.ok && data?.meta?.status === "Success" && Array.isArray(data.data)) {
              if (data.data[0]?.globalRoleName) {
                const roleNames = data.data.map(role => role.globalRoleName);
                setAvailableRoles(roleNames);
                console.log("Loaded org-specific roles:", roleNames);
              }
            }
          } catch (err) {
            console.error("Failed to fetch org-specific roles:", err);
          } finally {
            setRolesLoading(false);
          }
        };
        fetchOrgRoles();
      }
    }
  }, [form.organizationName, organizations, token]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.roleName || !form.firstName || !form.lastName || !form.organizationName || !form.email || !form.phoneNumber || !form.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      console.log("=== ADD USER REQUEST ===");
      console.log("Form data:", form);
      console.log("Role selected:", form.roleName);
      console.log("Available roles:", availableRoles);
      console.log("Role exists in available roles?", availableRoles.includes(form.roleName));
      
      const res = await fetch(getApiUrl("/api/user/add-user-org"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      console.log("=== ADD USER RESPONSE ===");
      console.log("Response data:", data);
      console.log("Response status:", res.status);
      console.log("Meta status:", data?.meta?.status);
      console.log("Error messages:", data?.meta?.messages);
      
      // Log the full error message
      if (data?.meta?.messages && data.meta.messages.length > 0) {
        console.log("First error message:", data.meta.messages[0]);
        console.log("Error text:", data.meta.messages[0]?.text);
      }
      
      if (res.ok && data?.meta?.status === "Success") {
        toast.success("User added successfully!", {
          duration: 2000
        });
        setTimeout(() => {
          router.push("/dashboard/users");
          router.refresh(); // Force refresh the users list
        }, 1000);
      } else {
        const errorMessage = data?.meta?.messages?.[0]?.text || data?.detail || "Failed to add user";
        console.error("=== ADD USER FAILED ===");
        console.error("Error message:", errorMessage);
        console.error("Full error data:", data);
        console.error("Form that was sent:", form);
        console.error("Available roles:", availableRoles);
        toast.error(errorMessage, { duration: 5000 }); // Show error longer
      }
    } catch (err) {
      console.error('Add user error:', err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#005580] mb-6">Add User Information</h1>

      <div className="bg-white rounded-lg p-8 shadow-sm">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="roleName" className="block text-[#005580] font-medium mb-2">
              Select Role <span className="text-red-500">*</span>
            </label>
            <select
              id="roleName"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.roleName}
              onChange={handleChange}
              required
              disabled={rolesLoading}
            >
              <option value="">Choose a role...</option>
              {rolesLoading ? (
                <option disabled>Loading roles...</option>
              ) : availableRoles.length === 0 ? (
                <option disabled>No roles available</option>
              ) : (
                availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label htmlFor="firstName" className="block text-[#005580] font-medium mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-[#005580] font-medium mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[#005580] font-medium mb-2">
              Email Id <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email ID"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-[#005580] font-medium mb-2">
              Contact No <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="organizationName" className="block text-[#005580] font-medium mb-2">
              Organization <span className="text-red-500">*</span>
            </label>
            <select
              id="organizationName"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580]"
              value={form.organizationName}
              onChange={handleChange}
              required
              disabled={orgsLoading}
            >
              <option value="">Choose organization...</option>
              {orgsLoading ? (
                <option disabled>Loading organizations...</option>
              ) : (
                organizations.map((org) => (
                  <option key={org.orgId} value={org.name}>
                    {org.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-[#005580] font-medium mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              placeholder="Enter Address"
              rows={4}
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#005580] resize-none"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button 
              type="submit" 
              className="bg-[#005580] text-white px-6 py-2 rounded hover:bg-[#004466] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Adding User..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
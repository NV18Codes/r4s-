"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddOrganizationPage() {
  const [form, setForm] = useState({
    name: "",
    responsiblePerson: "",
    address: "",
    orgType: "",
    status: true,
    createdDate: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/Organisation/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include", // send cookies (token)
      });
      const data = await res.json();
      if (res.ok && data?.data?.message) {
        toast.success(data.data.message, {
          duration: 2000,
          onAutoClose: () => router.push("/dashboard/organizations"),
        });
      } else {
        toast.error(data?.data?.message || "Failed to add organization.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#005580] mb-6">Add Organisation Information</h1>
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-[#005580] font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Organisation Name"
              className="w-full p-3 border border-gray-200 rounded"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="responsiblePerson" className="block text-[#005580] font-medium mb-2">
              Responsible Person
            </label>
            <input
              type="text"
              id="responsiblePerson"
              placeholder="Add User"
              className="w-full p-3 border border-gray-200 rounded"
              value={form.responsiblePerson}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-[#005580] font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              className="w-full p-3 border border-gray-200 rounded"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="orgType" className="block text-[#005580] font-medium mb-2">
              Organisation Type
            </label>
            <div className="relative">
              <select
                id="orgType"
                className="w-full p-3 border border-gray-200 rounded appearance-none"
                value={form.orgType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="government">Government</option>
                <option value="private">Private</option>
                <option value="ngo">NGO</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-[#005580] rounded-sm flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-[#005580] font-medium">Status</span>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bg-[#005580] text-white px-6 py-2 rounded" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

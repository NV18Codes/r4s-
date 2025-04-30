import Link from "next/link"

export default function UsersPage() {
  const users = [
    {
      id: "01",
      name: "John Doe",
      email: "john@Example.Com",
      phone: "9876543210",
      created: "2024-01-01 10:00:00",
      lastLogin: "2024-03-25 14:00:00",
      role: "Admin",
      status: "Active",
      address: "1808 President St, Johannesburg, Gauteng.",
    },
    {
      id: "02",
      name: "John Doe",
      email: "john@Example.Com",
      phone: "9876543210",
      created: "2024-01-01 10:00:00",
      lastLogin: "2024-03-25 14:00:00",
      role: "Admin",
      status: "Inactive",
      address: "1808 President St, Johannesburg, Gauteng.",
    },
    {
      id: "03",
      name: "John Doe",
      email: "john@Example.Com",
      phone: "9876543210",
      created: "2024-01-01 10:00:00",
      lastLogin: "2024-03-25 14:00:00",
      role: "Admin",
      status: "Banned",
      address: "1808 President St, Johannesburg, Gauteng.",
    },
    {
      id: "04",
      name: "John Doe",
      email: "john@Example.Com",
      phone: "9876543210",
      created: "2024-01-01 10:00:00",
      lastLogin: "2024-03-25 14:00:00",
      role: "Admin",
      status: "Active",
      address: "1808 President St, Johannesburg, Gauteng.",
    },
    {
      id: "05",
      name: "John Doe",
      email: "john@Example.Com",
      phone: "9876543210",
      created: "2024-01-01 10:00:00",
      lastLogin: "2024-03-25 14:00:00",
      role: "Admin",
      status: "Active",
      address: "1808 President St, Johannesburg, Gauteng.",
    },
    {
      id: "06",
      name: "John Doe",
      email: "john@Example.Com",
      phone: "9876543210",
      created: "2024-01-01 10:00:00",
      lastLogin: "2024-03-25 14:00:00",
      role: "Admin",
      status: "Active",
      address: "1808 President St, Johannesburg, Gauteng.",
    },
    {
      id: "07",
      name: "John Doe",
      email: "john@Example.Com",
      phone: "9876543210",
      created: "2024-01-01 10:00:00",
      lastLogin: "2024-03-25 14:00:00",
      role: "Admin",
      status: "Active",
      address: "1808 President St, Johannesburg, Gauteng.",
    },
    {
      id: "08",
      name: "John Doe",
      email: "john@Example.Com",
      phone: "9876543210",
      created: "2024-01-01 10:00:00",
      lastLogin: "2024-03-25 14:00:00",
      role: "Admin",
      status: "Active",
      address: "1808 President St, Johannesburg, Gauteng.",
    },
    {
      id: "09",
      name: "John Doe",
      email: "john@Example.Com",
      phone: "9876543210",
      created: "2024-01-01 10:00:00",
      lastLogin: "2024-03-25 14:00:00",
      role: "Admin",
      status: "Inactive",
      address: "1808 President St, Johannesburg, Gauteng.",
    },
    {
      id: "10",
      name: "John Doe",
      email: "john@Example.Com",
      phone: "9876543210",
      created: "2024-01-01 10:00:00",
      lastLogin: "2024-03-25 14:00:00",
      role: "Admin",
      status: "Inactive",
      address: "1808 President St, Johannesburg, Gauteng.",
    },
  ]

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

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#005580] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Id</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0077b6]">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-${user.status.toLowerCase()}`}>{user.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-gray-500">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-center">
          <nav className="flex items-center gap-1">
            <button className="px-3 py-1 border rounded text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="px-3 py-1 border rounded bg-[#e9d5ff] text-[#005580]">1</button>
            <button className="px-3 py-1 border rounded text-gray-500">2</button>
            <button className="px-3 py-1 border rounded text-gray-500">3</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 border rounded text-gray-500">99</button>
            <button className="px-3 py-1 border rounded text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

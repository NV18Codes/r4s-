import Link from "next/link";

export default function SiteDetailPage({ params }: { params: { id: string } }) {
  const siteId = params.id;

  const sites = [
    {
      id: 2,
      title:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    },
    {
      id: 3,
      title:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    },
    {
      id: 4,
      title:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    },
  ];

  const assets = [
    { name: "Road Inspection", status: "90% Completed", icon: "🛣️" },
    { name: "Bridge Check", status: "Due Soon", icon: "🌉" },
    { name: "Traffic Sign Survey", status: "Critical", icon: "🚦" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#005580] mb-6">
        Explore Site {siteId}
      </h1>

      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder={`Search In Site -${siteId}`}
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
          <button className="p-3 border rounded-md text-[#005580]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-96 bg-gray-200 relative">
              {/* Map would go here */}
            </div>
            <div className="bg-[#005580] text-white p-4">
              <h2 className="text-xl font-medium mb-2">Site-{siteId}</h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm">Latitude: 312897892366</p>
                </div>
                <div>
                  <p className="text-sm">Longitude: -2568975982233</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Link href="/dashboard/map">
                  <button className="bg-white text-[#005580] px-4 py-2 rounded text-sm">
                    Edit Information
                  </button>
                </Link>
                <button className="bg-white text-[#005580] px-4 py-2 rounded text-sm">
                  Delete Site
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-medium text-[#005580] mb-4">
              Assets Marked
            </h2>
            <div className="space-y-4">
              {assets.map((asset, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-2 border rounded-lg"
                >
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                    {asset.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-[#005580]">{asset.name}</h3>
                    <p
                      className={`text-sm ${
                        asset.status.includes("Critical")
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {asset.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-200 relative">
              {/* Road image would go here */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-2">📍</div>
                  <h3 className="text-xl font-bold">Explore Sites Search</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {sites.map((site) => (
          <div key={site.id} className="site-card">
            <div className="relative h-48 bg-gray-200">
              <div className="site-label">Site-{site.id}</div>
            </div>
            <div className="p-4">
              <p className="text-center text-sm text-gray-600 mb-4">
                {site.title}
              </p>
              <div className="flex justify-center">
                <Link
                  href={`/dashboard/spaces/${site.id}`}
                  className="view-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
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
    </div>
  );
}

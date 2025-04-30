"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-200 flex items-center justify-center">Loading Map...</div>,
})

export default function MapPage() {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [activeDrawTool, setActiveDrawTool] = useState<string | null>(null)
  const [showNewAssetForm, setShowNewAssetForm] = useState(false)
  const [measurement, setMeasurement] = useState("0")
  const [searchTerm, setSearchTerm] = useState("")
  const [assetType, setAssetType] = useState("")
  const mapRef = useRef(null)

  const assets = [
    { id: 1, name: "Stop Sign1", type: "Sign" },
    { id: 2, name: "Stop Sign2", type: "Sign" },
    { id: 3, name: "Crash Barrier", type: "Barrier" },
    { id: 4, name: "Exit Sign", type: "Sign" },
  ]

  const inspections = [
    { id: 1, name: "Login Crack 1", type: "Crack" },
    { id: 2, name: "Pothole 1", type: "Pothole" },
    { id: 3, name: "Pothole 2", type: "Pothole" },
    { id: 4, name: "Edge Break 1", type: "Edge Break" },
  ]

  const menuItems = ["Home", "Asset Types", "Organisations", "Properties", "Users", "Map", "Spaces"]

  const togglePanel = (panel: string) => {
    if (activePanel === panel) {
      setActivePanel(null)
    } else {
      setActivePanel(panel)
      setShowNewAssetForm(false)
    }
  }

  const toggleDrawTool = (tool: string) => {
    if (activeDrawTool === tool) {
      setActiveDrawTool(null)
    } else {
      setActiveDrawTool(tool)
      setActivePanel("create")
    }
  }

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would save the asset data
    console.log("Asset added")
    setShowNewAssetForm(false)
  }

  return (
    <div className="relative h-screen flex flex-col">
      {/* Main content container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search bar header */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Organisation"
              className="w-64 p-2 pr-10 border border-gray-300 rounded shadow-sm"
            />
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

          <div className="relative">
            <input
              type="text"
              placeholder="Search Space"
              className="w-64 p-2 pr-10 border border-gray-300 rounded shadow-sm"
            />
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
        </div>

        {/* Map container with fixed dimensions */}
        <div className="flex-1 flex justify-center items-center p-4 mt-16">
          <div className="w-full h-full max-w-5xl max-h-[70vh] rounded-lg overflow-hidden border-2 border-[#005580] shadow-lg">
            <div className="relative w-full h-full">
              <MapComponent ref={mapRef} activeDrawTool={activeDrawTool} setMeasurement={setMeasurement} />
            </div>
          </div>
        </div>
      </div>

      {/* Left sidebar */}
      <div className="absolute top-20 left-4 map-sidebar rounded-lg overflow-hidden z-10">
        <div className="flex flex-col items-center p-2 bg-[#005580] text-white">
          <button
            className="p-3 hover:bg-white/10 rounded-lg mb-4"
            onClick={() => {
              togglePanel("create")
              setShowNewAssetForm(false)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button className="p-3 hover:bg-white/10 rounded-lg mb-4" onClick={() => togglePanel("assets")}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path
                fillRule="evenodd"
                d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button className="p-3 hover:bg-white/10 rounded-lg mb-4" onClick={() => togglePanel("inspections")}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button className="p-3 hover:bg-white/10 rounded-lg mb-4" onClick={() => togglePanel("reports")}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </button>

          <button className="p-3 hover:bg-white/10 rounded-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>

          <button className="p-3 hover:bg-white/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {activePanel === "create" && (
        <div className="absolute top-20 left-20 map-menu p-4 z-10 bg-[#005580] text-white rounded-lg">
          <h2 className="text-white text-lg font-medium mb-4 uppercase">CREATE</h2>
          <div className="space-y-2">
            <button
              className={`flex items-center gap-2 w-full p-2 rounded ${
                activeDrawTool === "vertex" ? "bg-white/20" : "hover:bg-white/10"
              }`}
              onClick={() => toggleDrawTool("vertex")}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="4" />
              </svg>
              Draw Vertex
            </button>
            <button
              className={`flex items-center gap-2 w-full p-2 rounded ${
                activeDrawTool === "circle" ? "bg-white/20" : "hover:bg-white/10"
              }`}
              onClick={() => toggleDrawTool("circle")}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              Draw Circle
            </button>
            <button
              className={`flex items-center gap-2 w-full p-2 rounded ${
                activeDrawTool === "polyline" ? "bg-white/20" : "hover:bg-white/10"
              }`}
              onClick={() => toggleDrawTool("polyline")}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 3L9 9L15 3L21 9" />
              </svg>
              Draw Polyline
            </button>
          </div>
        </div>
      )}

      {activePanel === "assets" && (
        <div className="absolute top-20 left-20 map-menu p-4 z-10 bg-[#005580] text-white rounded-lg">
          <h2 className="text-white text-lg font-medium mb-4 uppercase">ASSETS</h2>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Assets"
                className="w-full p-2 pr-10 bg-white/10 text-white border-none rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-0 top-0 h-full px-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {assets
              .filter((asset) => asset.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((asset) => (
                <div key={asset.id} className="asset-item">
                  {asset.name}
                </div>
              ))}
          </div>
        </div>
      )}

      {activePanel === "inspections" && (
        <div className="absolute top-20 left-20 map-menu p-4 z-10 bg-[#005580] text-white rounded-lg">
          <h2 className="text-white text-lg font-medium mb-4 uppercase">INSPECTIONS</h2>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Inspections"
                className="w-full p-2 pr-10 bg-white/10 text-white border-none rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-0 top-0 h-full px-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {inspections
              .filter((inspection) => inspection.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((inspection) => (
                <div key={inspection.id} className="asset-item">
                  {inspection.name}
                </div>
              ))}
          </div>
        </div>
      )}

      {activePanel === "reports" && (
        <div className="absolute top-20 left-20 map-menu p-4 z-10 bg-[#005580] text-white rounded-lg">
          <h2 className="text-white text-lg font-medium mb-4 uppercase">REPORTS</h2>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Reports"
                className="w-full p-2 pr-10 bg-white/10 text-white border-none rounded"
              />
              <div className="absolute right-0 top-0 h-full px-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full bg-white/10 hover:bg-white/20 rounded p-2 text-sm">Create Report</button>
            <button className="w-full bg-white/10 hover:bg-white/20 rounded p-2 text-sm">Edit Report</button>
            <button className="w-full bg-white/10 hover:bg-white/20 rounded p-2 text-sm">Send Report</button>
          </div>
        </div>
      )}

      {showNewAssetForm && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-3xl z-10">
          <div className="bg-[#005580] text-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">NEW ASSET</h2>
              <button className="bg-white text-[#005580] px-4 py-1 rounded text-sm" onClick={handleAddAsset}>
                Add Asset
              </button>
            </div>
            <form onSubmit={handleAddAsset}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Name</label>
                  <input type="text" placeholder="Name" className="w-full p-2 bg-white text-gray-800 rounded" />
                </div>
                <div>
                  <label className="block mb-1">Measurement :{measurement}</label>
                  <input
                    type="text"
                    value={measurement}
                    readOnly
                    className="w-full p-2 bg-white/10 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Asset Type</label>
                  <select
                    className="w-full p-2 bg-white text-gray-800 rounded"
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value)}
                  >
                    <option value="">Asset Type</option>
                    <option value="sign">Sign</option>
                    <option value="barrier">Barrier</option>
                    <option value="road">Road</option>
                    <option value="bridge">Bridge</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-1">Comments</label>
                <textarea placeholder="Name" className="w-full p-2 bg-white text-gray-800 rounded h-24"></textarea>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Right sidebar */}
      <div className="absolute top-20 right-4 bg-gradient-to-b from-[#005580] to-[#0077b6] text-white rounded-lg overflow-hidden z-10">
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={`/dashboard/${item.toLowerCase()}`}
              className="block py-2 px-4 hover:bg-white/10 rounded"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* <footer className="footer w-full bg-gray-100 py-2 px-4 text-center text-gray-600 z-10">
        <p>2025 R4S ALL RIGHT RESERVED | Privacy Policy</p>
      </footer> */}
    </div>
  )
}
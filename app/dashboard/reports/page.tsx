"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export default function ReportsPage() {
  const barChartRef = useRef<HTMLCanvasElement>(null)
  const pieChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Bar Chart
    if (barChartRef.current) {
      const barCtx = barChartRef.current.getContext("2d")

      if (barCtx) {
        const barChart = new Chart(barCtx, {
          type: "bar",
          data: {
            labels: ["Austria", "Brazil", "France", "Italy", "USA"],
            datasets: [
              {
                label: "2003",
                data: [25000, 20000, 10000, 35000, 15000],
                backgroundColor: "#f9d77e",
                stack: "Stack 0",
              },
              {
                label: "2004",
                data: [50000, 40000, 40000, 80000, 10000],
                backgroundColor: "#a3e635",
                stack: "Stack 0",
              },
              {
                label: "2005",
                data: [45000, 45000, 25000, 40000, 90000],
                backgroundColor: "#38bdf8",
                stack: "Stack 0",
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                stacked: true,
                grid: {
                  color: "#e5e7eb",
                },
              },
              y: {
                stacked: true,
                beginAtZero: true,
                max: 175000,
                ticks: {
                  stepSize: 25000,
                },
                grid: {
                  color: "#e5e7eb",
                },
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  boxWidth: 10,
                },
              },
              title: {
                display: false,
              },
            },
          },
        })

        return () => {
          barChart.destroy()
        }
      }
    }
  }, [])

  useEffect(() => {
    // Pie Chart
    if (pieChartRef.current) {
      const pieCtx = pieChartRef.current.getContext("2d")

      if (pieCtx) {
        const pieChart = new Chart(pieCtx, {
          type: "pie",
          data: {
            labels: ["Instruction", "Support Services", "Non-Instruction"],
            datasets: [
              {
                data: [61, 35, 4],
                backgroundColor: ["#f59e0b", "#84cc16", "#38bdf8"],
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "right",
                labels: {
                  usePointStyle: true,
                  boxWidth: 10,
                },
              },
              title: {
                display: true,
                text: "The Cost of an Education: Breakdown of Average Cost Per",
                position: "top",
                align: "center",
                font: {
                  size: 14,
                  weight: "normal",
                },
                padding: {
                  top: 10,
                  bottom: 0,
                },
              },
              subtitle: {
                display: true,
                text: "Student Expenditures (in dollars) for Public Education",
                position: "top",
                align: "center",
                font: {
                  size: 14,
                  weight: "normal",
                },
                padding: {
                  top: 0,
                  bottom: 20,
                },
              },
            },
          },
        })

        return () => {
          pieChart.destroy()
        }
      }
    }
  }, [])

  const stats = [
    {
      title: "Assets",
      count: "10",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      ),
    },
    {
      title: "Organisations",
      count: "15",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      title: "Properties",
      count: "50+",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="7" />
          <path d="M12 9v3l1.5 1.5" />
          <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
          <path d="m1 14 3-3 3 3" />
          <path d="m17 14 3-3 3 3" />
        </svg>
      ),
    },
    {
      title: "Spaces",
      count: "11",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#005580]">Reports</h1>
        <button className="bg-[#005580] text-white px-4 py-2 rounded">New Report</button>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input type="text" placeholder="Search Assets Types" className="search-input pr-10" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-sm flex justify-between items-center p-6 text-white"
            style={{
              background: "linear-gradient(135deg, #005580 0%, #0077b6 100%)",
            }}
          >
            <div className="text-white">{stat.icon}</div>
            <div className="text-right">
              <div className="text-4xl font-bold">{stat.count}</div>
              <div className="text-lg">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="h-[400px]">
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="h-[400px]">
            <canvas ref={pieChartRef}></canvas>
          </div>
          <div className="text-center text-xs text-gray-500 mt-4">NCES Common Core Data (CCD) 2002-03</div>
        </div>
      </div>
    </div>
  )
}

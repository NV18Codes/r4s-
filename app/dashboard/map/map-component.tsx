"use client"

import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import "leaflet-draw"

// Extend Leaflet types to include Draw
declare module "leaflet" {
  namespace Control {
    interface DrawOptions {
      draw?: {
        polyline?: boolean
        polygon?: boolean
        circle?: boolean
        rectangle?: boolean
        marker?: boolean
        circlemarker?: boolean
      }
      edit?: {
        featureGroup: L.FeatureGroup
      }
    }
    interface DrawControl extends L.Control {
      new (options?: DrawOptions): DrawControl
    }
  }
  namespace Draw {
    interface Event {
      CREATED: string
    }
  }
}

interface DrawControlProps {
  activeDrawTool: string | null
  setMeasurement: (value: string) => void
}

const DrawControl = ({ activeDrawTool, setMeasurement }: DrawControlProps) => {
  const map = useMap()
  const [drawControl, setDrawControl] = useState<L.Control.DrawControl | null>(null)

  useEffect(() => {
    if (drawControl) {
      map.removeControl(drawControl)
    }

    let newDrawControl: L.Control.DrawControl | null = null

    if (activeDrawTool) {
      const DrawControl = L.Control.Draw as unknown as L.Control.DrawControl
      newDrawControl = new DrawControl({
        draw: {
          polyline: activeDrawTool === "polyline",
          polygon: false,
          circle: activeDrawTool === "circle",
          rectangle: false,
          marker: activeDrawTool === "vertex",
          circlemarker: false,
        },
        edit: {
          featureGroup: new L.FeatureGroup(),
        },
      })
      map.addControl(newDrawControl)
    }

    setDrawControl(newDrawControl)

    return () => {
      if (newDrawControl) {
        map.removeControl(newDrawControl)
      }
    }
  }, [activeDrawTool, map])

  useEffect(() => {
    const drawnItems = new L.FeatureGroup()
    map.addLayer(drawnItems)

    const handleDrawCreated = (e: any) => {
      const layer = e.layer
      drawnItems.addLayer(layer)

      // Calculate measurements
      let measurement = "0"
      if (e.layerType === "circle") {
        measurement = Math.round(layer.getRadius()).toString()
      } else if (e.layerType === "polyline") {
        const latlngs = layer.getLatLngs()
        let distance = 0
        for (let i = 0; i < latlngs.length - 1; i++) {
          distance += latlngs[i].distanceTo(latlngs[i + 1])
        }
        measurement = Math.round(distance).toString()
      }

      setMeasurement(measurement)
    }

    map.on(L.Draw.Event.CREATED, handleDrawCreated)

    return () => {
      map.removeLayer(drawnItems)
      map.off(L.Draw.Event.CREATED, handleDrawCreated)
    }
  }, [map, setMeasurement])

  return null
}

interface MapComponentProps {
  activeDrawTool: string | null
  setMeasurement: (value: string) => void
}

const MapComponent = forwardRef<any, MapComponentProps>(({ activeDrawTool, setMeasurement }, ref) => {
  const [map, setMap] = useState<L.Map | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Fix Leaflet icon issues
      const iconRetinaUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png"
      const iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
      const shadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
      
      L.Icon.Default.mergeOptions({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
      })
    }
  }, [])

  useImperativeHandle(ref, () => ({
    getMap: () => map,
  }))

  // Function to handle map initialization
  const handleMapReady = () => {
    if (map) {
      // Set max bounds to prevent the map from being dragged outside of the world
      const bounds = L.latLngBounds(
        L.latLng(-90, -180),  // Southwest corner
        L.latLng(90, 180)     // Northeast corner
      )
      map.setMaxBounds(bounds)
      map.setMinZoom(2)  // Prevent zooming out too far
      
      // Add bounds viscosity to make it harder to drag outside bounds
      map.options.maxBoundsViscosity = 1.0
    }
  }

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      whenReady={handleMapReady}
      className="leaflet-container z-0 overflow-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {activeDrawTool && <DrawControl activeDrawTool={activeDrawTool} setMeasurement={setMeasurement} />}
    </MapContainer>
  )
})

MapComponent.displayName = "MapComponent"

export default MapComponent
"use client"

import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import "@geoman-io/leaflet-geoman-free"

// Extend Leaflet types to include Geoman
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
      position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright'
    }
    interface DrawControl extends L.Control {
      new (options?: DrawOptions): DrawControl
    }
  }
  namespace Draw {
    interface Event {
      CREATED: string
      DRAWING: string
    }
  }
  interface Map {
    pm: any;
  }
}

const MapComponent = forwardRef<any, { setMeasurement: (value: string) => void, readOnly?: boolean }>(( { setMeasurement, readOnly = false }, ref) => {
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

  useEffect(() => {
    if (!map) return;
    // Set max bounds to prevent the map from being dragged outside of the world
    const bounds = L.latLngBounds(
      L.latLng(-90, -180),  // Southwest corner
      L.latLng(90, 180)     // Northeast corner
    )
    map.setMaxBounds(bounds)
    map.setMinZoom(2)  // Prevent zooming out too far
    map.options.maxBoundsViscosity = 1.0

    // Only add Geoman controls if not in readOnly mode
    if (!readOnly) {
      map.pm.addControls({
        position: 'topleft',
        drawMarker: true,
        drawPolyline: true,
        drawCircle: true,
        drawPolygon: true,
        editMode: true,
        dragMode: true,
        cutPolygon: false,
        removalMode: true,
      })

      // Prevent self-intersection for polylines and polygons
      map.on('pm:drawstart', (e: any) => {
        if (e.shape === 'Line' || e.shape === 'Polygon') {
          map.pm.setGlobalOptions({ allowSelfIntersection: false })
        }
      })

      // Measurement callback (optional, you can expand this as needed)
      map.on('pm:create', (e: any) => {
        if (e.shape === 'Circle') {
          setMeasurement(Math.round(e.layer.getRadius()).toString())
        } else if (e.shape === 'Line') {
          const latlngs = e.layer.getLatLngs()
          let distance = 0
          for (let i = 0; i < latlngs.length - 1; i++) {
            distance += latlngs[i].distanceTo(latlngs[i + 1])
          }
          setMeasurement(Math.round(distance).toString())
        }
      })
    }
  }, [map, setMeasurement, readOnly])

  return (
    <MapContainer
      center={[-26.2041, 28.0473]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      whenReady={event => setMap(event.target)}
      className="leaflet-container z-0 overflow-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

{/* <TileLayer
  attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
/> */}
    </MapContainer>
  )
})

MapComponent.displayName = "MapComponent"

export default MapComponent
declare module "react-leaflet-draw" {
    import * as React from "react"
  
    interface EditControlProps {
      position?: "topleft" | "topright" | "bottomleft" | "bottomright"
      draw?: {
        polyline?: boolean | L.DrawOptions.PolylineOptions
        polygon?: boolean | L.DrawOptions.PolygonOptions
        rectangle?: boolean | L.DrawOptions.RectangleOptions
        circle?: boolean | L.DrawOptions.CircleOptions
        marker?: boolean | L.DrawOptions.MarkerOptions
        circlemarker?: boolean | L.DrawOptions.CircleMarkerOptions
      }
      edit?: {
        edit?: boolean
        remove?: boolean
        featureGroup: L.FeatureGroup
      }
      onCreated?: (e: L.DrawEvents.Created) => void
      onEdited?: (e: L.DrawEvents.Edited) => void
      onDeleted?: (e: L.DrawEvents.Deleted) => void
      onMounted?: (drawControl: L.Control.Draw) => void
      onEditStart?: (e: L.DrawEvents.EditStart) => void
      onEditStop?: (e: L.DrawEvents.EditStop) => void
      onDrawStart?: (e: L.DrawEvents.DrawStart) => void
      onDrawStop?: (e: L.DrawEvents.DrawStop) => void
      onDrawVertex?: (e: L.DrawEvents.DrawVertex) => void
      onEditMove?: (e: L.DrawEvents.EditMove) => void
      onEditResize?: (e: L.DrawEvents.EditResize) => void
      onEditVertex?: (e: L.DrawEvents.EditVertex) => void
    }
  
    export class EditControl extends React.Component<EditControlProps> {}
  }
  
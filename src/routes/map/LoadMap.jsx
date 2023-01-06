import React, { useState } from "react"
import { useLoadScript } from "@react-google-maps/api"
import Map from "./Map"
import { useEffect } from "react"

export default function LoadMap() {
  const [markers, setMarkers] = useState([])
  const [routeHead, setRouteHead] = useState({})
  const [wayPoints, setWayPoints] = useState([])
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Add your API key
  })

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (markers) {
      setIsMounted(true)
    }
    setMarkers(JSON.parse(sessionStorage.getItem("markers")))
    setRouteHead(JSON.parse(sessionStorage.getItem("routeHead")))
    setWayPoints(markers)
  }, [isLoaded, isMounted])

  return isLoaded && isMounted ? (
    <Map
      markers={markers}
      setMarkers={setMarkers}
      wayPoints={wayPoints}
      setWayPoints={setWayPoints}
      routeHead={routeHead}
    />
  ) : (
    loadError
  )
}

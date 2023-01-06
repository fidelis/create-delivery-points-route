import L from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

const createRoutingMachine = () => {
  var wp = []

  const markers = JSON.parse(sessionStorage.getItem("data"))

  wp = markers.map((m, i) => {
    if (i === 0) {
      return L.latLng(-16.6446324, -49.416115)
    }
    return L.latLng(m[9], m[10])
  })

  // const map = useMap
  const myRoute = L.Routing.control({
    waypoints: wp,
    lineOptions: {
      styles: [{ color: "red", opacity: 1, weight: 3 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: false,
    showAlternatives: false,
  })

  return myRoute
}

const RoutingMachine = createControlComponent(createRoutingMachine)
export default RoutingMachine

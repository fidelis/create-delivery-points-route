import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import RouteLoad from "./routes/routeLoad/RouteLoad"
import LoadMap from "./routes/map/LoadMap"
import Map from "./routes/map/Map"
import WayPointsTable from "./routes/wayPointsTable/WayPointsTable"
import ErrorPage from "./error-page"
import reportWebVitals from "./reportWebVitals"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteLoad />,
    errorElement: <ErrorPage />,
  },
  {
    path: "LoadMap",
    element: <LoadMap />,
    errorElement: <ErrorPage />,
  },
  {
    path: "Map",
    element: <Map />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/WayPointsTable",
    element: <WayPointsTable />,
    errorElement: <ErrorPage />,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

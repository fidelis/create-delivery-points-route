import React, { useState, useEffect } from "react"
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { Trash, ArrowUp, ArrowDown } from "phosphor-react"
import { useNavigate } from "react-router-dom"
import { useLayoutEffect } from "react"
import GetAddress from "../../utils/GetAddress"

function Map({ markers, setMarkers, wayPoints, setWayPoints, routeHead }) {
  let tempMarker = {}
  var inputClass =
    "shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-4 my-2"
  var labelClass = "block text-gray-700 text-sm font-bold m-2 mx-4 my-2"
  const [mapRef, setMapRef] = useState()
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [infoWindowData, setInfoWindowData] = useState()

  const navigate = useNavigate()

  const delay = (ms) => new Promise((res) => setTimeout(res, ms))

  const onChangeMarkers = () => {
    if (markers) {
      if (markers.length > 0) {
        sessionStorage.removeItem("markers")
        sessionStorage.setItem("markers", JSON.stringify(markers))
        setWayPoints(markers)
      }
    }
  }

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
      onChangeMarkers()
    }
  }, [])

  useEffect(() => {
    onChangeMarkers()
  }, [markers])

  useLayoutEffect(() => {
    onChangeMarkers()
  })

  const handleOnLoad = (map) => {
    onChangeMarkers()
    setMapRef(map)
    const bounds = new window.google.maps.LatLngBounds()
    if (markers && markers.length > 0) {
      markers.forEach(({ latitude, longitude }) => {
        let pos = new window.google.maps.LatLng(latitude, longitude)
        bounds.extend(pos)
      })
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            map.setZoom(13)
            map.setCenter(pos)
          },
          (e) => {
            console.log(e)
          },
          { maximumAge: 15000, timeout: 60000, enableHighAccuracy: true }
        )
      } else {
        let pos = new window.google.maps.latLng()
        pos = { lat: -16.6446324, lng: -49.416115 }
        map.setZoom(10)
        map.setCenter(pos)
      }
    }
    map.fitBounds(bounds)
    map.addListener("click", function (e) {
      placeMarker(e.latLng, map)
    })
  }

  const handleSubmit = async (event) => {
    if (markers.length < 3) {
      window.alert("Precisa haver pelo menos 3 pontos marcados!")
      return
    }
    const auxMarkers = markers.map(async (marker) => {
      if (marker.endereco === "") {
        let latitude = marker.latitude
        let longitude = marker.longitude
        let address = await GetAddress(latitude, longitude).then(
          (result) => result
        )
        marker = { ...marker, endereco: address }
      }
      return marker
    })
    const auxMrks = []
    auxMarkers.forEach((item) => {
      item.then((data) => data).then((y) => auxMrks.push(y))
    })
    await delay(1000)
    sessionStorage.removeItem("markers")
    sessionStorage.setItem("markers", JSON.stringify(auxMrks))
    await delay(1000)
    navigate("/WayPointsTable", { replace: false })
  }

  function placeMarker(location, map) {
    const markerId = markers.length
    const markerQtde = markerId + 1
    tempMarker = {
      idRota: routeHead.idRota,
      idVeiculo: routeHead.idVeiculo,
      idFrota: routeHead.idFrota,
      idMotorista: routeHead.idMotorista,
      idAjudante1: routeHead.idAjudante1,
      idAjudante2: routeHead.idAjudante2,
      idAjudante3: routeHead.idAjudante3,
      idCarga: routeHead.idCarga,
      idPonto: markerQtde,
      latitude: parseFloat(location.lat().toFixed(6)),
      longitude: parseFloat(location.lng().toFixed(6)),
      cpfCNPJ: "",
      nome: "PONTO " + markerQtde,
      endereco: "",
      distanciaMinima: "100",
      horarioParada: "",
      dataHoraInicio: routeHead.dtHrInicio,
      dataHoraFim: routeHead.dtHrFim,
      observacao: "",
      valorAReceber: 0,
      custoPernoite: "",
      idSequencia: markerQtde,
      distanciaEmKm: 1,
      tipoRegistro: "2.ENTREGA",
    }
    markers.push(tempMarker)
    setMarkers(markers)
    onChangeMarkers()
    window.location.reload(false)
  }

  const handleMarkerClick = (id, lat, lng, nome) => {
    mapRef?.panTo({ lat, lng })
    setInfoWindowData({ id, nome })
    setIsOpen(true)
  }

  const handleMarkerDrag = (mk, index) => {
    const newLat = parseFloat(mk.latLng.lat().toFixed(6))
    const newLng = parseFloat(mk.latLng.lng().toFixed(6))
    const auxMarkers = markers.map((marker, i) => {
      if (i === index) {
        marker = { ...marker, latitude: newLat, longitude: newLng }
      }
      return marker
    })
    setMarkers(() => auxMarkers)
    // console.log("Call onChangeMarkers from handleMarkerDrag")
    onChangeMarkers()
    window.location.reload(false)
  }

  const handleDeleteMarker = (index) => {
    if (index !== undefined) {
      markers = markers
        .filter((marker, i) => i !== index)
        .map((marker, i) => {
          marker = { ...marker, id: i }
          return marker
        })
      setMarkers(markers)
      // console.log("Call onChangeMarkers from handleDeleteMarker")
      onChangeMarkers()
    }
  }

  const handleUpMarker = (index) => {
    if (index === 0) {
      return
    }
    let goingUpMarker = markers[index]
    goingUpMarker = {
      ...goingUpMarker,
      idSequencia: goingUpMarker.idSequencia - 1,
    }
    let goingDownMarker = markers[index - 1]
    goingDownMarker = {
      ...goingDownMarker,
      idSequencia: goingUpMarker.idSequencia + 1,
    }
    const auxMarkers = markers.map((marker, i) => {
      if (i === index - 1) {
        return goingUpMarker
      } else if (i === index) {
        return goingDownMarker
      } else {
        return marker
      }
    })
    setMarkers(() => auxMarkers)
    onChangeMarkers()
  }

  const handleDownMarker = (index) => {
    if (index === markers.length - 1) {
      return
    }
    let goingUpMarker = markers[index + 1]
    goingUpMarker = {
      ...goingUpMarker,
      idSequencia: goingUpMarker.idSequencia + 1,
    }
    let goingDownMarker = markers[index]
    goingDownMarker = {
      ...goingDownMarker,
      idSequencia: goingUpMarker.idSequencia - 1,
    }
    const auxMarkers = markers.map((marker, i) => {
      if (i === index) {
        return goingUpMarker
      } else if (i === index + 1) {
        return goingDownMarker
      } else {
        return marker
      }
    })
    setMarkers(() => auxMarkers)
    onChangeMarkers()
  }

  const handleChangeName = (event, index) => {
    const newName = event.target.value
    const auxMarkers = markers.map((marker, i) => {
      if (i === index) {
        marker.nome = newName
      }
      return marker
    })
    setMarkers(() => auxMarkers)
    onChangeMarkers()
  }

  return (
    <div className="flex flex-row">
      <div className="bg-zinc-300 w-1/4">
        <h2 className="text-center text-black font-bold p-2">
          PONTOS DE ENTREGA
        </h2>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <tbody className="text-black font-semibold">
                    {isMounted &&
                      wayPoints &&
                      wayPoints.length > 0 &&
                      wayPoints.map(({ nome }, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1} - </td>
                            <td>{nome.substr(0, 18)}</td>
                            <td>
                              <div
                                key={index}
                                className="inline-block align-middle w-4 bg-white text-red-700 rounded "
                                onClick={() => handleDownMarker(index)}
                              >
                                <ArrowDown size={16} alt="Desce" />
                              </div>
                            </td>
                            <td>
                              <div
                                key={index}
                                className="inline-block align-middle w-4 bg-white text-red-700 rounded "
                                onClick={() => handleUpMarker(index)}
                              >
                                <ArrowUp size={16} alt="Sobe" />
                              </div>
                            </td>
                            <td>
                              <div
                                key={index}
                                className="inline-block align-middle w-4 bg-white text-red-700 font-extrabold rounded "
                                onClick={() => handleDeleteMarker(index)}
                              >
                                <Trash size={16} alt="Exclui" />
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={() => handleSubmit()}
            className=" bg-red-500 hover:bg-red-700 py-2 px-4 mt-3 rounded text-zinc-100 font-bold "
          >
            Enviar
          </button>
        </div>
      </div>
      <GoogleMap
        onLoad={handleOnLoad}
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
      >
        {isMounted &&
          wayPoints &&
          wayPoints.length > 0 &&
          wayPoints.map(({ nome, idSequencia, latitude, longitude }, index) => (
            <Marker
              key={index}
              position={{ lat: latitude, lng: longitude }}
              title={nome}
              addListener
              draggable
              onClick={() => {
                handleMarkerClick(index, latitude, longitude, nome)
              }}
              onDragEnd={(marker) => handleMarkerDrag(marker, index)}
              icon={
                "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" +
                idSequencia +
                "|FF0000|000000"
              }
            >
              {isOpen && infoWindowData?.id === index && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false)
                  }}
                >
                  <div>
                    {/* <h3>{infoWindowData.nome}</h3> */}
                    {/* <label className={labelClass} htmlFor="id_ajudante1">
                      Nome
                    </label> */}
                    <input
                      name="Nome"
                      type="string"
                      onChange={(e) => handleChangeName(e, infoWindowData.id)}
                      placeholder={infoWindowData.nome}
                      className={inputClass}
                    />
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
      </GoogleMap>
    </div>
  )
}

export default Map

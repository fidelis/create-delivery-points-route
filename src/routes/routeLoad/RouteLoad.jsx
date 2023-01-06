import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DataInput } from "./components/excelSheet/DataInput"
import { DragDropFile } from "./components/excelSheet/DragDropFile"
import { RouteForm } from "./components/routeForm/RouteForm"
import { ClientCombo } from "./components/clientCombo/clientCombo"

export default function RouteLoad() {
  const [idRota, setIdRota] = useState("")
  const [idVeiculo, setIdVeiculo] = useState("")
  const [idFrota, setIdFrota] = useState("")
  const [idMotorista, setIdMotorista] = useState("")
  const [idAjudante1, setIdAjudante1] = useState("")
  const [idAjudante2, setIdAjudante2] = useState("")
  const [idAjudante3, setIdAjudante3] = useState("")
  const [idCarga, setIdCarga] = useState("")
  const [dtHrInicio, setDtHrInicio] = useState("")
  const [dtHrFim, setDtHrFim] = useState("")
  const [markers, setMarkers] = useState([])
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    clearSessionStorage()
    setMarkers([])
  }, [])

  useEffect(() => {
    const errorMessage = sessionStorage.getItem("errorMessage")
    if (errorMessage) {
      sessionStorage.removeItem("errorMessage")
      window.alert(errorMessage)
    }
  }, [])

  const persistRoute = () => {
    const routeHead = {
      idRota: idRota,
      idVeiculo: idVeiculo,
      idFrota: idFrota,
      idMotorista: idMotorista,
      idAjudante1: idAjudante1,
      idAjudante2: idAjudante2,
      idAjudante3: idAjudante3,
      idCarga: idCarga,
      dtHrInicio: dtHrInicio,
      dtHrFim: dtHrFim,
    }
    const lastMarker = markers.length - 1
    const auxMarkers = markers.map((marker, i) => {
      if (i === 0 || i === lastMarker) {
        return {
          ...marker,
          idRota: idRota,
          idVeiculo: idVeiculo,
          idFrota: idFrota,
          idMotorista: idMotorista,
          idAjudante1: idAjudante1,
          idAjudante2: idAjudante2,
          idAjudante3: idAjudante3,
          idCarga: idCarga,
          dataHoraInicio: dtHrInicio,
          dataHoraFim: dtHrFim,
        }
      } else {
        return {
          ...marker,
          idRota: idRota,
          idVeiculo: idVeiculo,
          idFrota: idFrota,
          idMotorista: idMotorista,
          idAjudante1: idAjudante1,
          idAjudante2: idAjudante2,
          idAjudante3: idAjudante3,
          idCarga: idCarga,
        }
      }
    })
    sessionStorage.setItem("markers", JSON.stringify(auxMarkers))
    sessionStorage.setItem("routeHead", JSON.stringify(routeHead))
  }

  const clearSessionStorage = () => {
    if (sessionStorage.getItem("markers")) {
      sessionStorage.removeItem("markers")
    }
    if (sessionStorage.getItem("routeHead")) {
      sessionStorage.removeItem("routeHead")
    }
    if (sessionStorage.getItem("importModelId")) {
      sessionStorage.removeItem("importModelId")
    }
    if (sessionStorage.getItem("client")) {
      sessionStorage.removeItem("client")
    }
  }

  const handleClick = async () => {
    setMessage("")
    if (idRota === "") {
      setMessage("Por favor informe o id da rota.")
      return
    }
    if (idVeiculo === "") {
      setMessage("Por favor informe o id do veículo.")
      return
    }
    if (idFrota === "") {
      setMessage("Por favor informe o id da frota.")
      return
    }
    if (idCarga === "") {
      setMessage("Por favor informe o id da carga.")
      return
    }
    if (idMotorista === "") {
      setMessage("Por favor informe o motorista.")
      return
    }
    if (dtHrInicio === "") {
      setMessage("Por favor informe a data e hora de ínicio.")
      return
    }
    if (dtHrFim === "") {
      setMessage("Por favor informe a data e hora de fim.")
      return
    }
    const today = new Date()
    if (Date.parse(dtHrInicio) < Date.parse(today)) {
      setMessage("A data de início precisa ser maior que agora.")
      return
    }
    if (dtHrFim <= dtHrInicio) {
      setMessage("A data final precisa ser maior que a inicial.")
      return
    }
    const testClient = JSON.parse(sessionStorage.getItem("client"))
    if (!testClient) {
      setMessage("Selecione uma empresa.")
      return
    } else if (!testClient.clientId) {
      setMessage("Selecione uma empresa.")
      return
    }

    persistRoute()

    navigate("LoadMap", {
      replace: false,
    })
  }

  return (
    <div className="flex flex-col h-screen items-center p-3">
      <div>
        <ClientCombo />
      </div>
      <DragDropFile handleFile={DataInput.handleFile}>
        <div className="row">
          <div className="col-xs-12">
            <DataInput
              setIdRota={setIdRota}
              setIdVeiculo={setIdVeiculo}
              setIdFrota={setIdFrota}
              setIdMotorista={setIdMotorista}
              setIdAjudante1={setIdAjudante1}
              setIdAjudante2={setIdAjudante2}
              setIdAjudante3={setIdAjudante3}
              setIdCarga={setIdCarga}
              setDtHrInicio={setDtHrInicio}
              setDtHrFim={setDtHrFim}
              handleFile={DataInput.handleFile}
              setMarkers={setMarkers}
            />
          </div>
        </div>
      </DragDropFile>
      <RouteForm
        idRota={idRota}
        setIdRota={setIdRota}
        idVeiculo={idVeiculo}
        setIdVeiculo={setIdVeiculo}
        idFrota={idFrota}
        setIdFrota={setIdFrota}
        idMotorista={idMotorista}
        setIdMotorista={setIdMotorista}
        idAjudante1={idAjudante1}
        setIdAjudante1={setIdAjudante1}
        idAjudante2={idAjudante2}
        setIdAjudante2={setIdAjudante2}
        idAjudante3={idAjudante3}
        setIdAjudante3={setIdAjudante3}
        idCarga={idCarga}
        setIdCarga={setIdCarga}
        dtHrInicio={dtHrInicio}
        setDtHrInicio={setDtHrInicio}
        dtHrFim={dtHrFim}
        setDtHrFim={setDtHrFim}
      />
      <div className="flex justify-center items-center">
        {message && (
          <p className="text-red-600 font-bold bg-white max-w-fit p-1 m-2">
            {message}
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          className="bg-white hover:bg-zinc-100 rounded px-10 py-1 text-red-700 font-bold border-spacing-1 border-red-800 border-2"
          id="exportFile"
          type="file"
          onClick={handleClick}
        >
          Mapa
        </button>
      </div>
      <footer className="mt-auto">Versão 0.1.43</footer>
    </div>
  )
}

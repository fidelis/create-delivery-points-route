import React, { useState } from "react"
import * as XLSX from "xlsx"
import { Path } from "phosphor-react"

export function DataInput({
  setIdRota,
  setIdVeiculo,
  setIdFrota,
  setIdMotorista,
  setIdAjudante1,
  setIdAjudante2,
  setIdAjudante3,
  setIdCarga,
  setDtHrInicio,
  setDtHrFim,
  setMarkers,
}) {
  const [message, setMessage] = useState("")

  const handleFile = (file) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onload = (e) => {
      const bstr = e.target?.result
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
      if (data[1][0]) {
        setIdRota(data[1][0])
        setIdVeiculo(data[1][1])
        setIdFrota(data[1][2])
        setIdMotorista(data[1][3])
        setIdAjudante1(data[1][4])
        setIdAjudante2(data[1][5])
        setIdAjudante3(data[1][6])
        setIdAjudante3(data[1][7])
        setIdCarga(data[1][8])
        setDtHrInicio(data[1][16])
        setDtHrFim(data[1][17])
      }
      const latIni = parseFloat(data[1][9])
      const lngIni = parseFloat(data[1][10])
      const tempMarkers = data
        .filter((marker, index) => index > 0)
        .map((marker, i) => {
          let lat = 0.0
          let lng = 0.0
          let name = ""
          if (marker[0] === undefined) {
            setMessage("A linha " + i + " não possui o id da rota")
            return null
          }
          if (marker[1] === undefined) {
            setMessage("A linha " + i + " não possui o id do veiculo")
            return null
          }
          if (marker[2] === undefined) {
            setMessage("A linha " + i + " não possui o id da frota")
            return null
          }
          if (marker[3] === undefined) {
            setMessage("A linha " + i + " não possui o id do motorista")
            return null
          }
          if (marker[8] === undefined) {
            setMessage("A linha " + i + " não possui o id da carga")
            return null
          }
          if (marker[16] === undefined) {
            setMessage("A linha " + i + " não possui a data e hora de início")
            return null
          }
          if (marker[17] === undefined) {
            setMessage("A linha " + i + " não possui a data e hora de fim")
            return null
          }
          if ((marker[9] === undefined) | null) {
            lat = latIni
          } else {
            lat = parseFloat(marker[9])
          }
          if ((marker[10] === undefined) | null) {
            lng = lngIni
          } else {
            lng = parseFloat(marker[10])
          }
          if ((marker[12] === undefined) | null) {
            name = marker[23].slice(2)
          } else {
            name = marker[12]
          }
          setMessage(null)
          const tempMarkers = {
            idRota: marker[0],
            idVeiculo: marker[1],
            idFrota: marker[2],
            idMotorista: marker[3],
            idAjudante1: marker[4],
            idAjudante2: marker[5],
            idAjudante3: marker[6],
            idCarga: marker[7],
            idPonto: marker[8],
            latitude: lat,
            longitude: lng,
            cpfCNPJ: marker[11],
            nome: name,
            endereco: marker[13],
            distanciaMinima: marker[14],
            horarioParada: marker[15],
            dataHoraInicio: marker[16],
            dataHoraFim: marker[17],
            observacao: marker[18],
            valorAReceber: marker[19],
            custoPernoite: marker[20],
            idSequencia: marker[21],
            distanciaEmKm: marker[22],
            tipoRegistro: marker[23],
          }
          return tempMarkers
        })
      setMarkers(tempMarkers)
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }

  const handleChange = (e) => {
    const files = e.target.files
    if (files && files[0]) handleFile(files[0])
  }

  return (
    <div>
      <form className="form-inline">
        <div className="flex justify-center items-center">
          <label
            htmlFor="inputFile"
            className=" bg-white hover:bg-zinc-100 rounded text-red-700 font-bold flex m-4 p-1 border-spacing-1 border-red-800 border-2"
          >
            <Path size={24} />
            <p className="px-2">Carregar Rota</p>
          </label>
          <input
            id="inputFile"
            type="file"
            className="hidden"
            accept={
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="flex justify-center items-center">
        {message && (
          <p className="text-red-600 font-extrabold bg-white max-w-fit">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

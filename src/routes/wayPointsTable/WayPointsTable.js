import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PencilSimple, FloppyDisk, Backspace } from "phosphor-react"
import PrepareSheet from "./components/prepareSheet/PrepareSheet"
import * as FileSaver from "file-saver"
import * as XLSX from "xlsx"
import ClientImportModel from "./components/clientImportModel/clientImportModel"
import MountFileName from "./components/mountFileName/mountFileName"
import SendFileToCLSI from "./components/sendFileToCLSI/senFileToCLSI"

function WayPointsTable() {
  const fileType = process.env.REACT_APP_FILE_TYPE
  const navigate = new useNavigate()
  const file = MountFileName()
  const [data, setData] = useState([])
  const [markers, setMarkers] = useState([])
  const lastMarker = markers.length - 1

  const sortMarkers = async () => {
    const sessionStorageMarkers = JSON.parse(sessionStorage.getItem("markers"))
    const auxMarkers = await sessionStorageMarkers.sort(
      (a, b) => a.idSequencia - b.idSequencia
    )
    sessionStorage.removeItem("markers")
    sessionStorage.setItem("markers", JSON.stringify(auxMarkers))
    setMarkers(auxMarkers)
  }

  const exportToXlsx = (e) => {
    e.preventDefault()
    const toSheet = PrepareSheet(data)
    const ws = XLSX.utils.json_to_sheet(toSheet)
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const excelSheet = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(excelSheet, file)
    SendFileToCLSI(excelSheet)
    const token = sessionStorage.getItem("token")
    navigate(`/?token=${token}`, { replace: true })
  }

  useEffect(() => {
    ClientImportModel()
    sortMarkers()
    setData(markers)
  }, [])

  useEffect(() => {
    setData(markers)
  }, [markers])

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  })

  const [nome, setNome] = useState("")
  const [cpfCnpj, setCpfCnpj] = useState(0)
  const [endereco, setEndereco] = useState("")
  const [valorAReceber, setValorAReceber] = useState(0.0)
  const [dtHrInicio, setDtHrInicio] = useState("01/01/2000 08:00")
  const [dtHrFim, setDtHrFim] = useState("01/01/2000 18:00")
  const [custoPernoite, setCustoPernoite] = useState(0.0)
  const [observacao, setObservacao] = useState("")
  const [tipoRegistro, setTipoRegistro] = useState("")

  /**
   *
   * @param id - The id of the product
   * @param currentWayPoint - The current wayPoint
   */
  const onEdit = ({ id, currentWayPoint }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setNome(currentWayPoint.nome)
    setCpfCnpj(currentWayPoint.cpfCNPJ)
    setEndereco(currentWayPoint.endereco)
    setValorAReceber(currentWayPoint.valorAReceber)
    setDtHrInicio(currentWayPoint.dataHoraInicio)
    setDtHrFim(currentWayPoint.dataHoraFim)
    setCustoPernoite(currentWayPoint.custoPernoite)
    setObservacao(currentWayPoint.observacao)
    setTipoRegistro(currentWayPoint.tipoRegistro)
  }

  /**
   *
   * @param   id
   * @param   newNome
   * @param   newCpfCnpj
   * @param   newEndereco
   * @param   newValorAReceber
   * @param   newDtHrInicio
   * @param   newDtHrFim
   * @param   newCustoPernoite
   * @param   newObservacao
   * @param   newTipoRegistro
   */
  const updatePoint = ({
    id,
    newNome,
    newCpfCnpj,
    newEndereco,
    newValorAReceber,
    newDtHrInicio,
    newDtHrFim,
    newCustoPernoite,
    newObservacao,
    newTipoRegistro,
  }) => {
    const auxMarkers = markers.map((marker, i) => {
      if (i === id) {
        marker = { ...marker, nome: newNome }
        marker = { ...marker, cpfCNPJ: newCpfCnpj }
        marker = { ...marker, endereco: newEndereco }
        marker = { ...marker, valorAReceber: newValorAReceber }
        marker = { ...marker, dataHoraInicio: newDtHrInicio }
        marker = { ...marker, dataHoraFim: newDtHrFim }
        marker = { ...marker, observacao: newObservacao }
        marker = { ...marker, valorAReceber: newValorAReceber }
        marker = { ...marker, custoPernoite: newCustoPernoite }
        marker = { ...marker, tipoRegistro: newTipoRegistro }
        markers[i] = marker
      }
      return marker
    })
    onCancel()
    setData(() => auxMarkers)
    setMarkers(() => auxMarkers)
    // console.log(auxMarkers)
    sessionStorage.removeItem("markers")
    sessionStorage.setItem("markers", JSON.stringify(markers))
  }

  /**
   *
   * @param   id
   * @param   newNome
   * @param   newCpfCnpj
   * @param   newEndereco
   * @param   newValorAReceber
   * @param   newDtHrInicio
   * @param   newDtHrFim
   * @param   newCustoPernoite
   * @param   newObservacao
   * @param   newTipoRegistro
   */
  const onSave = ({
    id,
    newNome,
    newCpfCnpj,
    newEndereco,
    newValorAReceber,
    newDtHrInicio,
    newDtHrFim,
    newCustoPernoite,
    newObservacao,
    newTipoRegistro,
  }) => {
    updatePoint({
      id,
      newNome,
      newCpfCnpj,
      newEndereco,
      newValorAReceber,
      newDtHrInicio,
      newDtHrFim,
      newCustoPernoite,
      newObservacao,
      newTipoRegistro,
    })
  }

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    })
    // reset the all values
    setNome("")
    setCpfCnpj(0)
    setEndereco(0)
    setValorAReceber(0.0)
    setDtHrInicio("01/01/2000 08:00")
    setDtHrFim("01/01/2000 18:00")
    setCustoPernoite(0.0)
    setObservacao("")
    setTipoRegistro("")
  }

  if (!data) return null

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-auto">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm  text-gray-900 px-6 py-4 text-left"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="text-sm  text-gray-900 px-6 py-4 text-left"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="text-sm  text-gray-900 px-6 py-4 text-left"
                    >
                      CPF/CNPJ
                    </th>
                    <th
                      scope="col"
                      className="text-sm  text-gray-900 px-6 py-4 text-left"
                    >
                      Endereço
                    </th>
                    <th
                      scope="col"
                      className="text-sm  text-gray-900 px-6 py-4 text-left"
                    >
                      Valor a Receber
                    </th>
                    <th
                      scope="col"
                      className="text-sm  text-gray-900 px-6 py-4 text-left"
                    >
                      Data Hora Início
                    </th>
                    <th
                      scope="col"
                      className="text-sm  text-gray-900 px-6 py-4 text-left"
                    >
                      Data Hora Fim
                    </th>
                    <th
                      scope="col"
                      className="text-sm  text-gray-900 px-6 py-4 text-left"
                    >
                      Custo Pernoite
                    </th>
                    <th
                      scope="col"
                      className="text-sm  text-gray-900 px-6 py-4 text-left"
                    >
                      Observacao
                    </th>
                    <th
                      scope="col"
                      className="text-sm  text-gray-900 px-6 py-4 text-left"
                    >
                      Tipo Registro
                    </th>
                    <th
                      scope="col"
                      className="text-sm  text-gray-900 px-6 py-4 text-left"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="bg-gray-100 border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.idSequencia}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {inEditMode.status && inEditMode.rowKey === index ? (
                          <input
                            type="string"
                            defaultValue={nome}
                            onChange={(event) => setNome(event.target.value)}
                          />
                        ) : (
                          item.nome
                        )}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {inEditMode.status && inEditMode.rowKey === index ? (
                          <input
                            type="string"
                            defaultValue={cpfCnpj}
                            onChange={(event) => setCpfCnpj(event.target.value)}
                          />
                        ) : (
                          item.cpfCNPJ
                        )}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {inEditMode.status && inEditMode.rowKey === index ? (
                          <input
                            type="string"
                            defaultValue={endereco}
                            onChange={(event) =>
                              setEndereco(event.target.value)
                            }
                          />
                        ) : (
                          item.endereco
                        )}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {inEditMode.status &&
                        inEditMode.rowKey === index &&
                        index !== 0 &&
                        index !== lastMarker ? (
                          <input
                            type="number"
                            defaultValue={valorAReceber}
                            onChange={(event) =>
                              setValorAReceber(event.target.value)
                            }
                          />
                        ) : (
                          item.valorAReceber
                        )}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {inEditMode.status &&
                        inEditMode.rowKey === index &&
                        index !== 0 &&
                        index !== lastMarker ? (
                          <input
                            type="datetime-local"
                            defaultValue={dtHrInicio}
                            onChange={(event) =>
                              setDtHrInicio(event.target.value)
                            }
                          />
                        ) : (
                          item.dataHoraInicio
                        )}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {inEditMode.status &&
                        inEditMode.rowKey === index &&
                        index !== 0 &&
                        index !== lastMarker ? (
                          <input
                            type="datetime-local"
                            defaultValue={dtHrFim}
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"
                            onChange={(event) => setDtHrFim(event.target.value)}
                          />
                        ) : (
                          item.dataHoraFim
                        )}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {inEditMode.status &&
                        inEditMode.rowKey === index &&
                        index !== 0 &&
                        index !== lastMarker ? (
                          <input
                            type="number"
                            defaultValue={custoPernoite}
                            onChange={(event) =>
                              setCustoPernoite(event.target.value)
                            }
                          />
                        ) : (
                          item.custoPernoite
                        )}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {inEditMode.status && inEditMode.rowKey === index ? (
                          <input
                            type="string"
                            defaultValue={observacao}
                            onChange={(event) =>
                              setObservacao(event.target.value)
                            }
                          />
                        ) : (
                          item.observacao
                        )}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {inEditMode.status && inEditMode.rowKey === index ? (
                          <select
                            defaultValue={tipoRegistro}
                            onChange={(event) =>
                              setTipoRegistro(event.target.value)
                            }
                          >
                            <option value="1.INICIO ROTA">1.INICIO ROTA</option>
                            <option value="2.ENTREGA">2.ENTREGA</option>
                            <option value="3.INTERVALO">3.INTERVALO</option>
                            <option value="4.PERNOITE">4.PERNOITE</option>
                            <option value="5.FIM ROTA">5.FIM ROTA</option>
                          </select>
                        ) : (
                          item.tipoRegistro
                        )}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {inEditMode.status && inEditMode.rowKey === index ? (
                          <React.Fragment>
                            <button
                              className={"btn-success"}
                              onClick={() =>
                                onSave({
                                  id: index,
                                  newNome: nome,
                                  newCpfCnpj: cpfCnpj,
                                  newEndereco: endereco,
                                  newValorAReceber: valorAReceber,
                                  newDtHrInicio: dtHrInicio,
                                  newDtHrFim: dtHrFim,
                                  newCustoPernoite: custoPernoite,
                                  newObservacao: observacao,
                                  newTipoRegistro: tipoRegistro,
                                })
                              }
                            >
                              <FloppyDisk size={24} alt={"Save"} />
                            </button>

                            <button
                              className={"btn-secondary"}
                              style={{ marginLeft: 8 }}
                              onClick={() => onCancel()}
                            >
                              <Backspace size={24} alt={"Cancel"} />
                            </button>
                          </React.Fragment>
                        ) : (
                          <button
                            className={"btn-primary"}
                            onClick={() =>
                              onEdit({ id: index, currentWayPoint: item })
                            }
                          >
                            <PencilSimple size={24} alt={"Edit"} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-row justify-center">
        <form onSubmit={(e) => exportToXlsx(e)}>
          <input
            type="text"
            onChange={(e) => setFile(e.target.value)}
            value={file}
            className="text-sm text-gray-900 font-light p-2 whitespace-nowrap m-4"
            placeholder="Nome do arquivo"
            required
          />
          <button
            className="bg-red-500 hover:bg-red-700 rounded p-2 text-zinc-100 font-bold"
            type="submit"
          >
            Download
          </button>
        </form>
      </div> */}
      <div className="flex flex-row justify-center p-4">
        <button
          className="bg-white hover:bg-zinc-100 rounded px-2 py-1 text-red-700 font-bold border-spacing-1 border-red-800 border-2"
          type="submit"
          onClick={(e) => exportToXlsx(e)}
        >
          Enviar para o CLSI
        </button>
      </div>
    </div>
  )
}

export default WayPointsTable

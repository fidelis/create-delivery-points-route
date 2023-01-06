import React from "react"

var inputClass =
  "shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-4 my-2"
var labelClass = "block text-gray-700 text-sm font-bold m-2 mx-4 my-2"

export function RouteForm(props) {
  const {
    idRota,
    setIdRota,
    idVeiculo,
    setIdVeiculo,
    idFrota,
    setIdFrota,
    idMotorista,
    setIdMotorista,
    idAjudante1,
    setIdAjudante1,
    idAjudante2,
    setIdAjudante2,
    idAjudante3,
    setIdAjudante3,
    idCarga,
    setIdCarga,
    dtHrInicio,
    setDtHrInicio,
    dtHrFim,
    setDtHrFim,
  } = props

  const handleidRota = React.useCallback(
    (event) => {
      setIdRota(event.target.value)
    },
    [setIdRota]
  )

  const handleidVeiculo = React.useCallback(
    (event) => {
      setIdVeiculo(event.target.value)
    },
    [setIdVeiculo]
  )

  const handleidFrota = React.useCallback(
    (event) => {
      setIdFrota(event.target.value)
    },
    [setIdFrota]
  )

  const handleidMotorista = React.useCallback(
    (event) => {
      setIdMotorista(event.target.value)
    },
    [setIdMotorista]
  )

  const handleidAjudante1 = React.useCallback(
    (event) => {
      setIdAjudante1(event.target.value)
    },
    [setIdAjudante1]
  )

  const handleidAjudante2 = React.useCallback(
    (event) => {
      setIdAjudante2(event.target.value)
    },
    [setIdAjudante2]
  )

  const handleidAjudante3 = React.useCallback(
    (event) => {
      setIdAjudante3(event.target.value)
    },
    [setIdAjudante3]
  )

  const handleidCarga = React.useCallback(
    (event) => {
      setIdCarga(event.target.value)
    },
    [setIdCarga]
  )

  const handleDtHrInicio = React.useCallback(
    (event) => {
      setDtHrInicio(event.target.value)
    },
    [setDtHrInicio]
  )

  const handleDtHrFim = React.useCallback(
    (event) => {
      setDtHrFim(event.target.value)
    },
    [setDtHrFim]
  )

  return (
    <div className="flex justify-center">
      <form className="bg-zinc-100 shadow-md rounded px-8 pt-4 pb-6 mb-4 mt-4 grid md:grid-cols-2">
        <div>
          <label className={labelClass} name="labelClass" htmlFor="id_rota">
            Id da Rota
          </label>
          <input
            name="id_rota"
            type="string"
            value={idRota}
            onChange={handleidRota}
            placeholder="id da rota"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="id_veiculo">
            Id do Veículo
          </label>
          <input
            name="id_veiculo"
            type="string"
            value={idVeiculo}
            onChange={handleidVeiculo}
            placeholder="id do veículo"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="id_frota">
            Id da Frota
          </label>
          <input
            name="id_frota"
            type="string"
            value={idFrota}
            onChange={handleidFrota}
            placeholder="id da frota"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="id_carga">
            Id da Carga
          </label>
          <input
            name="id_carga"
            type="string"
            value={idCarga}
            onChange={handleidCarga}
            placeholder="id da carga"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="id_motorista">
            Motorista
          </label>
          <input
            name="id_motorista"
            type="string"
            value={idMotorista}
            onChange={handleidMotorista}
            placeholder="id do Motorista"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="id_ajudante1">
            Ajudante1
          </label>
          <input
            name="id_ajudante1"
            type="string"
            value={idAjudante1}
            onChange={handleidAjudante1}
            placeholder="id do Ajudante1"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="id_ajudante2">
            Ajudante2
          </label>
          <input
            name="id_ajudante2"
            type="string"
            value={idAjudante2}
            onChange={handleidAjudante2}
            placeholder="id do Ajudante2"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="id_ajudante3">
            Ajudante3
          </label>
          <input
            name="id_ajudante3"
            type="string"
            value={idAjudante3}
            onChange={handleidAjudante3}
            placeholder="id do Ajudante3"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="dthr_inicio">
            Data e Hora de Inicio
          </label>
          <input
            name="dthr_inicio"
            type="datetime-local"
            value={dtHrInicio}
            onChange={handleDtHrInicio}
            placeholder="data e hora de inicio"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="dthr_fim">
            Data e Hora de Fim
          </label>
          <input
            name="dthr_fim"
            type="datetime-local"
            value={dtHrFim}
            onChange={handleDtHrFim}
            placeholder="data e hora de fim"
            required
            className={inputClass}
          />
        </div>
      </form>
    </div>
  )
}

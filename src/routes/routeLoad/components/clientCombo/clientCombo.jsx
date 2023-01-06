import api from "../../../../services/api"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export function ClientCombo() {
  const [clients, setClients] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    sessionStorage.removeItem("token")
    for (const entry of searchParams.entries()) {
      const [param, value] = entry
      if (param === "token") {
        sessionStorage.setItem("token", value)
      }
    }
  }, [searchParams])

  useEffect(() => {
    sessionStorage.removeItem("client")
    async function getClientId() {
      let clientsMap = []
      await api
        .get("/GestaoVeiculos/Clientes/v1/clientes?limit=2000&search=True")
        .then((response) => {
          clientsMap = response.data.data.map((client, i) => {
            return { id: client.id, name: client.name }
          })
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err)
        })
      setClients(() => clientsMap)
    }
    getClientId()
  }, [])

  const handleChange = (e) => {
    const selectedName = e.target.value
    const selectedIndex = e.target.options.selectedIndex
    const selectedId = e.target.options[selectedIndex].getAttribute("data-key")
    sessionStorage.setItem(
      "client",
      JSON.stringify({ clientId: selectedId, clientName: selectedName })
    )
  }

  if (!clients) return null

  return (
    <div>
      <select
        id="template-select"
        className="p-2"
        onChange={(e) => handleChange(e)}
      >
        <option>Selecione a empresa</option>
        {clients.map((client) => (
          <option key={client.id} data-key={client.id} value={client.name}>
            {client.name}
          </option>
        ))}
      </select>
    </div>
  )
}

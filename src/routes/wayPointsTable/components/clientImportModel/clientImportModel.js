import api from "../../../../services/api"

export default async function ClientImportModel() {
  const sessionStorageClient = JSON.parse(sessionStorage.getItem("client"))
  api.interceptors.request.use(async (config) => {
    const token = sessionStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers.customerId = sessionStorageClient.clientId
    return config
  })
  const importModelId = () => {
    api
      .get(
        "/GestaoVeiculos/Rotas/v2/ModelosImportacaoRotas?page=1&limit=10&type=routes"
      )
      .then((r) => {
        if (r.data.length > 0) {
          r.data
            .filter(
              (r) => r.name === "Layout de importação  - Padrão do Sistema"
            )
            .map((r) => sessionStorage.setItem("importModelId", r.id))
        }
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err)
      })
  }
  await importModelId()
}

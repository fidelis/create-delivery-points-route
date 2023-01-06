import api from "../../../../services/api"
import FormData from "form-data"

export default function SendFileToCLSI(data) {
  const sessionStorageclient = JSON.parse(sessionStorage.getItem("client"))
  const sessionStorageimportModelId = sessionStorage.getItem("importModelId")
  const formData = new FormData()
  formData.append("file", data)
  formData.append("idModel", sessionStorageimportModelId)

  api.interceptors.request.use(async (config) => {
    const token = sessionStorage.getItem("token")

    config.headers.Authorization = `Bearer ${token}`
    config.headers.customerId = sessionStorageclient.clientId
    config.data = formData

    return config
  })

  api
    .post(`/GestaoVeiculos/Modelo-Importacao/v2/import-files`)
    .then((response) => {
      // console.log("Response:", JSON.stringfy(response, null, 2))
      console.log(response.data)

      if (response.data.result.status) {
        if (response.data.result.status === "error") {
          sessionStorage.setItem("errorMessage", response.data.result.message)
        }
      }
    })
    .catch((e) => console.error(e))
}

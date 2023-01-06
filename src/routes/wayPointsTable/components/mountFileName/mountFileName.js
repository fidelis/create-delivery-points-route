export default function MountFileName() {
  const routeHead = JSON.parse(sessionStorage.getItem("routeHead"))
  const today = new Date()
  const auxDate =
    today.getFullYear() +
    "-" +
    today.getMonth() +
    "-" +
    today.getDay() +
    "_" +
    today.getHours() +
    "_" +
    today.getMinutes()
  const client = JSON.parse(sessionStorage.getItem("client"))
  const fileName = `Empresa_${client.clientId}-Rota_${routeHead.idRota}-at-${auxDate}.xlsx`
  return fileName
}

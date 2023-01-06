import InicioRota from "./InicioRota"
import Entrega from "./Entrega"
import FimRota from "./FimRota"
import Intervalo from "./Intervalo"
import Pernoite from "./Pernoite"

export default function PrepareSheet(markers) {
  const routeHead = JSON.parse(sessionStorage.getItem("routeHead"))
  const routeDtHrInicio = new Date(routeHead.dtHrInicio)
  const routeDtHrFim = new Date(routeHead.dtHrFim)
  const toSheet = markers.map((m) => {
    if (m.tipoRegistro === "1.INICIO ROTA") {
      return InicioRota(m, routeDtHrInicio, routeDtHrFim)
    } else if (m.tipoRegistro === "2.ENTREGA") {
      return Entrega(m)
    } else if (m.tipoRegistro === "5.FIM ROTA") {
      return FimRota(m, routeDtHrInicio, routeDtHrFim)
    } else if (m.tipoRegistro === "3.INTERVALO") {
      return Intervalo(m)
    } else if (m.tipoRegistro === "4.PERNOITE") {
      return Pernoite(m)
    }
    return m
  })
  return toSheet
}

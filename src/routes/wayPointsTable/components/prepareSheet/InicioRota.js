import DateToString from "../../../../utils/DateToString"
import HorarioParada from "./HorarioParada"

export default function InicioRota(marker, dtHrInicio, dtHrFim) {
  marker = {
    ...marker,
    latitude: marker.latitude.toString(),
    longitude: marker.longitude.toString(),
    horarioParada: HorarioParada(dtHrInicio),
    dataHoraInicio: DateToString(dtHrInicio),
    dataHoraFim: DateToString(dtHrFim),
  }
  return marker
}

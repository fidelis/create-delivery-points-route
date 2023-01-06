import DateToString from "../../../../utils/DateToString"
import HorarioParada from "./HorarioParada"

export default function Pernoite(marker) {
  marker = {
    ...marker,
    latitude: marker.latitude.toString(),
    longitude: marker.longitude.toString(),
    horarioParada: HorarioParada(marker.dataHoraInicio),
    dataHoraInicio: DateToString(marker.dataHoraInicio),
    dataHoraFim: DateToString(marker.dataHoraFim),
  }
  return marker
}

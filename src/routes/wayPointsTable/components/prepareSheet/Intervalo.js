import DateToString from "../../../../utils/DateToString"
import HorarioParada from "./HorarioParada"

export default function Intervalo(marker) {
  marker = {
    ...marker,
    idPonto: null,
    latitude: null,
    longitude: null,
    cpfCNPJ: null,
    nome: null,
    endereco: null,
    valorAReceber: 0,
    horarioParada: HorarioParada(marker.dataHoraInicio),
    dataHoraInicio: DateToString(marker.dataHoraInicio),
    dataHoraFim: DateToString(marker.dataHoraFim),
  }
  return marker
}

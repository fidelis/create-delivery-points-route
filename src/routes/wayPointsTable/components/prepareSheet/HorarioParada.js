export default function HorarioParada(dh) {
  const auxDH = new Date(dh)
  return (
    auxDH.getHours().toString().padStart(2, "0") +
    ":" +
    auxDH.getMinutes().toString().padStart(2, "0")
  )
}

export default function DateToString(auxDate) {
  const auxDate2 = new Date(auxDate)
  const dhYear = auxDate2.getFullYear().toString().padStart(2, 0)
  const dhMonth = auxDate2.getMonth() + 1
  const dheDay = auxDate2.getDate().toString().padStart(2, 0)
  const dhHour = auxDate2.getHours().toString().padStart(2, 0)
  const dhMinutes = auxDate2.getMinutes().toString().padStart(2, 0)
  return (
    dhYear +
    "-" +
    dhMonth.toString().padStart(2, 0) +
    "-" +
    dheDay +
    " " +
    dhHour +
    ":" +
    dhMinutes
  )
}

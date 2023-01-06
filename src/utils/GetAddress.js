import Geocode from "react-geocode"

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
Geocode.setLanguage("pt-br")
Geocode.setRegion("br")
Geocode.setLocationType("ROOFTOP")
// Geocode.enableDebug()

export default async function GetAddress(latitude, longitude) {
  return await Geocode.fromLatLng(latitude, longitude).then(
    (response) => {
      const address = response.results[0].formatted_address
      return address
    },
    (error) => {
      return error
    }
  )
}

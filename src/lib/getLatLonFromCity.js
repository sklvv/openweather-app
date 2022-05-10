import axios from "axios";

const getLatLon = async (city) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
  );
  const coord = {
    lat: response.data[0].lat,
    lon: response.data[0].lon,
  };

  return coord;
};
export default getLatLon;

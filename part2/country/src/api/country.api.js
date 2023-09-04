import axios from "axios";
const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
// "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getAll = async () => {
  const request = await axios.get(`${BASE_URL}/all`);
  return request.data;
};

const show = async (countryName) => {
  const request = await axios.get(`${BASE_URL}/name/${countryName}`);
  return request.data;
};

const getWeather = async (lat, lang) => {
  const request = await axios.get(
    `${WEATHER_URL}?lat=${lat}&lon=${lang}&appid=${WEATHER_API_KEY}`
  );
  return request.data;
};

const getWeatherIconSrc = (iconId, scale) => {
  return scale
    ? `https://openweathermap.org/img/wn/${iconId}@${scale}x.png`
    : `https://openweathermap.org/img/wn/${iconId}.png`;
};

export default { getAll, show, getWeather, getWeatherIconSrc };

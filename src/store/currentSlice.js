import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import timeConverter from "../lib/timeConverter";
export const getWeather = createAsyncThunk(
  "current/getWeather",
  async (value) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${
        import.meta.env.VITE_OW_API_KEY
      }&lang=ru&units=metric`
    );

    const answer = await response.data;
    return answer;
  }
);
export const getWeatherByLocation = createAsyncThunk(
  "current/getWeatherByLocation",
  async ({ lat, lon }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_OW_API_KEY
        }&lang=ru&units=metric`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const currentSlice = createSlice({
  name: "current",
  initialState: {
    city: "",
    timezone: "",
    about: "",
    temp: "",
    feelsLike: "",
    wind: "",
    pressure: "",
    humidity: "",
    sunrise: "",
    sunset: "",
    iconSrc: "",
  },
  reducers: {},
  extraReducers: {
    [getWeather.fulfilled]: (state, action) => {
      state.city = action.payload.name;
      state.temp = Math.round(action.payload.main.temp);
      state.about = action.payload.weather[0].description;
      state.feelsLike = Math.round(action.payload.main.feels_like);
      state.wind = Math.round(action.payload.wind.speed);
      state.pressure = Math.round(action.payload.main.pressure * 0.75);
      state.humidity = action.payload.main.humidity;
      state.sunrise = timeConverter(
        action.payload.sys.sunrise,
        action.payload.timezone
      );
      state.sunset = timeConverter(
        action.payload.sys.sunset,
        action.payload.timezone
      );
      state.iconSrc =
        "https://openweathermap.org/img/wn/" +
        action.payload.weather[0].icon +
        ".png";
    },

    [getWeatherByLocation.fulfilled]: (state, action) => {
      state.city = action.payload.name;
      state.temp = Math.round(action.payload.main.temp);
      state.about = action.payload.weather[0].description;
      state.feelsLike = Math.round(action.payload.main.feels_like);
      state.wind = Math.round(action.payload.wind.speed);
      state.pressure = Math.round(action.payload.main.pressure * 0.75);
      state.humidity = action.payload.main.humidity;
      state.sunrise = timeConverter(
        action.payload.sys.sunrise,
        action.payload.timezone
      );
      state.sunset = timeConverter(
        action.payload.sys.sunset,
        action.payload.timezone
      );
      state.iconSrc =
        "https://openweathermap.org/img/wn/" +
        action.payload.weather[0].icon +
        ".png";
    },
  },
});
export default currentSlice.reducer;

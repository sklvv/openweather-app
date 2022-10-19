import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import timeConverter from "../lib/timeConverter";
export const getHourlyForecast = createAsyncThunk(
  "hourly/getHourlyForecast",
  async ({ lat, lon }) => {
    const answer = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${
        import.meta.env.VITE_OW_API_KEY
      }&units=metric`
    );

    return {
      weather: answer.data.hourly,
      timezone: answer.data.timezone_offset,
    };
  }
);
export const refreshHourlyForecast = createAsyncThunk(
  "hourly/refreshHourlyForecast",
  async (value) => {
    const getLatlon = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${
        import.meta.env.VITE_OW_API_KEY
      }`
    );
    const coord = {
      lat: getLatlon.data[0].lat,
      lon: getLatlon.data[0].lon,
    };
    const answer = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${
        coord.lon
      }&exclude=daily&appid=${import.meta.env.VITE_OW_API_KEY}&units=metric`
    );

    return {
      weather: answer.data.hourly,
      timezone: answer.data.timezone_offset,
    };
  }
);
export const hourlySlice = createSlice({
  name: "hourly",
  initialState: {
    forecast: [],
    offset: 0,
  },
  reducers: {
    handleClick: (state, action) => {
      (action.payload === "left") & (state.offset !== 0)
        ? (state.offset = state.offset + 100)
        : (action.payload === "right") & (state.offset !== -1400)
        ? (state.offset = state.offset - 100)
        : (state.offset = state.offset);
    },
  },
  extraReducers: {
    [getHourlyForecast.fulfilled]: (state, action) => {
      for (let i = 0; i < 24; i++) {
        let item = action.payload.weather[i];
        state.forecast.push({
          dt: timeConverter(item.dt, action.payload.timezone),
          temp: Math.round(item.temp),
          icon:
            "https://openweathermap.org/img/wn/" +
            item.weather[0].icon +
            ".png",
        });
      }
    },
    [refreshHourlyForecast.fulfilled]: (state, action) => {
      state.forecast = [];
      state.offset = 0;
      for (let i = 0; i < 24; i++) {
        let item = action.payload.weather[i];

        state.forecast.push({
          dt: timeConverter(item.dt, action.payload.timezone),
          temp: Math.round(item.temp),
          icon:
            "https://openweathermap.org/img/wn/" +
            item.weather[0].icon +
            ".png",
        });
      }
    },
  },
});
export default hourlySlice.reducer;
export const { handleClick } = hourlySlice.actions;

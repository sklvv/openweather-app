import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import timeConverter from "../lib/timeConverter";
import unixToDay from "../lib/unixToWeekDay";

export const getDailyForecast = createAsyncThunk(
  "daily/getDailyForecast",
  async ({ lat, lon }) => {
    const answer = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=weekly&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=ru`
    );
    return answer.data.daily;
  }
);

export const refreshDailyForecast = createAsyncThunk(
  "daily/refreshDailyForecast",
  async (value) => {
    const getLatlon = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
    );
    const coord = {
      lat: getLatlon.data[0].lat,
      lon: getLatlon.data[0].lon,
    };
    const answer = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=weekly&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=ru`
    );

    return answer.data.daily;
  }
);

export const dailySlice = createSlice({
  name: "daily",
  initialState: {
    forecast: [],
    offset: 0,
  },
  reducers: {
    handleClick: (state, action) => {
      (action.payload === "left") & (state.offset !== 0)
        ? (state.offset = state.offset + 50)
        : (action.payload === "right") & (state.offset !== -300)
        ? (state.offset = state.offset - 50)
        : (state.offset = state.offset);
    },
  },
  extraReducers: {
    [getDailyForecast.fulfilled]: (state, action) => {
      for (let i = 0; i <= 7; i++) {
        let item = action.payload[i];
        state.forecast.push({
          dt: unixToDay(item.dt),
          tempMax: Math.round(item.temp.max),
          tempMin: Math.round(item.temp.min),

          iconSrc:
            "https://openweathermap.org/img/wn/" +
            item.weather[0].icon +
            ".png",
        });
      }
    },
    [refreshDailyForecast.fulfilled]: (state, action) => {
      state.forecast = [];
      for (let i = 0; i <= 7; i++) {
        let item = action.payload[i];
        state.forecast.push({
          dt: unixToDay(item.dt),
          tempMax: Math.round(item.temp.max),
          tempMin: Math.round(item.temp.min),

          iconSrc:
            "https://openweathermap.org/img/wn/" +
            item.weather[0].icon +
            ".png",
        });
      }
    },
  },
});

export default dailySlice.reducer;

export const { handleClick } = dailySlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const checkWeather = createAsyncThunk(
  "search/checkWeather",
  async (value) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${process.env.REACT_APP_API_KEY}&lang=ru&units=metric`
    );
    console.log(response);
  }
);
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: {},
});
export const { setValue } = searchSlice.actions;
export default searchSlice.reducer;

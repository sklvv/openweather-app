import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import currentSlice from "./currentSlice";
import hourlySlice from "./hourlySlice";
import dailySlice from "./dailySlice";
const store = configureStore({
  reducer: {
    search: searchSlice,
    current: currentSlice,
    hourly: hourlySlice,
    daily: dailySlice,
  },
});
export default store;

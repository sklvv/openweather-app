import React, { useEffect } from "react";
import { usePosition } from "./hooks/usePosition";
import { useDispatch } from "react-redux";
import { getWeatherByLocation } from "./store/currentSlice";
import MainContainer from "./components/MainContainer/MainContainer";
import SearchQuery from "./components/SearchQuery/SearchQuery";
import { getHourlyForecast } from "./store/hourlySlice";
import DailyForecast from "./DailyForecast/DailyForecast";
import { getDailyForecast } from "./store/dailySlice";

const App = () => {
  const dispatch = useDispatch();
  const position = usePosition();
  const coord = {
    lat: position.latitude,
    lon: position.longitude,
  };

  useEffect(() => {
    dispatch(getWeatherByLocation(coord));
    dispatch(getHourlyForecast(coord));
    dispatch(getDailyForecast(coord));
  }, [position]);
  return (
    <div className="wrapper">
      <SearchQuery />
      <MainContainer />
      <DailyForecast />
    </div>
  );
};

export default App;

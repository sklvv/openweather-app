import React from "react";
import styles from "./SearchQuery.module.css";
import icon from "../../assets/search.svg";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../../store/searchSlice";
import { getWeather } from "../../store/currentSlice";
import { refreshHourlyForecast } from "../../store/hourlySlice";
import { refreshDailyForecast } from "../../store/dailySlice";
const SearchQuery = () => {
  const store = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setValue(e.target.value));
  };
  const handleGo = (e, value) => {
    e.preventDefault();
    dispatch(getWeather(value));
    dispatch(setValue(""));
    dispatch(refreshHourlyForecast(value));
    dispatch(refreshDailyForecast(value));
  };
  return (
    <form
      className={styles.search_container}
      onSubmit={(e) => handleGo(e, store.value)}
    >
      <div className={styles.input_container}>
        <input
          placeholder="Введите название города"
          type="text"
          value={store.value}
          onChange={handleChange}
        />
      </div>
      <div>
        <button className={styles.search_btn}>
          <img alt="искать" src={icon} />
        </button>
      </div>
    </form>
  );
};

export default SearchQuery;

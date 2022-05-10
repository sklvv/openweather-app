import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleClick } from "../../store/hourlySlice";
import HourlyItem from "./HourlyItem/HourlyItem";
import styles from "./HourlyForecast.module.css";
import Button from "../generics/Button/Button";
import { getHourlyForecast } from "../../store/hourlySlice";
const HourlyForecast = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.hourly);
  const forecast = store.forecast;
  const offset = store.offset;
  useEffect(() => dispatch(getHourlyForecast()), []);
  return (
    <div className={styles.container}>
      <Button dir={"left"} onClick={() => dispatch(handleClick("left"))} />
      <div className={styles.slider}>
        <div
          className={styles.inside}
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {forecast.map((f) => (
            <HourlyItem time={f.dt} temp={f.temp} icon={f.icon} key={f.dt} />
          ))}
        </div>
      </div>
      <Button dir={"right"} onClick={() => dispatch(handleClick("right"))} />
    </div>
  );
};

export default HourlyForecast;

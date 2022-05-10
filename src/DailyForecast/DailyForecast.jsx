import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleClick } from "../store/dailySlice";
import Button from "../components/generics/Button/Button";
import styles from "./DailyForecast.module.css";
import DailyItem from "./DailyItem/DailyItem";
const DailyForecast = () => {
  const store = useSelector((state) => state.daily);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Button dir={"left"} onClick={() => dispatch(handleClick("left"))} />
      <div className={styles.slider}>
        <div
          className={styles.inside}
          style={{
            transform: `translateX(${store.offset}px)`,
          }}
        >
          {store.forecast.map((d) => (
            <DailyItem
              dt={d.dt}
              iconSrc={d.iconSrc}
              tempMax={d.tempMax}
              tempMin={d.tempMin}
              key={d.dt}
            />
          ))}
        </div>
      </div>
      <Button dir={"right"} onClick={() => dispatch(handleClick("right"))} />
    </div>
  );
};

export default DailyForecast;

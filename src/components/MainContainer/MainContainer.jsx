import React from "react";
import styles from "./MainContainer.module.css";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import CurrentForecast from "../CurrentForecast/CurrentForecast";
const MainContainer = () => {
  return (
    <div className={styles.container}>
      <CurrentForecast />
      <HourlyForecast />
    </div>
  );
};

export default MainContainer;

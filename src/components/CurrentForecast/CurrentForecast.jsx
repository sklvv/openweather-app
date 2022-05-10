import React from "react";
import sunrise_icon from "../../assets/wi-sunrise.svg";
import sunset_icon from "../../assets/wi-sunset.svg";
import humidity_icon from "../../assets/wi-humidity.svg";
import wind_icon from "../../assets/wi-windy.svg";
import bar_icon from "../../assets/wi-barometer.svg";
import styles from "./CurrentForecast.module.css";
import { useSelector } from "react-redux";
const CurrentForecast = () => {
  const store = useSelector((state) => state.current);

  return (
    <div className={styles.main_container}>
      <div className={styles.header}>{store.city}</div>
      <div className={styles.weather_icon}>
        <img alt="icon" src={store.iconSrc} />
      </div>
      <div className={styles.temp_container}>
        <div className={styles.temp_header}>{store.temp}°C</div>
        <div className={styles.about_container}>
          <div>{store.about}</div>
          <div>Ощущается как {store.feelsLike}°C</div>
        </div>
      </div>
      <div className={styles.sys_container}>
        <div className={styles.sys_item}>
          <div>
            <img alt="ветер" src={wind_icon} />
          </div>
          {store.wind} м/с
        </div>
        <div className={styles.sys_item}>
          <div>
            <img alt="давление" src={bar_icon} />
          </div>
          {store.pressure} мм
        </div>
        <div className={styles.sys_item}>
          <div>
            <img alt="влажность" src={humidity_icon} />
          </div>
          {store.humidity}
        </div>
        <div className={styles.sys_item}>
          <div>
            <img alt="восход" src={sunrise_icon} />
          </div>
          {store.sunrise}
        </div>
        <div className={styles.sys_item}>
          <div>
            <img alt="закат" src={sunset_icon} />
          </div>
          {store.sunset}
        </div>
      </div>
    </div>
  );
};

export default CurrentForecast;

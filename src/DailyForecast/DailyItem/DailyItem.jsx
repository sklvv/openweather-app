import React from "react";
import styles from "./DailyItem.module.css";
const DailyItem = ({ dt, iconSrc, tempMax, tempMin }) => {
  return (
    <div className={styles.item_container}>
      <div className={styles.item_day}>{dt}</div>
      <div className={styles.item_desc}>
        <div className={styles.item_icon}>
          <img alt="" src={iconSrc} />
        </div>
        <div className={styles.desc_temp}>
          <div className={styles.temp_max}>{tempMax}°C</div>
          <div className={styles.temp_min}>{tempMin}°C</div>
        </div>
      </div>
    </div>
  );
};

export default DailyItem;

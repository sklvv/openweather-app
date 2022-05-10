import React from "react";
import styles from "./HourlyItem.module.css";
const HourlyItem = ({ time, temp, icon }) => {
  return (
    <div className={styles.hourly_item}>
      <div className={styles.item_time}>{time}</div>
      <div>
        <img alt="" src={icon} className={styles.item_icon} />
      </div>
      <div className={styles.item_temp}>{temp}°C</div>
    </div>
  );
};

export default HourlyItem;

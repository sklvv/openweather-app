import React from "react";
import styles from "./Button.module.css";
import left from "../../../assets/ui/arrow-back.svg";
import right from "../../../assets/ui/arrow-forward.svg";
const Button = ({ dir, onClick }) => {
  return (
    <button onClick={onClick} className={styles.btn}>
      <img alt="" src={dir === "left" ? left : right} className={styles.icon} />
    </button>
  );
};

export default Button;

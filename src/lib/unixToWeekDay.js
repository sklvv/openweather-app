const unixToDay = (unix) => {
  const days = ["Пон", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  let a = new Date(unix * 1000);
  let key = a.getDay();

  return days[key];
};
export default unixToDay;

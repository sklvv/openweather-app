const timeConverter = (unix, timezone) => {
  let a = new Date(unix * 1000);
  let utcHour = a.getUTCHours();
  // console.log(unix, utcHour, timezone / 3600);

  let offset = timezone / 3600;
  const getHour = (utcHour, offset) => {
    let hourForCheck = utcHour + offset;
    if (hourForCheck > 24) {
      return hourForCheck - 24;
    } else if (hourForCheck < 0) {
      return 24 + hourForCheck;
    } else if (hourForCheck === 24) {
      return 0;
    }
    return hourForCheck;
  };
  let wipHour = getHour(utcHour, offset);

  let hour = wipHour > 9 ? wipHour : "0" + wipHour;
  let min = a.getMinutes() > 9 ? a.getMinutes() : "0" + a.getMinutes();
  return hour + ":" + min;
};
export default timeConverter;

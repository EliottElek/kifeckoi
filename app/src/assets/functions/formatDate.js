const formatDate = (date, hoursBool) => {
  var day = parseInt(new Date(date).getDate());
  var month = parseInt(new Date(date).getMonth()) + 1;
  const year = parseInt(new Date(date).getFullYear());
  if (day <= 9) day = "0" + day;
  if (month <= 9) month = "0" + month;
  let formated = day + "/" + month + "/" + year;
  if (hoursBool) {
    const d = new Date(date);
    var minutes = d.getMinutes();
    var hours = d.getHours();
    if (minutes <= 9) minutes = "0" + minutes;
    if (hours <= 9) hours = "0" + hours;
    const time = hours + ":" + minutes;
    formated += " à " + time;
  }
  return formated;
};
export default formatDate;

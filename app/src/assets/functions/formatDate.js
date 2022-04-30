const formatDate = (date) => {
  var day = parseInt(new Date(date).getDate());
  var month = parseInt(new Date(date).getMonth()) + 1;
  const year = parseInt(new Date(date).getFullYear());
  if (day <= 9) day = "0" + day;
  if (month <= 9) month = "0" + month;

  return day + "/" + month + "/" + year;
};
export default formatDate;

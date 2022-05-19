const getPeriod = () => {
  //we get today's date
  const today = new Date();
  const yearNumber = JSON.stringify(today.getFullYear()).slice(-2);
  var startDate = new Date(today.getFullYear(), 0, 1);
  var days = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
  var weekNumber = Math.ceil((today.getDay() + 1 + days) / 7);
  return "Y" + yearNumber + "W" + weekNumber;

};
export default getPeriod;

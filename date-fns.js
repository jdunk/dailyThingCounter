const getStartOfToday = (offsetInMinutes, now = new Date()) => {
  const adjNow = new Date(now.getTime() + Number(offsetInMinutes) * 60000);

  return new Date(Date.UTC(1900 + adjNow.getYear(), adjNow.getMonth(), adjNow.getDate(), -offsetInMinutes/60));
};

const getStartOfTomorrow = (offsetInMinutes, now = new Date()) => {
  const adjNow = new Date(now.getTime() + Number(offsetInMinutes) * 60000);

  return new Date(Date.UTC(1900 + adjNow.getYear(), adjNow.getMonth(), adjNow.getDate(), -Number(offsetInMinutes)/60, 1));
};

const toTwoDigits = num => String(num).padStart(2, '0');

const getTodaysDate = (offsetInMinutes, now = new Date()) => {
  const adjNow = new Date(now.getTime() + Number(offsetInMinutes) * 60000);

  return `${1900 + adjNow.getYear()}-${toTwoDigits(1 + adjNow.getMonth())}-${toTwoDigits(adjNow.getDate())}`;
};

const getTomorrowsDate = (offsetInMinutes, now = new Date()) => {
  const adjNow = new Date(now.getTime() + Number(offsetInMinutes) * 60000);

  const nextDay = new Date(Date.UTC(1900 + adjNow.getYear(), adjNow.getMonth(), adjNow.getDate()+1));
  return `${1900 + nextDay.getYear()}-${toTwoDigits(1 + nextDay.getMonth())}-${toTwoDigits(nextDay.getDate())}`;
};

module.exports = {
  getStartOfToday,
  getStartOfTomorrow,
  getTodaysDate,
  getTomorrowsDate,
};
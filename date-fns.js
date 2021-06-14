const getStartOfToday = (offsetInMinutes, now = new Date()) => {
  const adjNow = new Date(now.getTime() + offsetInMinutes * 60000);

  return new Date(Date.UTC(1900 + adjNow.getYear(), adjNow.getMonth(), adjNow.getDate(), -offsetInMinutes/60));
};

const getStartOfTomorrow = (offsetInMinutes, now = new Date()) => {
  const adjNow = new Date(now.getTime() + offsetInMinutes * 60000);

  return new Date(Date.UTC(1900 + adjNow.getYear(), adjNow.getMonth(), adjNow.getDate(), -offsetInMinutes/60, 1));
};

module.exports = {
  getStartOfToday,
  getStartOfTomorrow
};
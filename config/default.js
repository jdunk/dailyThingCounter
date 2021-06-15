require('dotenv').config();

module.exports = {
  timezoneOffsetInMinutes: process.env.TZ_OFFSET_IN_MINUTES,
  calendarId: process.env.GCAL_CALENDAR_ID,
  defaultEventColorId: '11',
};
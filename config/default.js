require('dotenv').config();

module.exports = {
  timezoneOffsetInMinutes: 8 * 60,
  calendarId: process.env.GCAL_CALENDAR_ID,
  defaultCountedThingType: 'push ups',
};
const config = require('./config/default.js')
const { google } = require('googleapis');
const { getStartOfToday, getStartOfTomorrow } = require('./date-fns.js');

const scopes = ['https://www.googleapis.com/auth/calendar']

const auth = new google.auth.GoogleAuth({
  keyFile: './gauth.json',
  scopes,
})

const gcal = google.calendar({ version: 'v3', auth })

let currEvent;

const gcalEventsListProcess = (resp) => {
  console.log(resp.data.items) // All data
  /*
  const events = resp.data.items.map((ev) => ({
    id: ev.id,
    summary: ev.summary,
    start: ev.start.dateTime || ev.start.date,
    description: ev.description,
  }));

  console.log(events)
  */

  resp.data.items.forEach((ev) => {
    const evNamePieces = ev.summary.split(' ');

    if (evNamePieces.length >= 2 && evNamePieces[1] === config.defaultCountedThingType) {
      currEvent = {
        ...ev,
        count: parseInt(evNamePieces[0], 10),
      };
    }
  });
};

const getTodaysEvents = async () => {
  const res = await gcal.events.list(
    {
      calendarId: config.calendarId,
      timeMin: getStartOfToday(config.timezoneOffsetInMinutes).toISOString(),
      timeMax: getStartOfTomorrow(config.timezoneOffsetInMinutes).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    }
  );

  return res?.data?.items;
};

const getCurrEvent = async (thingType = config.defaultCountedThingType) => {
  const todaysEvents = await getTodaysEvents();

  console.log({ todaysEvents })

  return todaysEvents;
};

module.exports = {
  getCurrEvent
};
const gcalendar = require('@googleapis/calendar')
const config = require('./config/default.js')

const {
  getStartOfToday,
  getStartOfTomorrow,
  getTodaysDate,
  getTomorrowsDate,
} = require('./date-fns.js');

const auth = new gcalendar.auth.GoogleAuth({
  keyFile: './gauth.json',
  scopes: ['https://www.googleapis.com/auth/calendar'],
})

const gcal = gcalendar.calendar({ version: 'v3', auth })

const getCurrentEventFromGCalEventsList = (eventsList, thingName) => {
  if (!eventsList || !eventsList?.length) return

  /*
  const events = eventsList.map((ev) => ({
    id: ev.id,
    summary: ev.summary,
    start: ev.start.dateTime || ev.start.date,
    description: ev.description,
  }));

  console.log(events)
  */

  let currEv = null;

  eventsList.forEach((ev) => {
    const indexOfFirstSpace = ev.summary.indexOf(' ');

    if (indexOfFirstSpace === -1) return;

    if (ev.summary.substr(1 + indexOfFirstSpace) === thingName) {
      currEv = {
        ...ev,
        count: Number(ev.summary.substr(0, indexOfFirstSpace)) || 0,
      };
    }
  });

  return currEv;
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

const getCurrEvent = async (thingName) => {
  const todaysEvents = await getTodaysEvents();

  return getCurrentEventFromGCalEventsList(todaysEvents, thingName)
};

const createGCalEvent = async (num, thingName) => {
  return await gcal.events.insert(
    {
      calendarId: config.calendarId,
      resource: {
        start: {
          date: getTodaysDate(config.timezoneOffsetInMinutes),
        },
        end: {
          date: getTomorrowsDate(config.timezoneOffsetInMinutes),
        },
        colorId: config.defaultEventColorId,
        summary: `${num} ${thingName}`,
        description: num
      }
    }
  );
};

const updateGCalEvent = async (eventToUpdate, num, thingName) => {
  return gcal.events.update(
    {
      calendarId: config.calendarId,
      eventId: eventToUpdate.id,
      resource: {
        ...eventToUpdate,
        summary: `${num + eventToUpdate.count} ${thingName}`,
        description: !eventToUpdate.description ? num : `${eventToUpdate.description}+${num}`,
      },
    }
  );
};

const addToCurrTotal = async (currEvent, num, thingName) => {
  let resp;

  if (!currEvent) {
    resp = await createGCalEvent(num, thingName);
  }
  else {
    resp = await updateGCalEvent(currEvent, num, thingName);
  }

  return {
    ...resp.data,
    count: Number(resp.data.summary.substr(0, resp.data.summary.indexOf(' '))),
  }
};

module.exports = {
  getCurrEvent,
  addToCurrTotal,
};
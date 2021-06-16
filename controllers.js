const { getCurrEvent, addToCurrTotal } = require('./gcal.js');

function errorResponse(errorMessage, statusCode = 400) {
  return {
    statusCode,
    body: {
      error: {
        message: errorMessage
      }
    },
  };
}

function successResponse(data, statusCode = 200) {
  return {
    statusCode,
    body: {
      data,
    }
  };
}

async function handleGetRequest(thingName) {
  const currEvent = await getCurrEvent(thingName);

  return successResponse({
    count: currEvent?.count || 0
  });
}

async function handleAddRequest(num, thingName) {
  // "num" param is required
  const _num = Number(num);

  if (!Number.isInteger(_num) || _num < 1)
    return errorResponse('Invalid request: "num" must be an integer >= 1');

  const currEvent = await getCurrEvent(thingName);

  const eventAfterSave = await addToCurrTotal(
    currEvent,
    _num,
    thingName
  );

  return successResponse({
    count: eventAfterSave.count,
    summary: eventAfterSave.summary,
    description: eventAfterSave.description,
  });
}

module.exports = {
  handleGetRequest,
  handleAddRequest,
  errorResponse,
};
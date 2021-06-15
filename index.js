const { handleGetRequest, handleAddRequest, errorResponse } = require('./controllers.js');

exports.handler = async (eventInput, context) => {
  const { action, thing, num } = eventInput;

  // Global input validation -->

  if (!['get','add'].includes(action)) {
    return errorResponse('Invalid request: value of "action" must be: "add" or "get"');
  }
  if (!thing?.match(/^[a-zA-Z]/)) {
    return errorResponse('Invalid request: "thing" param should be one or more words');
  }

  try {
    // Dispatcher -->

    if (action === 'get') {
      return await handleGetRequest(thing);
    }

    if (action === 'add') {
      return await handleAddRequest(num, thing);
    }
  }
  catch(e) {
    // Error handling -->
    const errorMsg = `There was an error: ${e?.message}`;
    console.error(errorMsg);
    return errorResponse(errorMsg, 500);
  }
};

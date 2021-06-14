const { getCurrEvent } = require('./gcal.js');

exports.handler = async (event, context) => {
  console.log({ event, context });

  let res;

  try {
    res = await getCurrEvent();
    console.log({
      getCurrentEvent: res,
    })
  }
  catch(e) {
    console.error(`There was an error: ${e.message}`)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: res?.data?.items
    }, null, 2),
  };
};

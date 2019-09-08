
const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_APP, process.env.ALGOLIA_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX);

exports.handler = async (event, context) => {
  let request;
  try {
    request = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: "cannot parse hasura event" };
  }

  try {
    const record = await index.addObject(request.event.data.new);
    return { statusCode: 200, body: JSON.stringify(record) };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};

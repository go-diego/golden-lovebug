const metascraper = require("metascraper")([
  //require("metascraper-author")(),
  //require("metascraper-title")(),
  require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-logo")(),
  require("metascraper-clearbit-logo")(),
  require("metascraper-publisher")(),
  require("metascraper-url")()
]);
const got = require("got");
const to = require("await-to-js").default;

exports.handler = async (event, context) => {
  const uri = event.queryStringParameters.uri;
  if (!uri) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "No uri provided" })
    };
  }
  let response, error;
  [error, response] = await to(got(uri));
  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
  const { body: html, url } = response;
  [error, response] = await to(metascraper({ html, url }));
  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};

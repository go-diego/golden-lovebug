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
import got from "got";
const to = require("await-to-js").default;

export const scrape = async (targetUrl) => {
  let response, error;
  [error, response] = await to(got(targetUrl));
  if (error) return ["Not Found", undefined];
  const { body: html, url } = response;
  [error, response] = await to(metascraper({ html, url }));
  return [error, response];
};

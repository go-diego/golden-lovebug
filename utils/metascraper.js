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
const fetch = require("isomorphic-unfetch");

function to(promise) {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err]);
}

export default async function scraper(uri) {
    let error, response;
    [error, response] = await to(fetch(uri));
    if (error) throw new Error(error);
    const {url, status} = response;
    if (status === 404) return null;
    const html = await response.text();
    [error, response] = await to(metascraper({html, url}));
    if (error) throw new Error(error);
    return response;
}

const fs = require("fs");
const path = require("path");
const metascraper = require("metascraper")([
    //require("metascraper-author")(),
    require("metascraper-date")(),
    require("metascraper-description")(),
    require("metascraper-image")(),
    require("metascraper-logo")(),
    require("metascraper-clearbit-logo")(),
    require("metascraper-publisher")(),
    //require("metascraper-title")(),
    require("metascraper-url")()
]);
const got = require("got");

const PATHS = {
    PUBLICATIONS_METADATA_INPUT: "../jekyll/_data/publications.json",
    PUBLICATIONS_METADATA_OUTPUT: path.resolve(__dirname, "../jekyll/_data/publications-metadata.json")
};
const { publications } = require(PATHS.PUBLICATIONS_METADATA_INPUT);

(() => {
    const metadata = [];
    publications.forEach(datum => {
        return got(datum.url, { timeout: 5000 })
            .then(response => {
                return response;
            })
            .then(response => {
                const { body: html = null, url } = response;
                return metascraper({ html, url });
            })
            .then(response => {
                metadata.push({ ...response, ...datum });
                fs.writeFile(PATHS.PUBLICATIONS_METADATA_OUTPUT, JSON.stringify(metadata), "utf8");

                return response;
            })
            .catch(error => console.log("SCRAPE_ERROR", error));
    });
})();

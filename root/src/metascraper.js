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
    PUBLICATIONS_METADATA_CACHED: path.resolve(__dirname, "../jekyll/_data/publications.cache.json"),
    PUBLICATIONS_METADATA_OUTPUT: path.resolve(__dirname, "../jekyll/_data/publications-metadata.json")
};

const { publications } = require(PATHS.PUBLICATIONS_METADATA_INPUT);
let cachedPublications = null;

try {
    cachedPublications = require(PATHS.PUBLICATIONS_METADATA_CACHED);
} catch (e) {
    console.log("Cache not found");
}

if (cachedPublications) {
    if (JSON.stringify(cachedPublications) !== JSON.stringify(publications)) {
        createCache(publications).then(() => {
            console.log("Cache updated");
            return scrape();
        });
    } else {
        console.log("Publications haven't changed.  Skipping scraping ...");
    }
} else {
    createCache(publications).then(() => {
        console.log("Creating cache...");
        return scrape();
    });
}

function scrape() {
    let promises = [];
    publications.forEach(datum => {
        promises.push(
            got(datum.url, { timeout: 5000 })
                .then(response => {
                    return response;
                })
                .then(response => {
                    const { body: html = null, url } = response;
                    return metascraper({ html, url });
                })
                .then(response => {
                    return { ...response, ...datum };
                })
                .catch(error => console.log("ERROR", `${error.statusCode}: ${error.url}`))
        );
    });

    return Promise.all(promises).then(response => {
        let metadata = response.filter(item => !!item);
        return new Promise((resolve, reject) => {
            fs.writeFile(PATHS.PUBLICATIONS_METADATA_OUTPUT, JSON.stringify(metadata), "utf8", error => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    });
}

function createCache(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(PATHS.PUBLICATIONS_METADATA_CACHED, JSON.stringify(data), "utf8", error => {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}

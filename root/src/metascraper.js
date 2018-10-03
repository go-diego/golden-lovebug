const fs = require("fs");
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

const PATH_TO_PORTOFOLIO_DATA = "../jekyll/_data/works.json";
let portfolioData = require(PATH_TO_PORTOFOLIO_DATA);

(() => {
    const metadata = [];
    portfolioData.forEach(datum => {
        return got(datum.url, { timeout: 5000 })
            .then(response => {
                return response;
            })
            .then(response => {
                const { body: html = null, url } = response;
                return metascraper({ html, url });
            })
            .then(response => {
                metadata.push({ ...datum, ...response });
                fs.writeFile("./metadata.json", JSON.stringify(metadata), "utf8");

                return response;
            })
            .catch(error => console.log("ERROR", error));
    });
    console.log("metadata", metadata);
})();

// (async () => {
//     const promises = portfolioMetadata.map(async datum => {
//         const { body: html, url } = await got(datum.url, { timeout: 5000 });
//         const metadata = await metascraper({ html, url }).catch(error => console.log("ERR", error));
//         //console.log(metadata);
//         return metadata;
//         //return body;
//     });
//     const data = await Promise.all(promises).catch(error => console.log("ERR", error));
//     console.log("data", data);
// })();

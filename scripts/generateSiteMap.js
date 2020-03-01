const sitemap = require("nextjs-sitemap-generator");
const path = require("path");

sitemap({
  baseUrl: "https://allysonjeffredo.com",
  pagesDirectory: path.resolve(__dirname, "../src/pages"),
  targetDirectory: "public/",
  nextConfigPath: path.resolve(__dirname, "../next.config.js"),
  ignoredExtensions: ["png", "jpg"]
});

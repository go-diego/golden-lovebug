const sitemap = require("nextjs-sitemap-generator");

sitemap({
  baseUrl: "https://allysonjeffredo.com",
  pagesDirectory: `${__dirname}\\pages`,
  targetDirectory: "public/",
  nextConfigPath: `${__dirname}\\next.config.js`,
  ignoredExtensions: ["png", "jpg"]
});

const withSass = require("@zeit/next-sass");
const exportPathMap = require("./exportPathMap");

module.exports = withSass({
  exportPathMap
});

// module.exports = (phase, {defaultConfig}) => {
//     if (phase === PHASE_PRODUCTION_SERVER) {
//         return {};
//     }

//     const withImages = require("next-images");
//     const withSass = require("@zeit/next-sass");
//     const {withPlugins} = require("next-compose-plugins");
//     const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

//     return withPlugins(
//         [
//             [withSass, {minified: true}],
//             [withImages],
//             [
//                 withBundleAnalyzer,
//                 {
//                     analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
//                     analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
//                     bundleAnalyzerConfig: {
//                         server: {
//                             analyzerMode: "static",
//                             reportFilename: "../bundles/server.html"
//                         },
//                         browser: {
//                             analyzerMode: "static",
//                             reportFilename: "../bundles/client.html"
//                         }
//                     }
//                 }
//             ]
//         ],
//         nextConfig
//     )(phase, defaultConfig);
// };

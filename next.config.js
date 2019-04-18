const fse = require("fs-extra");
const {join} = require("path");

const {PHASE_PRODUCTION_SERVER} =
    process.env.NODE_ENV === "development"
        ? {} // We're never in "production server" phase when in development mode
        : !process.env.NOW_REGION
        ? require("next/constants") // Get values from `next` package when building locally
        : require("next-server/constants"); // Get values from `next-server` package when building on now v2

const nextConfig = {
    //crossOrigin: "anonymous",
    pageExtensions: ["js", "jsx"],
    webpack: config => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: "empty"
        };

        config.module.rules = config.module.rules.map(rule => {
            if (rule.loader === "babel-loader") {
                rule.options.cacheDirectory = false;
            }
            return rule;
        });
        return config;
    },
    exportPathMap: async function(defaultPathMap, {dev, dir, outDir, distDir, buildId}) {
        if (dev) {
            return defaultPathMap;
        }

        const postsList = await require("./_data/_posts.json");
        const posts = postsList.posts.reduce(
            (pages, post) => ({
                ...pages,
                [`/writing-behind-the-scenes/${post.slug}`]: {
                    page: "/post",
                    query: {slug: post.slug}
                }
            }),
            {}
        );

        await fse.copy(join(dir, "admin"), join(outDir, "admin"));
        return Object.assign({}, posts, {
            "/": {page: "/"},
            "/writing-behind-the-scenes": {page: "/blog"},
            "/writing-behind-the-scenes/archive": {page: "/archive"},
            "/publications": {page: "/publications"}
        });
    }
};

module.exports = (phase, {defaultConfig}) => {
    if (phase === PHASE_PRODUCTION_SERVER) {
        return {};
    }

    const withImages = require("next-images");
    const withSass = require("@zeit/next-sass");
    const {withPlugins} = require("next-compose-plugins");
    const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

    return withPlugins(
        [
            [withSass, {minified: true}],
            [withImages],
            [
                withBundleAnalyzer,
                {
                    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
                    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
                    bundleAnalyzerConfig: {
                        server: {
                            analyzerMode: "static",
                            reportFilename: "../bundles/server.html"
                        },
                        browser: {
                            analyzerMode: "static",
                            reportFilename: "../bundles/client.html"
                        }
                    }
                }
            ]
        ],
        nextConfig
    )(phase, defaultConfig);
};

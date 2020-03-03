const fse = require("fs-extra");
const { join, resolve } = require("path");
const getSlugifiedPosts = require("./getSlugifiedPosts");

async function exportPathMap(defaultPathMap, { dev, dir, outDir }) {
  if (dev) {
    return defaultPathMap;
  }

  const postsList = await getSlugifiedPosts();
  const posts = postsList.reduce((pages, post) => {
    return {
      ...pages,
      [`/writing-behind-the-scenes/${post.slug}`]: {
        page: "/writing-behind-the-scenes/[slug]",
        query: { slug: post.slug }
      },
      [`/writing-behind-the-scenes/archive`]: {
        page: "/archive"
      }
    };
  }, {});

  if (dir && outDir)
    await fse.copy(resolve(__dirname, "../src/admin"), join(outDir, "admin"));

  // filter our dynamic paths from defaulPathMap
  const {
    ["/writing-behind-the-scenes/[slug]"]: blogDynamicPath,
    ...staticPaths
  } = defaultPathMap;

  const paths = Object.assign({}, staticPaths, posts);
  return paths;
}

module.exports = exportPathMap;

const getSlugifiedPosts = require("./getSlugifiedPosts");

async function exportPathMap(defaultPathMap, { dev }) {
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

  // filter our dynamic paths from defaulPathMap
  const {
    ["/writing-behind-the-scenes/[slug]"]: blogDynamicPath,
    ...staticPaths
  } = defaultPathMap;

  const paths = Object.assign({}, staticPaths, posts);
  return paths;
}

module.exports = exportPathMap;

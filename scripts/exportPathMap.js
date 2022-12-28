const getSlugifiedPosts = require("./getSlugifiedPosts");

async function exportPathMap(defaultPathMap, { dev }) {
  if (dev) {
    return defaultPathMap;
  }

  const postsList = await getSlugifiedPosts();
  const posts = postsList.reduce((pages, post) => {
    return {
      ...pages,
      [`/overthink-a-blog/${post.slug}`]: {
        page: "/overthink-a-blog/[slug]",
        query: { slug: post.slug }
      },
      [`/overthink-a-blog/archive`]: {
        page: "/archive"
      }
    };
  }, {});

  // filter our dynamic paths from defaulPathMap
  const { ["/overthink-a-blog/[slug]"]: blogDynamicPath, ...staticPaths } =
    defaultPathMap;

  const paths = Object.assign({}, staticPaths, posts);
  return paths;
}

module.exports = exportPathMap;

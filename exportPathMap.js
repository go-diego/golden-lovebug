const fse = require("fs-extra");
const { join } = require("path");
const slugify = require("slugify");

async function exportPathMap(defaultPathMap, { dev, dir, outDir }) {
  if (dev) {
    return defaultPathMap;
  }

  const postsList = await require("./_data/_posts.json");
  const posts = postsList.data.reduce((pages, post) => {
    const slug = slugify(post.title, {
      replacement: "-", // replace spaces with replacement
      remove: /[*+~.()'"!:@,]/g, // regex to remove characters
      lower: true // result in lower case
    });
    return {
      ...pages,
      [`/writing-behind-the-scenes/${slug}`]: {
        page: "/writing-behind-the-scenes/[slug]",
        query: { slug }
      },
      [`/writing-behind-the-scenes/archive`]: {
        page: "/archive"
      }
    };
  }, {});

  if (dir && outDir) await fse.copy(join(dir, "admin"), join(outDir, "admin"));

  // filter our dynamic paths from defaulPathMap
  const {
    ["/writing-behind-the-scenes/[slug]"]: blogDynamicPath,
    ...staticPaths
  } = defaultPathMap;

  const paths = Object.assign({}, staticPaths, posts);
  return paths;
}

module.exports = exportPathMap;

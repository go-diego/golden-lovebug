const slugify = require("slugify");

async function getSlugifiedPosts() {
  const postsList = await require("../_data/_posts.json");
  return postsList.data.map((post) => {
    const slug = slugify(post.title, {
      replacement: "-", // replace spaces with replacement
      remove: /[*+~.()'"!:@,]/g, // regex to remove characters
      lower: true // result in lower case
    });
    return {
      ...post,
      slug
    };
  });
}

module.exports = getSlugifiedPosts;

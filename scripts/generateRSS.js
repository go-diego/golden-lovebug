const fs = require("fs");
const { resolve } = require("path");
const RSS = require("rss");
const format = require("date-fns/format");
const getSlugifiedPosts = require("./getSlugifiedPosts");

function dateSortDesc(a, b) {
  const date1 = new Date(a.publish_date);
  const date2 = new Date(b.publish_date);
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
}

async function generate() {
  const feed = new RSS({
    title: "Writing Behind the Scenes",
    site_url: "https://allysonjeffredo.com",
    feed_url: "https://allysonjeffredo/feed.xml",
    image_url: `https://allysonjeffredo.com/uploads/thumbnail.png`,
    managingEditor: "Allyson Jeffredo",
    webMaster: "Diego Bernal",
    copyright: `Allyson Jeffredo ${format(new Date(), "YYYY")}`
  });

  const posts = await getSlugifiedPosts();

  posts.sort(dateSortDesc).map(post => {
    feed.item({
      title: post.title,
      guid: post.slug,
      url: `https://allysonjeffredo.com/writing-behind-the-scenes/${post.slug}`,
      date: post.publish_date,
      description: post.description,
      categories: post.tags,
      enclosure: {
        url: `https://allysonjeffredo.com${post.image}`
      }
    });
  });

  const rss = feed.xml({ indent: true });

  fs.writeFileSync(resolve(__dirname, "../public/feed.xml"), rss);
}

generate();

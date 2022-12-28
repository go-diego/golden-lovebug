import Link from "next/link";
import Head from "../components/Head";
import AttentionBanner from "../components/AttentionBanner";
import Section from "../components/Section";
import PageTitleHeading from "../components/PageTitleHeading";
import BlogLayout from "../containers/BlogLayout";
import PostMediaObject from "../components/PostMediaObject";

export default function BlogArchivePage({ posts, metadata, data }) {
  const { description, title, content, keywords } = data;
  const orderedPosts = posts.sort(
    (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
  );
  const tags = {
    description,
    title: `${title} | Overthink`,
    keywords
  };
  return (
    <BlogLayout metadata={metadata}>
      <Head tags={tags} />
      <Link passHref href="/overthink-a-blog">
        <a
          style={{
            marginTop: "0.5rem",
            marginLeft: "0.5rem",
            position: "absolute"
          }}
          className="is-size-7 button is-link heading has-text-weight-bold is-inline-block">
          <span className="icon is-small">
            <i className="fas fa-arrow-left" />
          </span>
          &nbsp; Back
        </a>
      </Link>
      <AttentionBanner>
        <p className="is-size-6 has-text-link has-text-centered">Overthink</p>
        <PageTitleHeading title={title} />
        {/* <MarkedContent source={content} /> */}
      </AttentionBanner>
      <Section>
        <div style={{ margin: "1rem 0" }}>
          <a
            aria-label="rss-link"
            href="https://allysonjeffredo.com/feed.xml"
            target="_blank"
            rel="noopener"
            className="button is-dark is-narrow animated bounceIn delay-half-s is-size-7 is-uppercase">
            Subscribe to feed &nbsp;
            <span className="icon is-size-6">
              <i className="fas fa-rss" />
            </span>
          </a>
        </div>
        {orderedPosts.map((post, i) => (
          <PostMediaObject key={i} {...post} />
        ))}
      </Section>
    </BlogLayout>
  );
}

BlogArchivePage.getInitialProps = async () => {
  const asyncData = import("../_data/_pages/_blog.json");
  const asyncMetadata = import("../_data/_metadata.json");
  const asyncPosts = import("../_data/_posts.json");

  const promises = [asyncData, asyncMetadata, asyncPosts].map((p) =>
    p.then((res) => res.default)
  );

  const [data, metadata, posts] = await Promise.all(promises);

  return {
    posts: posts.data,
    metadata,
    data
  };
};

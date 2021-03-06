import Head from "../components/Head";
import Link from "next/link";
import AttentionBanner from "../components/AttentionBanner";
import Section from "../components/Section";
import PageTitleHeading from "../components/PageTitleHeading";
import BlogLayout from "../containers/BlogLayout";
import MarkedContent from "../components/MarkedContent";
import PostMediaObject from "../components/PostMediaObject";
import styled from "styled-components";
import format from "date-fns/format";
import isThisMonth from "date-fns/is_this_month";
import { slugit } from "../../scripts/slugit";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

const RecentPosts = styled.div`
  padding: 1.5rem 0;
`;

export default function BlogHomePage({ posts, metadata, data }) {
  const { description, title, keywords, content } = data;
  const tags = { description, title, keywords };
  const orderedPosts = posts.sort(
    (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
  );
  const featuredPost = orderedPosts[0];
  const featuredPostSlug = slugit(featuredPost.title);
  const postsThisMonth = orderedPosts
    .slice(1, orderedPosts.length)
    .filter(post => isThisMonth(new Date(post.publish_date)));
  const recentPosts =
    postsThisMonth.length > 0 ? postsThisMonth : orderedPosts.slice(1, 6);
  return (
    <BlogLayout metadata={metadata}>
      <Head tags={tags} />
      <AttentionBanner>
        <PageTitleHeading title={title} />
        <MarkedContent source={content} />
      </AttentionBanner>
      <Section>
        <div style={{ margin: "1rem 0" }}>
          <a
            aria-label="rss-link"
            href="https://allysonjeffredo.com/feed.xml"
            target="_blank"
            rel="noopener"
            className="button is-dark is-narrow animated bounceIn delay-half-s is-size-7 is-uppercase">
            <span>Subscribe to feed</span> &nbsp;
            <span className="icon is-size-6">
              <i className="fas fa-rss" />
            </span>
          </a>
        </div>
        <div className="columns is-variable is-5">
          <div className="column is-two-thirds">
            <div className="card has-background-light">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    className="is-object-fit-cover"
                    src={featuredPost.image || "./uploads/default-blog.jpg"}
                    alt={featuredPost.title}
                  />
                </figure>
              </div>
              <div className="card-content">
                <Row>
                  <span className="is-size-6">
                    {format(
                      new Date(featuredPost.publish_date),
                      "MMM DD, YYYY"
                    )}
                  </span>
                  <div className="heading is-size-6">
                    <span className="icon is-small">
                      <i className="fas fa-fire-alt" />
                    </span>
                    New
                  </div>
                </Row>
                <p className="title is-4">
                  <Link
                    passHref
                    href="/writing-behind-the-scenes/[slug]"
                    as={`/writing-behind-the-scenes/${featuredPostSlug}`}>
                    <a className="is-stretched-link">{featuredPost.title}</a>
                  </Link>
                </p>
                <div className="content">
                  <MarkedContent source={featuredPost.description} />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <aside className="box has-background-light">
              <p className="heading is-size-6 has-text-centered has-text-link has-text-weight-bold">
                {(postsThisMonth.length > 0 && "This Month") || "Recent"}
              </p>
              <RecentPosts>
                {recentPosts.map((post, i) => (
                  <PostMediaObject key={i} {...post} />
                ))}
              </RecentPosts>
              <div className="is-flex is-justify-content-center">
                <Link
                  passHref
                  as="/writing-behind-the-scenes/archive"
                  href="/archive">
                  <a className="is-size-6 is-flex button is-link heading has-text-weight-bold">
                    View All &nbsp;
                    <span className="icon is-small">
                      <i className="fas fa-arrow-right" />
                    </span>
                  </a>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </BlogLayout>
  );
}

BlogHomePage.getInitialProps = async () => {
  const asyncData = import("../_data/_pages/_blog.json");
  const asyncMetadata = import("../_data/_metadata.json");
  const asyncPosts = import("../_data/_posts.json");

  const promises = [asyncData, asyncMetadata, asyncPosts].map(p =>
    p.then(res => res.default)
  );

  const [data, metadata, posts] = await Promise.all(promises);

  return {
    posts: posts.data,
    metadata,
    data
  };
};

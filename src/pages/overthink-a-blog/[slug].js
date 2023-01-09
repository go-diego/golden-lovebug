import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Head from "../../components/Head";
import BlogLayout from "../../containers/BlogLayout";
import MarkedContent from "../../components/MarkedContent";
import SocialSharingButtons from "../../components/SocialSharingButtons";
import format from "date-fns/format";
import { slugit } from "../../lib/slugit";

const Body = styled.section`
  line-height: 1.75;
  font-size: 18px;
  padding-top: 4rem;
`;

const MorePostsNav = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Figure = styled.figure`
  /* width: 100% !important; */
  overflow: hidden;
`;

export default function BlogPost({ post, prevPost, nextPost, metadata }) {
  const [postUrl, setPostUrl] = React.useState(null);

  React.useEffect(() => {
    setPostUrl(window.location.href);
  }, []);

  // TODO: add topics to post entries
  const { title, description, publish_date, image, body, topics = [] } = post;
  const tags = {
    description,
    title: `${title} | Overthink`,
    keywords: [].concat(topics),
    ogImage: image
  };

  return (
    <BlogLayout metadata={metadata}>
      <Head tags={tags} />
      <article className="section">
        <div className="container">
          <Link legacyBehavior passHref href="/overthink-a-blog">
            <a
              style={{
                marginBottom: "1rem"
              }}
              className="is-size-7 button is-link heading has-text-weight-bold is-inline-block">
              <span className="icon is-small">
                <i className="fas fa-arrow-left" />
              </span>
              &nbsp; Back
            </a>
          </Link>
          <p className="is-size-6 has-text-link heading">Overthink</p>
          <h1 className="title is-family-primary is-display-4 is-size-4-mobile">
            {title}
          </h1>
          <h2 className="subtitle is-size-6-mobile">{description}</h2>
          <div style={{ marginBottom: "1rem" }}>
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
          <p
            className="is-size-7"
            style={{
              paddingBottom: "0.25rem"
            }}>
            {format(new Date(publish_date), "MMM dd, yyyy")}
          </p>
          <SocialSharingButtons label={title} link={postUrl} />
          <figure className="image is-5by3">
            <img
              alt={title}
              className="is-object-fit-cover"
              src={image || "./uploads/default-blog.jpg"}
            />
          </figure>
          <Body>
            <MarkedContent source={body} />
          </Body>
        </div>
      </article>
      <div className="container">
        <MorePostsNav className="columns is-marginless">
          <div className="column">
            {prevPost && (
              <Link
                legacyBehavior
                href={`/overthink-a-blog/${slugit(prevPost.title || "")}`}>
                <a
                  className="has-text-dark"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start"
                  }}>
                  <small className="heading">
                    <span className="icon is-small">
                      <i className="fas fa-arrow-left" />
                    </span>
                    Previous Post
                  </small>
                  <Figure className="image is-128x128 has-background-dark">
                    {/* <Image src={item.url} loaderColor="#33f1ed" /> */}
                    <img
                      alt={prevPost.title}
                      style={{ objectFit: "cover", height: "100%" }}
                      src={prevPost.image}
                    />
                  </Figure>
                  <small>{prevPost.title}</small>
                </a>
              </Link>
            )}
          </div>
          <div className="column">
            {nextPost && (
              <Link
                legacyBehavior
                href={`/overthink-a-blog/${slugit(nextPost.title || "")}`}>
                <a
                  className="has-text-dark"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end"
                  }}>
                  <small className="heading">
                    Next Post
                    <span className="icon is-small">
                      <i className="fas fa-arrow-right" />
                    </span>
                  </small>
                  <Figure className="image is-128x128 has-background-dark">
                    <img
                      alt={nextPost.title}
                      style={{ objectFit: "cover", height: "100%" }}
                      src={nextPost.image}
                    />
                  </Figure>
                  <small className="has-text-right">{nextPost.title}</small>
                </a>
              </Link>
            )}
          </div>
        </MorePostsNav>
      </div>
    </BlogLayout>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const asyncPosts = import("../../_data/_posts.json");
  const asyncMetadata = import("../../_data/_metadata.json");

  const promises = [asyncPosts, asyncMetadata].map((p) =>
    p.then((res) => res.default)
  );

  const [posts, metadata] = await Promise.all(promises);

  const orderedPosts = posts.data.sort(
    (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
  );

  const post =
    posts.data.filter((post) => slugit(post.title) === slug)[0] || null;

  const currentPostIndex = post
    ? orderedPosts.findIndex((p) => p.title === post.title)
    : null;

  const nextPost =
    currentPostIndex > 0 ? orderedPosts[currentPostIndex - 1] : null;
  const prevPost =
    currentPostIndex !== orderedPosts.length + 1
      ? posts.data[currentPostIndex + 1] || null
      : null;

  return { props: { post, prevPost, nextPost, metadata } };
}

export async function getStaticPaths() {
  const posts = await import("../../_data/_posts.json");
  const paths = posts.default.data.map((post) => ({
    params: { slug: slugit(post.title) }
  }));

  return { paths, fallback: false };
}

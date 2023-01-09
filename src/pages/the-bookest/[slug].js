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

  const {
    title,
    description,
    publish_date,
    image,
    body,
    tags = [],
    month
  } = post;
  const metatags = {
    description,
    title: `${title} | The Bookest`,
    keywords: [].concat(tags),
    ogImage: image
  };

  return (
    <BlogLayout metadata={metadata}>
      <Head tags={metatags} />
      <article className="section">
        <div className="container">
          <Link legacyBehavior passHref href="/the-bookest">
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
          <p className="is-size-6 has-text-link heading">The Bookest</p>
          <h1 className="title is-family-primary is-display-4 is-size-4-mobile">
            {title}
          </h1>
          <p
            className="is-size-7"
            style={{
              paddingBottom: "0.25rem"
            }}>
            {`Published ${format(new Date(month), "MMM dd yyyy")}`}
          </p>
          <SocialSharingButtons label={title} link={postUrl} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              maxHeight: "500px"
            }}>
            <img
              alt={title}
              width={300}
              src={image || "./uploads/default-blog.jpg"}
            />
          </div>
          {tags && tags.length > 0 && (
            <div
              className="tags"
              style={{
                marginTop: "1rem"
              }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="tag is-dark"
                  style={{
                    marginRight: "0.5rem",
                    marginBottom: "0.5rem"
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <Body>
            <MarkedContent source={description} />
          </Body>
        </div>
      </article>
    </BlogLayout>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const asyncPosts = import("_data/_book-reviews.json");
  const asyncMetadata = import("_data/_metadata.json");

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
  const posts = await import("_data/_book-reviews.json");
  const paths = posts.default.data.map((post) => ({
    params: { slug: slugit(post.title) }
  }));

  return { paths, fallback: false };
}

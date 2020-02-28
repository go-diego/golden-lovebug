import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Head from "../../components/Head";
import BlogLayout from "../../containers/BlogLayout";
import MarkedContent from "../../components/MarkedContent";
import SocialSharingButtons from "../../components/SocialSharingButtons";
import format from "date-fns/format";
import { slugit } from "../../utils/slugit";

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
  width: 100% !important;
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
    title: `${title} | Writing Behind the Scenes`,
    keywords: [].concat(topics)
  };
  return (
    <BlogLayout metadata={metadata}>
      <Head tags={tags} />
      <article className="section">
        <div className="container">
          <Link passHref href="/writing-behind-the-scenes">
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
          <p className="is-size-6 has-text-link heading">
            Writing Behind the Scenes
          </p>
          <h1 className="title is-family-primary is-display-4 is-size-4-mobile">
            {title}
          </h1>
          <h2 className="subtitle is-size-6-mobile">{description}</h2>
          <small>{format(new Date(publish_date), "MMM M, YYYY")}</small>
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
          <div className="column is-narrow">
            {prevPost && (
              <Link
                href={`/writing-behind-the-scenes/${slugit(prevPost.title)}`}>
                <a className="has-text-dark">
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
          <div className="column is-narrow">
            {nextPost && (
              <Link
                href={`/writing-behind-the-scenes/${slugit(nextPost.title)}`}>
                <a className="has-text-dark">
                  <small className="heading">
                    Next Post
                    <span className="icon is-small">
                      <i className="fas fa-arrow-right" />
                    </span>
                  </small>
                  <Figure className="image is-128x128 has-background-dark">
                    {/* <Image src={item.url} loaderColor="#33f1ed" /> */}
                    <img
                      alt={nextPost.title}
                      style={{ objectFit: "cover", height: "100%" }}
                      src={nextPost.image}
                    />
                  </Figure>
                  <small>{nextPost.title}</small>
                </a>
              </Link>
            )}
          </div>
        </MorePostsNav>
      </div>
    </BlogLayout>
  );
}

BlogPost.getInitialProps = async ({ query: { slug } }) => {
  const asyncPosts = import("../../_data/_posts.json");
  const asyncMetadata = import("../../_data/_metadata.json");

  const promises = [asyncPosts, asyncMetadata].map(p =>
    p.then(res => res.default)
  );

  const [posts, metadata] = await Promise.all(promises);

  const orderedPosts = posts.data.sort(
    (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
  );

  const post = posts.data.filter(post => slugit(post.title) === slug)[0] || {};
  const currentPostIndex = orderedPosts.findIndex(p => p.title === post.title);
  const nextPost =
    currentPostIndex > 0 ? orderedPosts[currentPostIndex - 1] : null;
  const prevPost =
    currentPostIndex !== orderedPosts.length + 1
      ? posts.data[currentPostIndex + 1]
      : null;

  return { post, prevPost, nextPost, metadata };
};

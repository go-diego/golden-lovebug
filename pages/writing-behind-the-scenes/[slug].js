import React from "react";
import styled from "styled-components";
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

export default function BlogPost({ post, metadata }) {
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
          <p className="is-size-6 has-text-link">Writing Behind the Scenes</p>
          <h1 className="title is-family-primary is-display-4 is-size-4-mobile">
            {title}
          </h1>
          <h2 className="subtitle is-size-6-mobile">{description}</h2>
          <small>{format(new Date(publish_date), "MMM M, YYYY")}</small>
          <SocialSharingButtons label={title} link={postUrl} />
          <figure className="image is-5by3">
            <img
              className="is-object-fit-cover"
              src={image || "./uploads/default-blog.jpg"}
            />
          </figure>
          <Body>
            <MarkedContent source={body} />
          </Body>
        </div>
      </article>
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

  const post = posts.data.filter(post => slugit(post.title) === slug)[0] || {};

  return { post, metadata };
};

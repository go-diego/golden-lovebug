import Link from "next/link";
import Head from "../../components/Head";
import AttentionBanner from "../../components/AttentionBanner";
import Section from "../../components/Section";
import PageTitleHeading from "../../components/PageTitleHeading";
import BlogLayout from "../../containers/BlogLayout";
import PostMediaObject from "../../components/PostMediaObject";

export default function ReviewsArchivePage({ posts, metadata, data }) {
  const { description, title, keywords } = data;
  const orderedPosts = posts.sort(
    (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
  );
  const tags = {
    description,
    title: `Archive | ${title}`,
    keywords
  };
  return (
    <BlogLayout metadata={metadata}>
      <Head tags={tags} />
      <Link legacyBehavior passHref href="/the-bookest">
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
        <p className="is-size-6 has-text-link has-text-centered">{title}</p>
        <PageTitleHeading title={"Archive"} />
        {/* <MarkedContent source={content} /> */}
      </AttentionBanner>
      <Section>
        {orderedPosts.map((post, i) => (
          <PostMediaObject path="the-bookest" key={i} {...post} />
        ))}
      </Section>
    </BlogLayout>
  );
}

export async function getStaticProps() {
  const asyncData = import("../../_data/_pages/_the-beloveds.json");
  const asyncMetadata = import("../../_data/_metadata.json");
  const asyncPosts = import("../../_data/_book-reviews.json");

  const promises = [asyncData, asyncMetadata, asyncPosts].map((p) =>
    p.then((res) => res.default)
  );

  const [data, metadata, posts] = await Promise.all(promises);

  const postsPreview = posts.data.map((post) => {
    const { title, month, image, tags } = post;
    return { title, publish_date: month, image, tags };
  });

  return {
    props: {
      posts: postsPreview,
      metadata,
      data
    }
  };
}

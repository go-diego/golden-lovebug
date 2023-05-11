import Head from "components/Head";
import Link from "next/link";
import AttentionBanner from "components/AttentionBanner";
import Section from "components/Section";
import PageTitleHeading from "components/PageTitleHeading";
import BlogLayout from "containers/BlogLayout";
import MarkedContent from "components/MarkedContent";
import BookMediaObject from "components/BookMediaObject";
import styled from "styled-components";
import format from "date-fns/format";
// import isThisYear from "date-fns/is_this_year";
import { slugit } from "lib/slugit";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

const RecentPosts = styled.div`
  padding: 1.5rem 0;
`;

const Embed = styled.div`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  &:before {
    padding-top: 125%;
    display: block;
    content: "";
  }
  & iframe {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

export default function TheBookest({ entries, metadata, data }) {
  const { description, title, keywords, content } = data;
  const tags = { description, title, keywords };
  const orderedEntries =
    entries.length > 0
      ? entries.sort((a, b) => new Date(b.month) - new Date(a.month))
      : entries;

  const featuredEntry = orderedEntries[0];
  const featuredEntrySlug = slugit(featuredEntry.title);

  // top three most recent entries after the featured entry
  const mostRecent = orderedEntries.slice(
    1,
    orderedEntries.length > 3 ? 4 : orderedEntries.length
  );

  return (
    <BlogLayout metadata={metadata}>
      <Head tags={tags} />
      <AttentionBanner>
        <PageTitleHeading title={title} />
        <MarkedContent source={content} />
      </AttentionBanner>
      <Section>
        {/* <div style={{ margin: "1rem 0" }}>
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
        </div> */}
        {/* <div className="columns is-variable is-5">
          <div
            className={`column${
              entriesThisYear.length > 0
                ? " is-two-thirds"
                : " is-6 is-offset-3"
            }`}> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "4rem",
            backgroundColor: "#fffaeb",
            position: "relative"
          }}>
          <div className="">
            <div
              className="card-image"
              style={{
                paddingTop: "2rem"
                // width: 300
              }}>
              <figure className="image is-4by3">
                <img
                  style={{ objectFit: "contain" }}
                  src={featuredEntry.image}
                  alt={featuredEntry.title}
                />
              </figure>
            </div>
            <div className="card-content">
              <div
                className="is-flex"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "4px"
                }}>
                <p
                  className="heading is-size-7"
                  style={{
                    margin: 0
                  }}>
                  {format(new Date(featuredEntry.month), "MMM dd, yyyy")}
                </p>
                <span
                  className="tag"
                  style={{
                    backgroundColor: "#fffaeb",
                    color: " #946c00",
                    border: "1px solid #946c00"
                  }}>
                  New 🔥
                </span>
              </div>

              <p className="title is-4">
                <Link
                  legacyBehavior
                  passHref
                  href={`/the-bookest/${featuredEntrySlug}`}>
                  <a className="is-stretched-link">{featuredEntry.title}</a>
                </Link>
              </p>
              <p className="subtitle heading">{featuredEntry.author.name}</p>
              {featuredEntry.tags && featuredEntry.tags.length > 0 && (
                <div
                  className="tags"
                  style={{
                    marginTop: "1rem"
                  }}>
                  {featuredEntry.tags.map((tag) => (
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
            </div>
          </div>
        </div>
        <div className="columns">
          {mostRecent.length > 0 &&
            mostRecent.map((post, i) => (
              <div className="column is-one-third">
                <div
                  className="card has-background-light"
                  style={{
                    height: "100%"
                  }}>
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          objectFit: "cover"
                        }}
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div
                      className="is-flex"
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "4px"
                      }}>
                      <p className="heading is-size-7" style={{ margin: 0 }}>
                        {format(new Date(post.month), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <p className="title is-4">
                      <Link
                        legacyBehavior
                        passHref
                        href={`/the-bookest/${slugit(post.title)}`}>
                        <a className="is-stretched-link">{post.title}</a>
                      </Link>
                    </p>
                    <p className="subtitle heading">{post.author.name}</p>

                    {post.tags && post.tags.length > 0 && (
                      <div
                        className="tags"
                        style={{
                          marginTop: "1rem"
                        }}>
                        {post.tags.map((tag) => (
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
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="is-flex is-justify-content-center">
          <Link legacyBehavior passHref href="/the-bookest/archive">
            <a className="is-size-6 is-flex button is-link heading has-text-weight-bold">
              View All &nbsp;
              <span className="icon is-small">
                <i className="fas fa-arrow-right" />
              </span>
            </a>
          </Link>
        </div>
      </Section>
    </BlogLayout>
  );
}

export async function getStaticProps() {
  const asyncData = import("_data/_pages/_the-beloveds.json");
  const asyncMetadata = import("_data/_metadata.json");
  const asyncEntries = import("_data/_book-reviews.json");

  const promises = [asyncData, asyncMetadata, asyncEntries].map((p) =>
    p.then((res) => res.default)
  );

  const [data, metadata, entries] = await Promise.all(promises);

  const entriesPreview = entries.data.map((post) => {
    const { title, month, image, tags, author } = post;
    return { title, month, image, tags, author };
  });

  return {
    props: {
      entries: entriesPreview,
      metadata,
      data
    }
  };
}

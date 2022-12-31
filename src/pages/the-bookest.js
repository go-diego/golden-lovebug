import Head from "../components/Head";
import Link from "next/link";
import AttentionBanner from "../components/AttentionBanner";
import Section from "../components/Section";
import PageTitleHeading from "../components/PageTitleHeading";
import BlogLayout from "../containers/BlogLayout";
import MarkedContent from "../components/MarkedContent";
import BookMediaObject from "../components/BookMediaObject";
import styled from "styled-components";
import format from "date-fns/format";
// import isThisYear from "date-fns/is_this_year";
import { slugit } from "../lib/slugit";

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
  const { description, title, keywords, content, poll_link } = data;
  const tags = { description, title, keywords };
  const orderedEntries =
    entries.length > 0
      ? entries.sort((a, b) => new Date(b.month) - new Date(a.month))
      : entries;

  const featuredEntry = orderedEntries[0];
  // const featuredEntrySlug = slugit(featuredEntry.title);
  // const entriesThisYear = orderedEntries
  //   .slice(1, orderedEntries.length)
  //   .filter((post) => isThisYear(new Date(post.publish_date)));

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
        <div className="card has-background-light">
          <div
            className="card-image"
            style={{
              paddingTop: "2rem"
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
            <div className="is-flex">
              <p className="heading is-size-7">
                {format(new Date(featuredEntry.month), "MMM dd, yyyy")}
              </p>
            </div>
            <p className="title is-4">
              {/* <Link
                    passHref
                    href="/the-bookest/[slug]"
                    as={`/the-bookest/${featuredEntrySlug}`}>
                    <a className="is-stretched-link">{featuredEntry.title}</a>
                  </Link> */}
              {featuredEntry.title}
            </p>
            <p className="subtitle heading">{featuredEntry.author.name}</p>
            <div className="content">
              <MarkedContent source={featuredEntry.description} />
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* {entriesThisYear.length > 0 && (
            <div className="column">
              <aside className="box has-background-light">
                <p className="heading is-size-6 has-text-centered has-text-link has-text-weight-bold">
                  Recent
                </p>
                <RecentPosts>
                  {entriesThisYear.map((post, i) => (
                    <BookMediaObject key={i} {...post} />
                  ))}
                </RecentPosts>
                <div className="is-flex is-justify-content-center">
                  <Link passHref as="/the-bookest/archive" href="/archive">
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
          )} */}
        {/* </div> */}
      </Section>
      {poll_link && (
        <Section>
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <div class="notification is-warning">
                <p className="heading is-size-5 has-text-centered">Vote Now</p>
                Take a second to{" "}
                <a target="_blank" rel="noopener" href={poll_link}>
                  vote
                </a>{" "}
                for the next month's book selection and leave a suggestion or
                two for the future!
              </div>
            </div>
          </div>
        </Section>
      )}
    </BlogLayout>
  );
}

export async function getStaticProps() {
  const asyncData = import("../_data/_pages/_the-beloveds.json");
  const asyncMetadata = import("../_data/_metadata.json");
  const asyncEntries = import("../_data/_book-reviews.json");

  const promises = [asyncData, asyncMetadata, asyncEntries].map((p) =>
    p.then((res) => res.default)
  );

  const [data, metadata, entries] = await Promise.all(promises);

  return {
    props: {
      entries: entries.data,
      metadata,
      data
    }
  };
}

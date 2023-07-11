import React from "react";
import ReactMarkdown from "react-markdown";
import HomeHero from "../components/HomeHero";
import MainLayout from "../containers/MainLayout";
import Head from "../components/Head";
import Section from "../components/Section";
import NewsletterSection from "components/Newsletter";

export default function HomePage({ data, metadata }) {
  const { description, title, content, keywords } = data;
  const tags = { description, title, keywords };
  return (
    <MainLayout metadata={metadata}>
      <Head tags={tags} />
      <HomeHero data={data} metadata={metadata} />
      <Section>
        <h1 className="title">About</h1>
        <div className="content">
          <ReactMarkdown linkTarget="_blank" children={content} />
        </div>
      </Section>
      {/* <Section className="has-background-dark has-text-light">
        <NewsletterSection />
      </Section> */}
    </MainLayout>
  );
}

HomePage.getInitialProps = async () => {
  const dataAsync = import("../_data/_pages/_home.json");
  const metadataAsync = import("../_data/_metadata.json");

  const promises = [dataAsync, metadataAsync].map((p) =>
    p.then((res) => res.default)
  );

  const [data, metadata] = await Promise.all(promises);

  return {
    data,
    metadata
  };
};

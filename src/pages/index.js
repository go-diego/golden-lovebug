// TODO: add UI support for author's website and social media links
// TODO: add UI support for tags for book entries
// TODO: decide on layout for multiple book entries - upcoming + previous

import ReactMarkdown from "react-markdown";
import HomeHero from "../components/HomeHero";
import MainLayout from "../containers/MainLayout";
import Head from "../components/Head";
import Section from "../components/Section";

export default function HomePage({ data, metadata }) {
  const { description, title, content, keywords } = data;
  const tags = { description, title, keywords };
  return (
    <MainLayout metadata={metadata}>
      <Head tags={tags}>
        <script
          type="text/javascript"
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        />
      </Head>
      <HomeHero data={data} metadata={metadata} />
      <Section>
        <h1 className="title">About</h1>
        <div className="content">
          <ReactMarkdown source={content} />
        </div>
      </Section>
    </MainLayout>
  );
}

HomePage.getInitialProps = async () => {
  const dataAsync = import("../_data/_pages/_home.json");
  const metadataAsync = import("../_data/_metadata.json");

  const promises = [dataAsync, metadataAsync].map(p =>
    p.then(res => res.default)
  );

  const [data, metadata] = await Promise.all(promises);

  return {
    data,
    metadata
  };
};

import MainLayout from "../containers/MainLayout";
import Head from "../components/Head";
import Section from "../components/Section";
import PageTitleHeading from "../components/PageTitleHeading";
import AttentionBanner from "../components/AttentionBanner";
import MarkedContent from "../components/MarkedContent";
import PublicationMedia from "../components/PublicationMedia";
import { scrape } from "lib/scrape";

export default function PublicationsPage({ data, metadata }) {
  const { title, description, content, publications, keywords } = data;
  const tags = { description, title, keywords };

  return (
    <MainLayout metadata={metadata}>
      <Head tags={tags} />
      <AttentionBanner>
        <PageTitleHeading title={title} />
        <MarkedContent source={content} />
      </AttentionBanner>
      <Section>
        {publications.map((publication, i) => (
          <PublicationMedia key={i} {...publication} />
        ))}
      </Section>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const dataAsync = import("../_data/_pages/_publications.json");
  const metadataAsync = import("../_data/_metadata.json");

  const promises = [dataAsync, metadataAsync].map((p) =>
    p.then((res) => res.default)
  );

  const [data, metadata] = await Promise.all(promises);

  for (let i = 0; i < data.publications.length; i++) {
    const publication = data.publications[i];
    if (publication.isActive) {
      const [error, response] = await scrape(publication.url);
      // if (publication.url.includes("amazon")) {
      //   console.log("error", error, publication.url);
      //   console.log("response", response);
      // }
      const mergedPublication = { ...(response || {}), ...publication };
      if (!mergedPublication.image) {
        mergedPublication.image = "/uploads/default-publication.jpg";
      }
      data.publications[i] = mergedPublication;
      data.publications[i].errorScraping = !!error;
    }
  }

  return {
    props: {
      data,
      metadata
    }
  };
}

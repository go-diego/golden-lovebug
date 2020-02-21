import MainLayout from "../containers/MainLayout";
import Head from "../components/Head";
import Section from "../components/Section";
import PageTitleHeading from "../components/PageTitleHeading";
import AttentionBanner from "../components/AttentionBanner";
import MarkedContent from "../components/MarkedContent";
import PublicationMedia from "../components/PublicationMedia";

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

PublicationsPage.getInitialProps = async () => {
    const dataAsync = import("../_data/_pages/_publications.json");
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

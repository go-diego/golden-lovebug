import MainLayout from "../containers/MainLayout";
import Head from "../components/Head";
import Section from "../components/Section";
import PageTitleHeading from "../components/PageTitleHeading";
import AttentionBanner from "../components/AttentionBanner";
import MarkedContent from "../components/MarkedContent";
import PublicationMedia from "../components/PublicationMedia";
import {to} from "../utils/await-to";
import metascraper from "../utils/metascraper";

export default function PublicationsPage({data, metadata}) {
    const {title, description, content, publications, keywords} = data;
    const tags = {description, title, keywords};
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

    const data = await dataAsync;
    const metadata = await metadataAsync;
    const {publications = null} = data.default;

    let publicationPromises = [];
    if (publications.length > 0) {
        // TODO: test parallelism
        publicationPromises = publications.map(async (publication, i) => {
            const [error, result] = await to(metascraper(publication.url));
            if (error) return null;
            return result;
        });
        // for (let publication of publications) {
        //     const [error, scraped] = await to(metascraper(publication.url));
        //     if (!error) processedPublications.push({...scraped, ...publication});
        //     console.log("scraped", scraped);
        //     console.log("processedPublications", processedPublications);
        // }
        // console.log("DONE");
    }

    const processedPublications = await Promise.all(publicationPromises);
    const mergedPublications = [];
    processedPublications.forEach((publication, i) => {
        if (publication) {
            const mergedPublication = {
                ...publication,
                ...data.default.publications[i]
            };
            mergedPublications.push(mergedPublication);
        }
    });
    data.default.publications = mergedPublications;

    return {
        data: data.default,
        metadata: metadata.default
    };
};

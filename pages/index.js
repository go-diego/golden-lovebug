import ReactMarkdown from "react-markdown";
import HomeHero from "../components/HomeHero";
import HomeLayout from "../containers/HomeLayout";
import Head from "../components/Head";
import Section from "../components/Section";

export default function HomePage({data, metadata}) {
    const {description, title, content, keywords} = data;
    const tags = {description, title, keywords};
    return (
        <HomeLayout>
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
        </HomeLayout>
    );
}

HomePage.getInitialProps = async () => {
    const dataAsync = import("../_data/_pages/_home.json");
    const metadataAsync = import("../_data/_metadata.json");

    const data = await dataAsync;
    const metadata = await metadataAsync;

    return {
        data: data.default,
        metadata: metadata.default
    };
};

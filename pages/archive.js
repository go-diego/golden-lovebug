import Head from "../components/Head";
import AttentionBanner from "../components/AttentionBanner";
import Section from "../components/Section";
import PageTitleHeading from "../components/PageTitleHeading";
import BlogLayout from "../containers/BlogLayout";
import PostMediaObject from "../components/PostMediaObject";

export default function BlogArchivePage({ posts, metadata, data }) {
    const { description, title, content, keywords } = data;
    const orderedPosts = posts.sort(
        (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
    );
    const tags = {
        description,
        title: `${title} | Writing Behind the Scenes`,
        keywords
    };
    return (
        <BlogLayout metadata={metadata}>
            <Head tags={tags} />
            <AttentionBanner>
                <p className="is-size-6 has-text-link has-text-centered">
                    Writing Behind the Scenes
                </p>
                <PageTitleHeading title={title} />
                {/* <MarkedContent source={content} /> */}
            </AttentionBanner>
            <Section>
                {orderedPosts.map((post, i) => (
                    <PostMediaObject key={i} {...post} />
                ))}
            </Section>
        </BlogLayout>
    );
}

BlogArchivePage.getInitialProps = async () => {
    const asyncData = import("../_data/_pages/_blog.json");
    const asyncMetadata = import("../_data/_metadata.json");
    const asyncPosts = import("../_data/_posts.json");

    const promises = [asyncData, asyncMetadata, asyncPosts].map(p =>
        p.then(res => res.default)
    );

    const [data, metadata, posts] = await Promise.all(promises);

    return {
        posts: posts.data,
        metadata,
        data
    };
};

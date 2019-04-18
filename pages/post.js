import React from "react";
import Head from "../components/Head";
import BlogLayout from "../containers/BlogLayout";
import MarkedContent from "../components/MarkedContent";
import SocialSharingButtons from "../components/SocialSharingButtons";
import format from "date-fns/format";
import styled from "styled-components";

const Body = styled.section`
    line-height: 1.75;
    font-size: 18px;
    padding-top: 4rem;
`;

export default class BlogPost extends React.Component {
    state = {
        postUrl: ""
    };

    componentDidMount() {
        this.setState({postUrl: window.location.href});
    }

    render() {
        const {post, metadata} = this.props;
        // TODO: add topics to post entries
        const {title, description, publish_date, image, body, topics = []} = post;
        const {postUrl} = this.state;
        const tags = {
            description,
            title: `${title} | Writing Behind the Scenes`,
            keywords: [].concat(topics)
        };
        return (
            <BlogLayout metadata={metadata}>
                <Head tags={tags} />
                <article className="section">
                    <div className="container">
                        <p className="is-size-6 has-text-link">Writing Behind the Scenes</p>
                        <h1 className="title is-family-primary is-display-4 is-size-1-mobile">
                            {title}
                        </h1>
                        <h2 className="subtitle">{description}</h2>
                        <small>{format(new Date(publish_date), "MMM M, YYYY")}</small>
                        <SocialSharingButtons label={title} link={postUrl} />
                        <figure className="image is-5by3">
                            <img className="is-object-fit-cover" src={image} />
                        </figure>
                        <Body>
                            <MarkedContent source={body} />
                        </Body>
                    </div>
                </article>
            </BlogLayout>
        );
    }
}

BlogPost.getInitialProps = async ({query: {slug}}) => {
    const asyncPosts = import("../_data/_posts.json");
    const asyncMetadata = import("../_data/_metadata.json");

    const metadata = await asyncMetadata;
    const posts = await asyncPosts;
    const post = posts.default.posts.filter(post => post.slug === slug)[0] || {};

    return {post, metadata: metadata.default};
};

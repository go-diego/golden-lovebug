import ReactMarkdown from "react-markdown";
import HeroNavbar from "./HeroNavbar";
import styled from "styled-components";

const Description = styled.div`
    line-height: 2;
`;

const Image = styled.img`
    object-fit: cover;
    height: 100% !important;
    width: 100%;
`;

const Hero = styled.section`
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23b77843' fill-opacity='0.24'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const Level = styled.nav`
    padding-left: 1rem;
    justify-content: center;
    .level-item {
        padding-right: 8px;
        padding-left: 8px;
    }
`;

const LevelLink = styled.a`
    border-radius: 100%;
    height: 32px;
    width: 32px;
`;

export default function HomeHero({data, metadata}) {
    const {description, greeting, tagline, profile_image} = data;
    //TODO: do I need us=nstagram_url
    const {email, facebook_url, twitter_url, linkedin_url} = metadata;
    return (
        <Hero className="hero home-hero is-medium">
            <div className="hero-head">
                <HeroNavbar />
            </div>
            <div className="hero-body has-text-centered-mobile">
                <div className="container">
                    <div className="columns">
                        <div className="column is-flex is-justify-content-center is-align-items-center">
                            <figure className="image is-256x256 animated fadeInDown">
                                <Image className="is-rounded" src={profile_image} />
                            </figure>
                        </div>
                        <div className="column">
                            <h1 className="is-family-primary title animated fadeInUp">
                                {greeting}
                            </h1>
                            <h1 className="is-family-primary has-text-link subtitle is-6 is-uppercase has-text-weight-bold animated fadeInUp">
                                {tagline}
                            </h1>
                            <hr className="has-background-warning" />
                            <Description className="content animated fadeInUp is-text-justified-mobile">
                                <ReactMarkdown source={description} />
                            </Description>
                            <div className="is-flex is-align-items-center">
                                <a
                                    href={`mailto:${email}`}
                                    className="button is-link is-uppercase is-rounded">
                                    Contact Me
                                </a>
                                <Level className="level is-mobile">
                                    <LevelLink
                                        href={facebook_url}
                                        target="_blank"
                                        rel="noopener"
                                        className="button is-dark level-item is-narrow animated bounceIn delay-half-s">
                                        <span className="icon is-size-6">
                                            <i className="fab fa-facebook-f" />
                                        </span>
                                    </LevelLink>
                                    <LevelLink
                                        href={linkedin_url}
                                        target="_blank"
                                        rel="noopener"
                                        className="button is-dark level-item is-narrow animated bounceIn delay-1s">
                                        <span className="icon is-size-6">
                                            <i className="fab fa-linkedin-in" />
                                        </span>
                                    </LevelLink>
                                    <LevelLink
                                        href={twitter_url}
                                        target="_blank"
                                        rel="noopener"
                                        className="button is-dark level-item is-narrow animated bounceIn delay-1-half-s">
                                        <span className="icon is-size-6">
                                            <i className="fab fa-twitter" />
                                        </span>
                                    </LevelLink>
                                </Level>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Hero>
    );
}

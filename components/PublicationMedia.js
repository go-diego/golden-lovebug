import MarkedContent from "./MarkedContent";
import SocialSharingButtons from "./SocialSharingButtons";
import styled from "styled-components";

const Figure = styled.figure`
    overflow: hidden;
    -moz-border-radius: 8px;
    border-radius: 8px;
`;

const FigCaption = styled.figcaption`
    position: relative;
    display: flex;
    align-items: center;
`;

const Img = styled.img`
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Row = styled.div`
    padding: 16px 0;
    &:not(:last-child) {
        border-bottom: 2px solid #b77843;
    }
`;

export default function PublicationMedia(props) {
    //console.log("PROPS", props);
    const {title, image = null, url, description, publisher = null} = props;
    return (
        <Row className="columns">
            <div className="column is-one-quarter">
                <Figure className="image is-4by5 shadow">
                    <Img src={image} />
                    {/* <FigCaption className="has-background-light">
                        <figure className="image is-32x32">
                            <Img className="is-rounded p-1" src={publisher.logo} />
                        </figure>
                        <small className="has-text-centered">{publisher.name}</small>
                    </FigCaption> */}
                </Figure>
            </div>
            <Content className="column">
                <div>
                    <h2 className="title is-4">{title}</h2>
                    <MarkedContent source={description} />
                    {/* <Blockquote context="is-primary" citation={blurb.source}>
                        <MarkedContent source={blurb.content} />
                    </Blockquote> */}
                </div>
                {url && (
                    <div className="pt-3">
                        <div>
                            <p className="heading has-text-link has-text-weight-semibold">Share</p>
                            <SocialSharingButtons label={title} link={url} />
                        </div>
                    </div>
                )}
            </Content>
        </Row>
    );
}

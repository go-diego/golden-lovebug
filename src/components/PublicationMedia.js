import React from "react";
import styled from "styled-components";
import MarkedContent from "./MarkedContent";
import SocialSharingButtons from "./SocialSharingButtons";

const Figure = styled.figure`
  overflow: hidden;
  -moz-border-radius: 8px;
  border-radius: 8px;
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

export default function PublicationMedia(publication) {
  const { title, image, url, description, errorScraping } = publication;
  return (
    publication.isActive && (
      <Row className="columns">
        <div className="column is-one-quarter">
          <Figure className="image is-4by5 shadow">
            <Img alt={publication.title} src={image} />
          </Figure>
        </div>
        <Content className="column">
          <div>
            <h2 className="title is-4">{title}</h2>

            <MarkedContent source={description} />

            <a
              href={url}
              target="_blank"
              rel="noopener"
              className="button is-primary is-uppercase"
              style={{ margin: "0.5rem 0" }}>
              Read It
            </a>
          </div>
          <div style={{ paddingTop: "1rem" }}>
            <p className="heading has-text-link has-text-weight-semibold is-marginless">
              Share
            </p>
            <SocialSharingButtons label={title} link={url} />
          </div>
        </Content>
      </Row>
    )
  );
}

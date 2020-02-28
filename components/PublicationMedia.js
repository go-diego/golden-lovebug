// TODO: add default description to publications with no description
// TODO: add default image
// TODO: make the media item clickable

import MarkedContent from "./MarkedContent";
import SocialSharingButtons from "./SocialSharingButtons";
import styled from "styled-components";
import ky from "ky/umd";
import { to } from "await-to-js";
import Skeleton from "react-loading-skeleton";

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

function setPublicationDefaults(publication) {
  //if (!publication.description) publication.description = "Read it here!";
  if (!publication.image)
    publication.image = "/uploads/default-publication.jpg";
  return publication;
}

export default function PublicationMedia(publication) {
  const [data, setData] = React.useState(publication);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getData() {
      if (publication.url && !publication.isInactive) {
        const [error, response] = await to(
          ky(`/.netlify/functions/metascraper?uri=${publication.url}`).json()
        );
        if (error) setError(error);
        const mergedPublication = { ...response, ...publication };
        setData(mergedPublication);
        setPublicationDefaults(mergedPublication);
        setIsLoading(false);
      }
    }
    getData();
  }, [publication.url]);

  const { title, image = null, url, description, publisher = null } = data;

  return (
    publication.isActive &&
    !error && (
      <Row className="columns">
        <div className="column is-one-quarter">
          {!isLoading && (
            <Figure className="image is-4by5 shadow">
              <Img alt={publication.title} src={image} />
            </Figure>
          )}
          {isLoading && <Skeleton height={250} />}
        </div>
        <Content className="column">
          <div>
            <h2 className="title is-4">{!isLoading ? title : <Skeleton />}</h2>
            {isLoading ? (
              <Skeleton count={5} />
            ) : (
              <MarkedContent source={description} />
            )}
            {(!isLoading && (
              <a
                href={url}
                target="_blank"
                rel="noopener"
                className="button is-primary is-uppercase"
                style={{ margin: "0.5rem 0" }}>
                Read It
              </a>
            )) || <Skeleton height={36} width={92} />}
          </div>
          {(!isLoading && (
            <div style={{ paddingTop: "1rem" }}>
              <p className="heading has-text-link has-text-weight-semibold is-marginless">
                Share
              </p>
              <SocialSharingButtons label={title} link={url} />
            </div>
          )) || <Skeleton count={2} />}
        </Content>
      </Row>
    )
  );
}

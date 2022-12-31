import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import useSWR from "swr";
import { fetcher } from "lib/fetcher";
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
  const [data, setData] = React.useState(publication);
  const {
    data: scrapedData,
    error,
    isLoading
  } = useSWR(`/api/scrape?url=${publication.url}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 100_000,
    focusThrottleInterval: 100_000
  });

  React.useEffect(() => {
    const mergedPublication = { ...(scrapedData || {}), ...publication };
    if (!mergedPublication.image)
      mergedPublication.image = "/uploads/default-publication.jpg";
    setData(mergedPublication);
  }, [scrapedData]);

  const { title, image = null, url, description } = data;

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
            {!isLoading ? (
              <a
                href={url}
                target="_blank"
                rel="noopener"
                className="button is-primary is-uppercase"
                style={{ margin: "0.5rem 0" }}>
                Read It
              </a>
            ) : (
              <Skeleton height={36} width={92} />
            )}
          </div>
          {!isLoading ? (
            <div style={{ paddingTop: "1rem" }}>
              <p className="heading has-text-link has-text-weight-semibold is-marginless">
                Share
              </p>
              <SocialSharingButtons label={title} link={url} />
            </div>
          ) : (
            <Skeleton count={2} />
          )}
        </Content>
      </Row>
    )
  );
}

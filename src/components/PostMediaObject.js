import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import format from "date-fns/format";
import { slugit } from "../lib/slugit";

const Article = styled.article`
  position: relative;
  min-height: 90px;
`;

export default function PostMediaObject({
  title,
  image,
  description,
  publish_date,
  path,
  tags
}) {
  const slug = slugit(title);
  return (
    <Article className="media">
      <div className="media-left">
        <figure
          style={{
            width: "64px",
            height: "auto !important"
          }}
          className="image is-64x64">
          <img
            className="is-object-fit-cover"
            src={image || "./uploads/default-blog.jpg"}
            alt={title}
          />
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <strong>{title}</strong>
          <br />
          <small className="is-size-7">
            {format(new Date(publish_date), "MMM dd, yyyy")}
          </small>
          <br />
          {description && (
            <ReactMarkdown linkTarget="_blank" children={description} />
          )}
          {tags && tags.length > 0 && (
            <div
              className="tags"
              style={{
                marginTop: "1rem"
              }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="tag is-dark"
                  style={{
                    marginRight: "0.5rem",
                    marginBottom: "0.5rem"
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="media-right">
        <Link legacyBehavior passHref href={`/${path}/${slug}`}>
          <a className="is-stretched-link">
            <span className="icon is-small">
              <i className="fas fa-arrow-right" />
            </span>
          </a>
        </Link>
      </div>
    </Article>
  );
}

import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import format from "date-fns/format";
import { slugit } from "../lib/slugit";

const Article = styled.article`
  position: relative;
`;

export default function BookMediaObject({
  title,
  image,
  description,
  publish_date
}) {
  const slug = slugit(title);
  return (
    <Article className="media">
      <div className="media-left">
        <figure className="image is-64x64">
          <img
            style={{ objectFit: "contain" }}
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
          <ReactMarkdown linkTarget="_blank" children={description} />
        </div>
      </div>
      <div className="media-right">
        <Link
          legacyBehavior
          passHref
          href={`/the-bookest/${slug}`}
          as={`/the-bookest/${slug}`}>
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

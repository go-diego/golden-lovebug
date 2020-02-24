import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";

const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "/uploads/thumbnail.png";

export default function Head({ tags = {}, children }) {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{tags.title || ""}</title>
      <meta
        key="description"
        name="description"
        content={tags.description || defaultDescription}
      />
      {tags.keywords && (
        <meta
          key="keywords"
          name="keywords"
          content={tags.keywords.join(", ") || ""}
        />
      )}
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta key="og_url" property="og:url" content={tags.url || defaultOGURL} />
      <meta key="og_title" property="og:title" content={tags.title || ""} />
      <meta
        key="og_description"
        property="og:description"
        content={tags.description || defaultDescription}
      />
      <meta
        key="twitter_site"
        name="twitter:site"
        content={tags.url || defaultOGURL}
      />
      <meta
        key="twitter_card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        key="twitter_image"
        name="twitter:image"
        content={tags.ogImage || defaultOGImage}
      />
      <meta
        key="og_image"
        property="og:image"
        content={tags.ogImage || defaultOGImage}
      />
      <meta key="og_image_width" property="og:image:width" content="1200" />
      <meta key="og_image_height" property="og:image:height" content="630" />
      {children}
    </NextHead>
  );
}

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

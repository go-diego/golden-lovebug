import React from "react";
import NextHead from "next/head";
import {string} from "prop-types";

const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";
const favicon =
    "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAANR3PACoUbQA1SDcAPG1BAEUq/wAoH0kAKTMcAFunawBJf08AfHf/ACcQigAAAAAAAAAAAAAAAAAAAAAARAAEAAAAAABIMDkyuyAAADiXMrqqUgAAOTdhUREVYAAHZiuysiJgAAalUSsVqqYAalG2sbuxGmAqGyIiZisVICq7axUbYitSJRa6sbsbIasLa6sapbUlsAC6EqG7GmsAALpbWxWhsAAAAqGhu7sAAAAAtRpbAAAAAAACu7AAAAA7/wAAEB8AAAAPAAAABwAAgAcAAIADAAAAAQAAAAEAAAAAAAAAAAAAgAEAAMADAADABwAA4A8AAPA/AAD4fwAA";

export default function Head({tags = {}, children}) {
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
                <meta key="keywords" name="keywords" content={tags.keywords.join(", ") || ""} />
            )}
            <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />

            {/* <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" /> */}
            <link key="icon" rel="icon" sizes="192x192" href="/static/touch-icon.png" />
            <link key="apple_touch_icon" rel="apple-touch-icon" href="/static/touch-icon.png" />
            <link key="mask_icon" rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
            <link key="favicon" href={favicon} rel="icon" type="image/x-icon" />
            <link
                href="https://fonts.googleapis.com/css?family=Lato|Merriweather"
                rel="stylesheet"
            />
            <meta key="og_url" property="og:url" content={tags.url || defaultOGURL} />
            <meta key="og_title" property="og:title" content={tags.title || ""} />
            <meta
                key="og_description"
                property="og:description"
                content={tags.description || defaultDescription}
            />
            <meta key="twitter_site" name="twitter:site" content={tags.url || defaultOGURL} />
            <meta key="twitter_card" name="twitter:card" content="summary_large_image" />
            <meta
                key="twitter_image"
                name="twitter:image"
                content={tags.ogImage || defaultOGImage}
            />
            <meta key="og_image" property="og:image" content={tags.ogImage || defaultOGImage} />
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

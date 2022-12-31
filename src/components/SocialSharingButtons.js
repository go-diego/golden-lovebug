import React from "react";
import styled from "styled-components";
import {
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon
} from "react-share";

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default function SocialSharingButtons({ link, label }) {
  return (
    <Row>
      <TwitterShareButton title={label} url={link}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton quote={label} url={link}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton title={label} url={link}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <EmailShareButton url={link} subject={label}>
        <EmailIcon size={32} round />
      </EmailShareButton>
    </Row>
  );
}

import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Footer() {
  return (
    <StyledFooter className="footer is-size-7 has-text-light has-background-dark">
      <p>
        Made with <span>❤️</span> in the Coachella Valley
      </p>
      <small>
        By{" "}
        <a
          className="has-text-weight-bold has-text-white"
          href="https://www.godiego.me"
          target="_blank"
          rel="noopener">
          Diego Bernal
        </a>
      </small>
    </StyledFooter>
  );
}

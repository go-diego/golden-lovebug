import CallOut from "./CallOut.js";
import styled from "styled-components";

const StyledFooter = styled.footer`
    display: flex;
    justify-content: space-between;
`;

export default function Footer() {
    return <StyledFooter className="footer has-background-dark" />;
}

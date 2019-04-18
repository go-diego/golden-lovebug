import styled from "styled-components";

const CallOutAnchor = styled.a`
    font-size: 12px;
    color: ${props => (props.mode === "dark" ? "#4a4a4a" : "#f5f5f5")};
    &:after {
        content: " \u2665";
        font-size: 16px;
        color: #e00;
    }
    &:hover {
        color: ${props => (props.mode === "dark" ? "#4a4a4a" : "#f5f5f5")};
    }
`;

export default function CallOut(props) {
    const {mode} = props;

    return (
        <CallOutAnchor rel="noopener" target="_blank" mode={mode} href="https://brightsidetech.io">
            By Brightside Tech with
        </CallOutAnchor>
    );
}

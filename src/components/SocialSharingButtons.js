import styled from "styled-components";
import {Twitter, Facebook, Linkedin, Mail} from "react-social-sharing";

const Row = styled.div`
    display: flex;
    a {
        margin-left: 0;
    }
`;

export default function SocialSharingButtons({link, label}) {
    const styles = {
        padding: "0.25rem 0.5rem"
    };
    return (
        <Row>
            <Twitter style={styles} solid small message={label} link={link} />
            <Facebook style={styles} solid small link={link} />
            <Linkedin style={styles} solid small message={label} link={link} />
            <Mail style={styles} solid small subject={label} link={link} />
        </Row>
    );
}

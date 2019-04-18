import App, {Container} from "next/app";
import {Router} from "../server/routes";
import withGoogleAnalytics from "next-ga";
import site_metadata from "../_data/_metadata.json";
import css from "../styles/site.scss";

class Site extends App {
    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return {pageProps};
    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}

export default withGoogleAnalytics(site_metadata.ga, Router)(Site);

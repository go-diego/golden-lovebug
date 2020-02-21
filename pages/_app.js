import App from "next/app";
import Router from "next/router";
import withGoogleAnalytics from "next-ga";
import site_metadata from "../_data/_metadata.json";
import "@fortawesome/fontawesome-free/js/all.min.js";
import css from "../styles/site.scss";

class Site extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default withGoogleAnalytics(site_metadata.ga, Router)(Site);

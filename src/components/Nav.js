import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import styled from "styled-components";

const Img = styled.img`
  height: 100%;
  max-height: 100% !important;
`;

const Navbar = styled.nav`
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
`;

class Nav extends React.Component {
  state = {
    isNavbarOpen: false
  };

  handleToggleNavbar = () => {
    const { isNavbarOpen } = this.state;
    this.setState({ isNavbarOpen: !isNavbarOpen });
  };

  isLinkActive = (href) => {
    const { router } = this.props;
    if (router.asPath === "/" && href === "/") return true;
    return router.asPath.includes(href);
  };

  render() {
    const { email, facebook_url, twitter_url, linkedin_url, instagram_url } =
      this.props;
    const { isNavbarOpen } = this.state;
    return (
      <Navbar
        className="navbar is-light is-fixed-top"
        role="navigation"
        aria-label="main navigation">
        <div className="navbar-brand">
          {this.props.router.pathname !== "/" && (
            <Link legacyBehavior href="/">
              <a className="navbar-item" aria-label="home-link">
                <figure className="image is-32x32">
                  <Img
                    alt="AJ"
                    className="is-rounded is-object-fit-cover"
                    src="/uploads/profile.jpg"
                  />
                </figure>
              </a>
            </Link>
          )}
          <a
            aria-label="social-media-link"
            rel="noopener"
            target="_blank"
            href={`${instagram_url}`}
            className="navbar-item animated bounceIn">
            <i className="fab fa-instagram" />
          </a>
          <a
            aria-label="social-media-link"
            rel="noopener"
            target="_blank"
            href={`${facebook_url}`}
            className="navbar-item animated bounceIn delay-half-s">
            <i className="fab fa-facebook-f" />
          </a>
          <a
            aria-label="social-media-link"
            rel="noopener"
            target="_blank"
            href={`${twitter_url}`}
            className="navbar-item animated bounceIn delay-half-1s">
            <i className="fab fa-twitter" />
          </a>
          <a
            aria-label="social-media-link"
            rel="noopener"
            target="_blank"
            href={`${linkedin_url}`}
            className="navbar-item animated bounceIn delay-1-half-s">
            <i className="fab fa-linkedin-in" />
          </a>
          <a
            aria-label="email-link"
            href={`mailto:${email}`}
            className="navbar-item animated bounceIn delay-2s">
            <i className="fas fa-envelope" />
          </a>
          <a
            onClick={this.handleToggleNavbar}
            role="button"
            className={`navbar-burger burger ${
              isNavbarOpen ? "is-active" : ""
            }`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarItemsWrapper">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div
          id="navbarItemsWrapper"
          className={`navbar-menu ${isNavbarOpen ? "is-active" : ""}`}>
          <div className="navbar-start" />
          <div className="navbar-end">
            <Link legacyBehavior href="/publications">
              <a
                aria-label="navbar-link"
                className={`is-family-primary navbar-item${
                  this.isLinkActive("/publications") ? " is-active" : ""
                }`}>
                Publications
              </a>
            </Link>
            <Link legacyBehavior href="/overthink-a-blog">
              <a
                aria-label="navbar-link"
                className={`is-family-primary navbar-item${
                  this.isLinkActive("/overthink-a-blog") ? " is-active" : ""
                }`}>
                Overthink: A Blog
              </a>
            </Link>
            <Link legacyBehavior href="/the-bookest">
              <a
                aria-label="navbar-link"
                className={`is-family-primary navbar-item${
                  this.isLinkActive("/the-bookest") ? " is-active" : ""
                }`}>
                The Bookest
              </a>
            </Link>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default withRouter(Nav);

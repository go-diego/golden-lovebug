import {Link} from "../server/routes";
import {withRouter} from "next/router";
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
        const {isNavbarOpen} = this.state;
        this.setState({isNavbarOpen: !isNavbarOpen});
    };

    render() {
        const {email, facebook_url, twitter_url, instagram_url} = this.props;
        const {isNavbarOpen} = this.state;
        const {router} = this.props;
        return (
            <Navbar
                className="navbar is-light is-fixed-top"
                role="navigation"
                aria-label="main navigation">
                <div className="navbar-brand">
                    <Link href="/">
                        <a className="navbar-item">
                            <figure className="image is-32x32">
                                <Img
                                    className="is-rounded is-object-fit-cover"
                                    src="/static/uploads/profile.jpg"
                                />
                            </figure>
                        </a>
                    </Link>
                    <a
                        rel="noopener"
                        target="_blank"
                        href={`${facebook_url}`}
                        className="navbar-item animated bounceIn">
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a
                        rel="noopener"
                        target="_blank"
                        href={`${twitter_url}`}
                        className="navbar-item animated bounceIn delay-half-s">
                        <i className="fab fa-twitter" />
                    </a>
                    <a
                        rel="noopener"
                        target="_blank"
                        href={`${instagram_url}`}
                        className="navbar-item animated bounceIn delay-1s">
                        <i className="fab fa-linkedin-in" />
                    </a>
                    <a
                        href={`mailto:${email}`}
                        className="navbar-item animated bounceIn delay-1-half-s">
                        <i className="fas fa-envelope" />
                    </a>
                    <a
                        onClick={this.handleToggleNavbar}
                        role="button"
                        className={`navbar-burger burger ${isNavbarOpen ? "is-active" : ""}`}
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
                        <a
                            href="/publications"
                            className={`is-family-primary navbar-item ${
                                router.pathname === "/publications" ? "is-active" : ""
                            }`}>
                            Publications
                        </a>
                        <Link prefetch route="blog">
                            <a
                                className={`is-family-primary navbar-item ${
                                    router.pathname === "/blog" ? "is-active" : ""
                                }`}>
                                Writing Behind the Scenes
                            </a>
                        </Link>
                    </div>
                </div>
            </Navbar>
        );
    }
}

export default withRouter(Nav);

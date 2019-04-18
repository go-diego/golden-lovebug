import {Link} from "../server/routes";

export default class HeroNavbar extends React.Component {
    state = {
        isNavbarOpen: false
    };

    handleToggleNavbar = () => {
        const {isNavbarOpen} = this.state;
        this.setState({isNavbarOpen: !isNavbarOpen});
    };

    render() {
        const {isNavbarOpen} = this.state;
        return (
            <header className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <Link route="index">
                            <a className="navbar-item has-text-weight-bold">Logo</a>
                        </Link>
                        <a
                            onClick={this.handleToggleNavbar}
                            role="button"
                            className={`navbar-burger burger ${isNavbarOpen ? "is-active" : ""}`}
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarMenuHero">
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                        </a>
                    </div>

                    <div
                        id="navbarMenuHero"
                        className={`navbar-menu ${isNavbarOpen ? "is-active" : ""}`}>
                        {/* <div className="navbar-start" /> */}
                        <div className="navbar-end">
                            <a href="/publications" className="is-family-primary navbar-item">
                                Publications
                            </a>
                            <Link prefetch route="blog">
                                <a className={"is-family-primary navbar-item"}>
                                    Writing Behind the Scenes
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

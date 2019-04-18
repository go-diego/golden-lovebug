import React from "react";
import Head from "../components/Head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default ({children, metadata}) => {
    return (
        <div className="root has-navbar-fixed-top">
            <Head />
            <header>
                <Nav {...metadata} />
            </header>
            <main className="main">{children}</main>
            <Footer />
        </div>
    );
};

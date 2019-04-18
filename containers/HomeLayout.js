import React from "react";
import Head from "../components/Head";

export default ({children}) => {
    return (
        <div className="root">
            <Head />
            <main className="main">{children}</main>
        </div>
    );
};

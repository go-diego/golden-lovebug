import React from "react";
import Head from "../components/Head";
import Nav from "../components/Nav";

export default ({ children }) => {
  return (
    <>
      <Head />
      <header>
        <Nav />
      </header>
      <main className="main">{children}</main>
    </>
  );
};

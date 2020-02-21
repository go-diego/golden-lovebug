import Head from "../components/Head";
import Nav from "../components/Nav";

export default ({ children }) => {
  return (
    <div className="root">
      <Head />
      <header>
        <Nav />
      </header>
      <main className="main">{children}</main>
    </div>
  );
};

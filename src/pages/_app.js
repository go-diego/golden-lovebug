// import "@fortawesome/fontawesome-free/js/all.min.js";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;
import Script from "next/script";
import { ThemeProvider } from "styled-components";
import { Lato, Merriweather } from "@next/font/google";
import "styles/site.scss";
import "animate.css/animate.min.css";
import "react-loading-skeleton/dist/skeleton.css";

const lato = Lato({
  weight: ["400"],
  variable: "--font-lato",
  subsets: ["latin"]
});

const merriweather = Merriweather({
  weight: ["400"],
  variable: "--font-merriweather",
  subsets: ["latin"]
});

const theme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3"
  }
};

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-lato: ${lato.style.fontFamily};
          --font-merriweather: ${merriweather.style.fontFamily};
        }
        body,
        html {
          font-family: var(--font-merriweather);
        }
      `}</style>
      <Script
        strategy="lazyOnload"
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      />
      <ThemeProvider theme={theme}>
        {/* <GlobalStyle /> */}
        <div className={`root ${merriweather.className} ${lato.className}`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
}

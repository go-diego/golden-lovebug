import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import { Lato, Merriweather } from "@next/font/google";
import * as gtag from "../lib/gtag";
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
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
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
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
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

import Document, {Head, Main, NextScript} from "next/document";
import {ServerStyleSheet} from "styled-components";

export default class MyDocument extends Document {
    static getInitialProps({renderPage}) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();
        return {...page, styleTags};
    }

    render() {
        return (
            <html lang="en">
                <Head>{this.props.styleTags}</Head>
                <body>
                    <Main />
                    <NextScript />
                    <script
                        key="fontawesome"
                        defer
                        src="https://use.fontawesome.com/releases/v5.6.3/js/all.js"
                        integrity="sha384-EIHISlAOj4zgYieurP0SdoiBYfGJKkgWedPHH4jCzpCXLmzVsw1ouK59MuUtP4a1"
                        crossOrigin="anonymous"
                    />
                </body>
            </html>
        );
    }
}

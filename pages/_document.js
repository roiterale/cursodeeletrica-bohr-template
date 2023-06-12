import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const lang = this.props.__NEXT_DATA__.props.pageProps?.post?.lang

    return (
      <Html lang={lang ? lang : "en-US"}>
        <Head>
          <meta charSet="utf-8" />
          <meta content="Zeno Rocha" name="author" />
          <meta property="og:type" content="website" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta name="theme-color" content="#08070b" />

          <link
            rel="icon"
            href="/favicon.svg"
            sizes="any"
            type="image/svg+xml"
          />
        </Head>
        <Main />
        <NextScript />
      </Html>
    )
  }
}

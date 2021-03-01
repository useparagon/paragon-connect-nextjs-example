import Document, { Html, Head, Main, NextScript } from "next/document";

class RootDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="https://cdn.useparagon.com/latest/sdk/index.js" />
        </body>
      </Html>
    );
  }
}

export default RootDocument;

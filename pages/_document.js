import Document, { Html, Head, Main, NextScript } from "next/document";

class RootDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>TaskLab</title>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            src="https://cdn.useparagon.com/latest/sdk/index.js"
          ></script>
        </body>
      </Html>
    );
  }
}

export default RootDocument;

import App from "next/app";
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const authenticatedUser = appContext.ctx.req?.user;
  return { ...appProps, user: authenticatedUser };
};

export default MyApp;

import App from "next/app";
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps, user }) {
  // Pass the Paragon User Token as a prop to each page, from the authenticated
  // user object, if available
  return (
    <Component
      paragonUserToken={user?.paragonUserToken}
      user={user}
      {...pageProps}
    />
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  if (!appContext.ctx.req) {
    return appProps;
  }

  const authenticatedUser = appContext.ctx.req?.user;
  if (authenticatedUser) {
    return {
      ...appProps,
      user: authenticatedUser,
    };
  }
  return appProps;
};

export default MyApp;

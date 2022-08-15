import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserProvider>
          <div>
            <Head>
              <title>Slack-Clone</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <link rel="icon" href="/slack.svg" />
            </Head>
          </div>
          <Component {...pageProps} />
        </UserProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;

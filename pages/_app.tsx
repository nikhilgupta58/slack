import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0';
import { Provider } from 'react-redux'
import { store } from "../src/store"
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp

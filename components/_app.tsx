import "../styles/tailwind.css";
import type { AppProps as NextAppProps } from "next/app";
import type { PageProps } from "../types/PageProps";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { AuthProvider } from "../services/auth-service";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalEntryPoint } from "../components/GlobalEntrypoint";
import { RoutingProvider } from "../services/routing-service";
import { useState } from "react";
import { ErrorBoundary } from "../components/error";

// Custom AppProps for our custom page props.
type AppProps = {
  pageProps: PageProps;
} & Omit<NextAppProps<PageProps>, "pageProps">;

function App({ Component, pageProps }: AppProps): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {/* TODO get from getServersideProps or middleware? */}
        <AuthProvider userInitial={null}>
          <RoutingProvider>
            <GlobalEntryPoint>
              <Head>
                <title>Chromatography Control</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>

              <div className="flex h-screen min-h-screen flex-col bg-gradient-to-br from-purple-100 via-indigo-50 to-pink-50 font-sans font-light text-blue-800 selection:bg-indigo-400 selection:text-white">
                <Header />

                <div className="flex-grow overflow-y-auto">
                  <main className="h-full">
                    {/* boundary to catch errors where we can still show some UI (like the header and footer) */}
                    <ErrorBoundary>
                      <Component {...pageProps} />
                    </ErrorBoundary>
                  </main>
                </div>

                <Footer />
              </div>
            </GlobalEntryPoint>
          </RoutingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

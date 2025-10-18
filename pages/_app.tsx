import { SessionProvider } from "next-auth/react";
import "../styles/globals.scss";
import { Layout } from "@/components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;

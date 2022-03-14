import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import '@/styles/globals.css';

NProgress.configure({
  minimum: 0.8,
  easing: 'ease',
  speed: 800,
  showSpinner: true,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
}

export default MyApp;

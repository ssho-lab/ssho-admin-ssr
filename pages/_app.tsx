import '../styles/globals.css';
import '../styles/auth/auth.css';
import NProgress from 'nprogress';
import Router from 'next/router';
import "nprogress/nprogress.css";

NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 800,
    showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp

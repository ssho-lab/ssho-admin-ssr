import '../styles/globals.css'
import '../styles/auth/auth.css'
import NProgress from 'nprogress'
import Router from 'next/router'
import 'nprogress/nprogress.css'
import Head from 'next/head'

NProgress.configure({
	minimum: 0.3,
	easing: 'ease',
	speed: 800,
	showSpinner: false
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


function MyApp({ Component, pageProps }) {
	return (
		<Component {...pageProps}>
        <Head>
            <link rel="shortcut icon"
                  href="https://ssho-static.s3.ap-northeast-2.amazonaws.com/fashion-test/logo.ico"/>
            <title>스쇼 어드민</title>
            <meta name="description" content="스와이프로 나만의 패션 성향 알아보기"/>
        </Head>
		</Component>
	)
}

export default MyApp

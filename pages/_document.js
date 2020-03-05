import Document,{ Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document{
    render(){
        return(
            <html lang="en">
                <Head>
                    <script data-ad-client="ca-pub-3042558291176391" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
                    <link rel="manifest" href="/site.webmanifest" />

                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />

                    <meta name="google-site-verification" content="7pFh19cAGGjVlxg9320dLVxfSW9nWgxbcctb180KCWY" />
                    
                    <link
                        rel = "stylesheet" 
                        href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
                        integrity = "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" 
                        crossOrigin = "anonymous"
                    />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
          </html>
        )
    }
}
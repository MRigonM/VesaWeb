import type { AppProps } from "next/app";
import Head from "next/head";
import MainLayout from "@/components/MainLayout";
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  let title = pageProps.title ? pageProps.title : "My Platform";
  let description = pageProps.description
  ? pageProps.description
  :"My Platform Description";
  let image = pageProps.image ? pageProps.image : "https://my-domain/meta.svg";
  let url = pageProps.url ?  pageProps.url : "https://my-domain.com";

  return(

  <>
    <Head>

      <title>{Component.displayName}</title>
      <meta
        name="viewpoer"
        content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scale=no" />

      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-request" />

      <meta property="og:type" content="article" />
      <meta property="fb:app_id" content="{fb-id}" />

      {/*SEO for WEB*/}
      <meta name="title" content={title}/>
      <meta name="description" content={description}/>
      <meta name="url" content={url}/>
      <meta name="image" content={image}/>
      <meta name="image:secure" content={image}/>
      {/*SEO for Facebook*/}
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:url" content={url}/>
      <meta property="og:image" content={image}/>
      <meta property="og:image:secure" content={image}/>
       {/*SEO for Twitter*/}
       <meta property="twitter:title" content={title}/>
      <meta property="twitter:description" content={description}/>
      <meta property="twitter:url" content={url}/>
      <meta property="twitter:image" content={image}/>
      <meta property="twitter:image:secure" content={image}/>
    </Head>
    <MainLayout name={Component.displayName}>
    <Component {...pageProps} />
    </MainLayout>
  </>
);
}





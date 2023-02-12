import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<any>(null);

  useEffect(() => {
    import("@line/liff").then((liff: any) => {
      liff
        .init({ liffId: process.env.NEXT_APP_LIFF_ID })
        .then(() => {
          setLiffObject(liff);
          if (liff.isLoggedIn()) {
            // ログインの確認を取れたら
          }
        })
        .catch((err: any) => {
          console.error({ err });
        });
    });
  }, []);

  pageProps.liff = liffObject;
  return <Component {...pageProps} />;
}

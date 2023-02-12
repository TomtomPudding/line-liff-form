import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import liff, { Liff } from "@line/liff";

export default function App({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    liff
      .init({ liffId: process.env.NEXT_APP_LIFF_ID ?? "" })
      .then(() => {
        setLiffObject(liff);
        if (liff.isLoggedIn()) {
          // ログインの確認を取れたら
        }
      })
      .catch((err: any) => {
        console.error({ err });
      });
  }, []);

  useEffect(() => {
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
        const context = liff.getContext();
        const liffToken = liff.getAccessToken();
        setUid(context?.userId ?? "");
        setAccessToken(liffToken);
      }
    });
  }, []);

  pageProps.liff = liffObject;
  return (
    <>
      <div>
        <h3>Login Stutus</h3>
        <p>ユーザID {uid}</p>
        <p>アクセストークン {accessToken}</p>
      </div>
      <Component {...pageProps} />
    </>
  );
}

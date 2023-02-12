import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<any | null>(null);
  const [uid, setUid] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    import("@line/liff").then((liff: any) => {
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
    });
  }, []);

  useEffect(() => {
    import("@line/liff").then((liff: any) => {
      liff.ready.then(() => {
        if (liff.isLoggedIn()) {
          const context = liff.getContext();
          const liffToken = liff.getAccessToken();
          setUid(context?.userId ?? "");
          setAccessToken(liffToken ?? "");
        }
      });
    });
  }, []);

  return (
    <>
      <div>
        <h3>ユーザ情報確認</h3>
        <p>ユーザID {uid}</p>
        <p>アクセストークン {accessToken}</p>
      </div>
      <Component {...pageProps} />
    </>
  );
}

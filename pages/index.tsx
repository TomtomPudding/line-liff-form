import Button from "@mui/material/Button";
import Head from "next/head";
import axios from "axios";
import * as qs from "qs";
import { CookieTokenList, MyCookie } from "../common/cookies";
import Cookies from "universal-cookie";

export default function Home() {
  const cookieUserId = new MyCookie(
    CookieTokenList.BACKEND_USER_ID,
    new Cookies()
  );
  const cookieToken = new MyCookie(
    CookieTokenList.BACKEND_ACCESS_TOKEN,
    new Cookies()
  );
  return (
    <>
      <div>
        <Head>
          <title>LIFF Starter</title>
        </Head>
        <div className="home">
          <h1 className="home__title">
            Welcome to <br />
            <a
              className="home__title__link"
              href="https://developers.line.biz/en/docs/liff/overview/"
            >
              LIFF Starter!
            </a>
          </h1>
          <Button
            variant="contained"
            onClick={(e) => {
              const Axios = axios.create({
                baseURL: "https://api.line.me",
                timeout: 50_000,
                headers: {
                  Authorization:
                    "Bearer " +
                    (process.env.NEXT_APP_LIFF_CHANNEL_ACCESS_TOKEN ?? ""),
                },
                paramsSerializer: {
                  serialize: (params) =>
                    qs.stringify(params, { arrayFormat: "repeat" }),
                },
              });
              Axios.post<any>("/v2/bot/message/push", {
                to: cookieUserId.getToken() ?? "",
                messages: [
                  {
                    type: "text",
                    text: "Hello, world1",
                  },
                  {
                    type: "text",
                    text: "Hello, world2",
                  },
                ],
              });
            }}
          >
            BotTestMessage
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              import("@line/liff").then((liff: any) => {
                liff
                  .sendMessages([
                    {
                      type: "text",
                      text: "Hello, World!",
                    },
                  ])
                  .then(() => {
                    console.log("message sent");
                  })
                  .catch((err: any) => {
                    console.log("error", err);
                  });
              });
            }}
          >
            UserTestMessage
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              import("@line/liff").then((liff: any) => {
                liff.closeWindow();
              });
            }}
          >
            CloseLiff
          </Button>
        </div>
      </div>
    </>
  );
}

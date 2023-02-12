import Button from "@mui/material/Button";
import Head from "next/head";
import axios from "axios";
import * as qs from "qs";
import { CookieTokenList, MyCookie } from "../common/cookies";
import Cookies from "universal-cookie";
import { useState } from "react";

export default function Home() {
  const cookieUserId = new MyCookie(
    CookieTokenList.BACKEND_USER_ID,
    new Cookies()
  );
  const cookieToken = new MyCookie(
    CookieTokenList.BACKEND_ACCESS_TOKEN,
    new Cookies()
  );
  const [log1, setLog1] = useState<string | null>(null);
  const [log2, setLog2] = useState<string | null>(null);
  const [log3, setLog3] = useState<string | null>(null);

  const handleBotUser = async () => {
    setLog1("test1");
    const Axios = axios.create({
      baseURL: "https://api.line.me",
      timeout: 50_000,
      headers: {
        Authorization:
          "Bearer " + (process.env.NEXT_APP_LIFF_CHANNEL_ACCESS_TOKEN ?? ""),
      },
      paramsSerializer: {
        serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
      },
    });

    await Axios.post<any>(
      "/v2/bot/message/push",
      {
        // to: cookieUserId.getToken() ?? "",
        to: "U72c0c2fe56e164cbaa9eb84b0ceadd63",
        messages: [
          {
            type: "text",
            text: "Hello, world1",
          },
        ],
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => setLog2(error.toString()));

    setLog3("test3");
  };

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
          <div>
            <h3>logs</h3>
            <p>log1 {log1}</p>
            <p>log2 {log2}</p>
            <p>log3 {log3}</p>
          </div>
          <Button variant="contained" onClick={handleBotUser}>
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

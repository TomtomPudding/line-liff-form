import Button from "@mui/material/Button";
import Head from "next/head";
import axios from "axios";
import { useState } from "react";

export default function Home() {

  const handleBotUser = async () => {
    await axios.post("/api/message", {});
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

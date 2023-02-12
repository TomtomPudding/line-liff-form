import Button from "@mui/material/Button";
import Head from "next/head";

export default function Home() {
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
            TestMessage
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

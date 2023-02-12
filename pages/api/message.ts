import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as qs from "qs";

type TestRes = {
  title: string;
  content: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<TestRes>) => {
  const userId = req.cookies.N_USER_ID ?? "";
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

  const axiosReq =     {
    to: userId,
    messages: [
      {
        type: "text",
        text: "Hello, world1",
      },
      {
        type: "text",
        text: "Hello, world1",
      }
    ]
  }
  await Axios.post<any>(
    "/v2/bot/message/push",
    axiosReq,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const result: TestRes = {
    title: "test title",
    content: "test content",
  };
  res.status(200).send(result);
};

export default handler;

import type { NextApiRequest, NextApiResponse } from "next";
import { requestMethodEnum } from "@/enums/requestMethodEnum";
import { get } from "lodash";
import axios from "@/libs/axios";
import { clearCookie, setCookie } from "@/utils/cookiesUtil";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/cookies";
import { clear } from "console";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const action = get(req.query, "nextAuth[0]");
  if (req.method === requestMethodEnum.HTTP_METHOD_POST && action === "signin") {
    return signIn(req, res);
  } else if (req.method === requestMethodEnum.HTTP_METHOD_GET && action === "signout") {
    return signOut(req, res);
  } else if (req.method === requestMethodEnum.HTTP_METHOD_GET && action === "session") {
    return getSession(req, res);
  } else {
    return res.status(405).end(`Error: HTTP ${req.method} is not supported for ${req.url}`);
  }
}

 const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.post("/auth/signin", req.body);

    // set token to cookie
    const { token, refreshToken } = response.data;
    setCookie(res, [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY], [token, refreshToken], {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
    });
    
    res.json(response.data);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}

function signOut(req: NextApiRequest, res: NextApiResponse) {
  clearCookie(res, [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  res.json({ success: true });
}

function getSession(req: NextApiRequest, res: NextApiResponse) {
  return res.end(`GetSession`);
}

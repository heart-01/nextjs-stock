import type { NextApiRequest, NextApiResponse } from "next";
import { requestMethodEnum } from "@/enums/requestMethodEnum";
import { get } from "lodash";
import axios from "@/libs/axios";
import cookie from "cookie";
import { clearCookie, setCookie } from "@/utils/cookiesUtil";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/cookies";

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
      httpOnly: true, // Specifies that cookies must be set only from the server side.
      secure: process.env.NODE_ENV !== "development", // Specifies for the browser to only send the cookie over HTTPS.
      sameSite: "strict", // Not allow browsers to send cookies across websites.
      maxAge: 7 * 24 * 60 * 60,  // expires in 7 days
      path: "/",  // Store the cookie using for all routes
    });

    res.json(response.data);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

const signOut = (req: NextApiRequest, res: NextApiResponse) => {
  clearCookie(res, [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  res.json({ success: true });
};

const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const accessToken = cookies[ACCESS_TOKEN_KEY];
    if (accessToken) {
      const response = await axios.get("/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      res.json(response.data);
    } else {
      throw new Error("no access token");
    }
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

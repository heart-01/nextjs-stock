import { serialize, CookieSerializeOptions } from "cookie";
import { isArray } from "lodash";
import { NextApiResponse } from "next";

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (res: NextApiResponse, name: string | Array<string>, value: string | Array<string>, options: CookieSerializeOptions = {}) => {
  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge = options.maxAge / 1000;
  }

  const nameCookie = isArray(name) ? name : [name];
  const valueCookie = isArray(value) ? value : [value];

  res.setHeader(
    "Set-Cookie",
    nameCookie.map((name, i) => serialize(name, valueCookie[i], options))
  );
};

export const clearCookie = (res: NextApiResponse, name: string, path = "/") => {
  res.setHeader("Set-Cookie", serialize(name, "", { maxAge: 0, path }));
};

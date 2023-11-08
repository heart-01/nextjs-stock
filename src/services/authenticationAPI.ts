import axios from "@/libs/axios";

export type signUpParams = { name: string; email: string; username: string; password: string };
export type signInParams = { username: string; password: string };
export type userInfo = {
  name: string;
  email: string;
  username: string;
  role: string;
  token: string;
  refreshToken: string;
};

interface IResponseSignIn {
  data: userInfo;
}

interface IResponseGetSession {
  data: userInfo;
}

const signUp = async (user: signUpParams): Promise<userInfo> => {
  const response = await axios.post("/auth/signup", user);
  return response.data;
};

const signIn = async (user: signInParams): Promise<IResponseSignIn> => {
  return await axios.post("/auth/signin", user, { baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API });
};

const signOut = async () => {
  return await axios.get("/auth/signout", { baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API });
};

export const getSession = async (): Promise<IResponseGetSession> => {
  return await axios.get("/auth/session", { baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API });
};

export const authService = {
  signUp,
  signIn,
  signOut,
  getSession,
};

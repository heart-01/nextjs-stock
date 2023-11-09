import { createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import axios from "src/libs/axios";
import { AxiosRequestConfig } from "axios";
import { signInParams, signUpParams, authService } from "@/services/authenticationAPI";

// config async actions
export const signUp = createAsyncThunk("user/signUp", async (user: signUpParams) => {
  return await authService.signUp(user);
});

export const signIn = createAsyncThunk("user/signIn", async (user: signInParams) => {
  const response = await authService.signIn(user);
  if (isEmpty(response.data.token)) {
    throw new Error("signin failed");
  }

  // set access token
  axios.interceptors.request.use((config?: AxiosRequestConfig | any) => {
    if (config && config.headers) {
      config.headers["Authorization"] = `Bearer ${response.data.token}`;
    }
    return config;
  });

  return response;
});

export const signOut = createAsyncThunk("user/signOut", async () => {
  await authService.signOut();
});

export const getSession = createAsyncThunk("user/fetchSession", async () => {
  const response = await authService.getSession();

  // set access token
  if (response) {
    axios.interceptors.request.use((config?: AxiosRequestConfig | any) => {
      if (config && config.headers) {
        config.headers["Authorization"] = `Bearer ${response.data.token}`;
      }
      return config;
    });
  }
  return response;
});

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { signInParams, signUpParams, userInfo, authService } from "@/services/authenticationAPI";
import axios from "src/libs/axios";
import { isEmpty } from "lodash";

interface IUserState {
  username?: string;
  user?: userInfo;
  error?: { code: string; message: string };
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

// config initial state
const initialState: IUserState = {
  username: undefined,
  user: undefined,
  error: undefined,
  isAuthenticated: false,
  isAuthenticating: true,
};

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
  axios.interceptors.request.use((config) => {
    if (config && config.headers) {
      config.headers["Authorization"] = `Bearer ${response.data.token}`;
    }
    return config;
  });

  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTestUser: (state: IUserState, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
    },
    clearUser: (state: IUserState, action) => {
      state.username = undefined;
      state.user = undefined;
      state.error = undefined;
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state: IUserState, action) => {
      state.username = action.payload.username;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        username: action.payload.username,
        role: action.payload.role,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
      state.error = undefined;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    });
    builder.addCase(signUp.rejected, (state: IUserState, action) => {
      state.username = undefined;
      state.user = undefined;
      state.error = { code: action.error.code || "500", message: action.error.message || "Internal Server Error" };
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    });
    builder.addCase(signIn.fulfilled, (state: IUserState, action) => {
      state.username = action.payload.data.username;
      state.user = {
        name: action.payload.data.name,
        email: action.payload.data.email,
        username: action.payload.data.username,
        role: action.payload.data.role,
        token: action.payload.data.token,
        refreshToken: action.payload.data.refreshToken,
      };
      state.error = undefined;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    });
    builder.addCase(signIn.rejected, (state: IUserState, action) => {
      state.username = undefined;
      state.user = undefined;
      state.error = { code: action.error.code || "500", message: action.error.message || "Internal Server Error" };
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    });
  },
});

// export common actions
export const { setTestUser, clearUser } = userSlice.actions;

// export common user selector
export const userSelector = (store: RootState) => store.user;
export const isAuthenticatedSelector = (store: RootState): boolean => store.user.isAuthenticated;
export const isAuthenticatingSelector = (store: RootState): boolean => store.user.isAuthenticating;

// export reducer
export default userSlice.reducer;

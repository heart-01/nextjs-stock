import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface IUserState {
  username: string;
  accessToken: string;
  error?: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user?: {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    image: string;
    token?: string;
  };
}

// config initial state
const initialState: IUserState = {
  username: "",
  accessToken: "",
  error: undefined,
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
};

// config async actions
export const signUp = createAsyncThunk("user/signup", async (user: { name: string; email: string; username: string; password: string }) => {
  const response = new Promise((res) => setTimeout(() => res({ data: user }), 3000));
  return await response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTestUser: (state: IUserState, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
    },
    clearUser: (state: IUserState, action) => {
      state.username = "";
      state.accessToken = "";
      state.error = undefined;
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state: IUserState, action: any) => {
      state.username = action.payload.data.username;
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

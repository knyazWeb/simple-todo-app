import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserAuth } from "../types/store.types";
import { RootState } from "../store";
import { authApi } from "../../services/AuthService";

const initialState: IUserAuth = {
  userName: null,
  isAuth: false,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserAuth>) => {
      state.userName = action.payload.userName;
      state.isAuth = true;
    },
    logout: (state) => {
      state.userName = null;
      state.isAuth = false;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.signUp.matchFulfilled, (_state, action) => {
      if (action.payload.idToken && action.payload.refreshToken) {
        localStorage.setItem("token", action.payload.idToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    }),
      builder.addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        if (action.payload.users && action.payload.users.length) {
          state.userName = action.payload.users[0].displayName;
          state.isAuth = true;
          state.userId = action.payload.users[0].localId;
        }
        console.log(action.payload.users[0].displayName);
      });
    builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (_state, action) => {
      if (action.payload.idToken && action.payload.refreshToken) {
        localStorage.setItem("token", action.payload.idToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });
  },
});

export default authSlice.reducer;

export const { login, logout, updateUserName } = authSlice.actions;

export const selectUser = createSelector(
  (state: RootState) => state.auth.userName,
  (state: RootState) => state.auth.isAuth,
  (state: RootState) => state.auth.userId,
  (userName, isAuth, userId) => ({ userName, isAuth, userId })
);

import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserAuth } from "../types/store.types";
import { RootState } from "../store";
import { authApi } from "../../services/AuthService";

const initialState: IUserAuth = {
  user: null,
  isAuth: false,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserAuth>) => {
      state.user = action.payload.user;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.signUp.matchFulfilled, (state, action) => {
      if (action.payload.idToken && action.payload.refreshToken) {
        localStorage.setItem("token", action.payload.idToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        
      }
    }),
    builder.addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
      if (action.payload.users && action.payload.users.length) {
        state.user = action.payload.users[0].displayName;
        state.isAuth = true;
        state.userId = action.payload.users[0].localId;
      }
    });
    builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
      if (action.payload.idToken && action.payload.refreshToken) {
        localStorage.setItem("token", action.payload.idToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });
  },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;



export const selectUser = createSelector(
  (state: RootState) => state.auth.user,
  (state: RootState) => state.auth.isAuth,
  (state: RootState) => state.auth.userId,
  (user, isAuth, userId) => ({user, isAuth, userId})
);

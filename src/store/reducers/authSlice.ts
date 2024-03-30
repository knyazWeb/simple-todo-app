import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserAuth } from "../types/store.types";
import { RootState } from "../store";
import { authApi } from "../../services/AuthService";

const initialState: IUserAuth = {
  user: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //TODO: Сбрасывает состояние при обновлении страницы
    login: (state, action: PayloadAction<IUserAuth>) => {
      state.user = action.payload.user;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.verifyToken.matchFulfilled, (state, action) => {
      if (action.payload.users.length){
        state.user = action.payload.users[0].displayName;
        state.isAuth = true;
      }
    });
  },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;

export const selectUser = createSelector(
  (state: RootState) => state.auth.user,
  (state: RootState) => state.auth.isAuth,
  (user, isAuth) => [user, isAuth]
);

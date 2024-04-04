import { configureStore } from "@reduxjs/toolkit";


import { tasksApi } from "../services/TasksService";
import { authApi } from "../services/AuthService";
import authSlice from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

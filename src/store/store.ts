import { configureStore } from "@reduxjs/toolkit";

import tasksSlice from "./reducers/tasksSlice";
import { tasksApi } from "../services/TasksService";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

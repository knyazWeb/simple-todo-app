import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITask } from '../store/types/store.types';




export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], void>({
      query: () => "/tasks",
    }),
  }),
});


export const { useGetTasksQuery } = tasksApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITask } from "../store/types/store.types";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], void>({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),
    addTask: builder.mutation<ITask, ITask>({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),
    removeTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    changeTask: builder.mutation<void, ITask>({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),

  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useChangeTaskMutation } = tasksApi;

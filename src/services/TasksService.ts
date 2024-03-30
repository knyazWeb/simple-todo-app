import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITask } from "../store/types/store.types";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-typescript-9f6f9-default-rtdb.europe-west1.firebasedatabase.app",
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], void>({
      query: () => "/tasks.json",
      providesTags: ["Task"],
      transformResponse: (response: { [key: string]: ITask }) => {
        return response ? Object.keys(response).map((key) => ({
              ...response[key],
              id: key,
            })) : [];
      },
    }),
    addTask: builder.mutation<ITask, ITask>({
      query: (newTask) => ({
        url: "/tasks.json",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),
    removeTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}.json`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    changeTask: builder.mutation<void, ITask>({
      query: (task) => ({
        url: `/tasks/${task.id}.json`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useChangeTaskMutation } = tasksApi;

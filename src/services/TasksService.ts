import { createApi } from "@reduxjs/toolkit/query/react";
import { ITask } from "../store/types/store.types";
import { baseQueryWithAuthReauth } from "./ApiService";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: baseQueryWithAuthReauth,
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<{ [key: string]: ITask }, string | null>({
      query: (userId) => {
        const token = localStorage.getItem("token");
        return {
          url: `tasks/${userId}.json?auth=${token}`,
          method: "GET",
        };
      },
      providesTags: ["Task"],
    }),
    addTask: builder.mutation<ITask, { newTask: ITask; userId: string }>({
      query: ({ newTask, userId }) => {
        const token = localStorage.getItem("token");

        return {
          url: `/tasks/${userId}.json?auth=${token}`,
          method: "POST",
          body: newTask,
        };
      },
      invalidatesTags: ["Task"],
    }),
    removeTask: builder.mutation<void, { userId: string | null; taskId: string }>({
      query: ({ userId, taskId }) => {
        const token = localStorage.getItem("token");
        return {
          url: `/tasks/${userId}/${taskId}.json?auth=${token}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Task"],
    }),
    changeTask: builder.mutation<void, { userId: string | null; taskId: string; task: ITask }>({
      query: ({ userId, taskId, task }) => {
        const token = localStorage.getItem("token");
        return {
          url: `/tasks/${userId}/${taskId}.json?auth=${token}`,
          method: "PATCH",
          body: task,
        };
      },
      invalidatesTags: ["Task"],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useChangeTaskMutation } = tasksApi;

import { BaseQueryFn, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Navigate, redirect } from "react-router-dom";

const API_key = import.meta.env.VITE_API_KEY;

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const tokenBaseQuery = fetchBaseQuery({
  baseUrl: "https://securetoken.googleapis.com/v1/token?",
  method: "POST",
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const refreshResponse = await tokenBaseQuery(
        {
          url: "",
          params: {
            key: API_key,
          },
          body: {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          },
        },
        api,
        extraOptions
      );
      if (refreshResponse.data) {
        const { id_token, refresh_token } = refreshResponse.data as any;
        localStorage.setItem("token", id_token);
        localStorage.setItem("refreshToken", refresh_token);
        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        redirect("/");
      }
    }
  }
  return result;
};

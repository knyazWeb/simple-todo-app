import { BaseQueryFn, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { redirect } from "react-router-dom";

const API_key = import.meta.env.VITE_API_KEY;

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://identitytoolkit.googleapis.com/v1",
  method: "POST",
});

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "https://todo-typescript-9f6f9-default-rtdb.europe-west1.firebasedatabase.app/",
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 400 && (result.error.data as any).error.message === "INVALID_ID_TOKEN") {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const refreshResponse = await baseQuery(
        {
          url: "https://securetoken.googleapis.com/v1/token?",
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
        if (typeof args === "object" && "body" in args && "idToken" in args.body) {
          args.body.idToken = id_token;
        }
        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
         redirect("/registration");
      }
    }
  }
  return result;
};

export const baseQueryWithAuthReauth: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);
  if (result.error && (result.error.status === 400 || result.error.status === 401)) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const refreshResponse = await baseQuery(
        {
          url: "https://securetoken.googleapis.com/v1/token?",
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
        if (typeof args === "object" && "url" in args) {
          args.url = args.url.replace(/auth=[^&]*/, `auth=${id_token}`);
        }
        result = await baseQueryWithAuth(args, api, extraOptions);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
         redirect("/registration");
      }
    }
  }
  return result;
};

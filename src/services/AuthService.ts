import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./ApiService";

const API_key = import.meta.env.VITE_API_KEY;

type UserResponseType = {
  users: {
    email: string;
    displayName: string;
    localId: string;
  }[];
};

interface signUpCredentials {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
}

interface signUpCredentialsWithName {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  displayName: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signUp: builder.mutation<signUpCredentials, { email: string; password: string }>({
      query: (credentials) => ({
        url: `/accounts:signUp?key=${API_key}`,
        method: "POST",
        body: {
          email: credentials.email,
          password: credentials.password,
          returnSecureToken: true,
        },
      }),
    }),
    signIn: builder.mutation<signUpCredentialsWithName, { email: string; password: string }>({
      query: (credentials) => ({
        url: `/accounts:signInWithPassword?key=${API_key}`,
        method: "POST",
        body: {
          email: credentials.email,
          password: credentials.password,
          returnSecureToken: true,
        },
      }),
    }),
    getUser: builder.query< UserResponseType , string>({
      query: (token) => ({
        url: `/accounts:lookup?key=${API_key}`,
        method: "POST",
        body: {
          idToken: token,
        },
      }),
      providesTags: ["Auth"],
    }),
    updateName: builder.mutation<signUpCredentialsWithName, { name: string; idToken: string }>({
      query: ({ name, idToken }) => ({
        url: `/accounts:update?key=${API_key}`,
        method: "POST",
        body: {
          displayName: name,
          idToken: idToken,
          returnSecureToken: true,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useUpdateNameMutation, useGetUserQuery } = authApi;

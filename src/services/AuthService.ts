import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_key = import.meta.env.VITE_API_KEY;

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
  baseQuery: fetchBaseQuery({ baseUrl: "https://identitytoolkit.googleapis.com/v1" }),
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
    verifyToken: builder.query<{ users: any[] }, string>({
      query: (idToken) => ({
        url: `/accounts:lookup?key=${API_key}`,
        method: "POST",
        body: {
          idToken: idToken,
        },
      }),
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
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useUpdateNameMutation, useVerifyTokenQuery } = authApi;

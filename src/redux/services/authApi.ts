import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AuthCheckEmailData,
  AuthResetPasswordData,
  AuthSignInData,
  AuthSignUpData,
  AuthVerificationData
} from '../types/auth.type';
import { User } from '../types/user.type';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: 'include'
  }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data: AuthSignInData) => {
        return {
          url: 'auth/sign-in',
          method: 'POST',
          body: data
        };
      }
    }),
    signUp: builder.mutation({
      query: (data: AuthSignUpData) => {
        return {
          url: 'auth/sign-up',
          method: 'POST',
          body: data
        };
      }
    }),
    checkEmail: builder.mutation({
      query: (data: AuthCheckEmailData) => {
        return {
          url: 'auth/check-email',
          method: 'POST',
          body: data
        };
      }
    }),
    forgotPassword: builder.mutation({
      query: (data: AuthCheckEmailData) => {
        return {
          url: 'auth/forgot-password',
          method: 'POST',
          body: data
        };
      }
    }),
    resetPassword: builder.mutation({
      query: (data: AuthResetPasswordData) => {
        return {
          url: 'auth/reset-password',
          method: 'PATCH',
          body: data
        };
      }
    }),
    verifyAccount: builder.query({
      query: (data: AuthVerificationData) => {
        return {
          url: `auth/verification/${data.link}`
        };
      }
    }),
    updateActivationLink: builder.mutation<User, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `auth/activation/link/user/${id}`,
          method: 'PATCH'
        };
      }
    })
  })
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useCheckEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyAccountQuery,
  useUpdateActivationLinkMutation
} = authApi;

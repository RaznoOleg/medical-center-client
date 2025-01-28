import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './utils/refreshToken';
import { UpdateUserData, UserDataResponse } from '../types/user.type';
import { WatchType } from '../../components/common/types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        return {
          url: 'user'
        };
      }
    }),
    getUser: builder.query<UserDataResponse, null>({
      query: () => {
        return {
          url: 'user/profile/info'
        };
      },
      providesTags: ['user']
    }),
    getAllUsersBySpec: builder.query<
      UserDataResponse[],
      { specialization: WatchType }
    >({
      query: ({ specialization }) => {
        return {
          url: `user/${specialization}`
        };
      },
      providesTags: ['user']
    }),
    updateUser: builder.mutation<UserDataResponse, UpdateUserData>({
      query: (data: UpdateUserData) => {
        return {
          url: `user/update`,
          method: 'PATCH',
          body: data
        };
      },
      invalidatesTags: ['user']
    }),
    updateUserPhoto: builder.mutation<string, FormData>({
      query: (data) => {
        return {
          url: `user/update-photo`,
          method: 'PATCH',
          body: data
        };
      },
      invalidatesTags: ['user']
    })
  })
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetAllUsersBySpecQuery,
  useUpdateUserMutation,
  useUpdateUserPhotoMutation
} = userApi;

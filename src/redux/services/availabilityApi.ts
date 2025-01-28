import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './utils/refreshToken';
import {
  AvailabilityDataResponse,
  CreateAvailabilityData
} from '../types/availability.type';
import { WatchType } from '../../components/common/types';

export const availabilityApi = createApi({
  reducerPath: 'availabilityApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['availability'],
  endpoints: (builder) => ({
    getAllAvailabilitiesByUserIdAndDay: builder.query<
      AvailabilityDataResponse[],
      {
        userId: WatchType;
        selectedDay: WatchType;
      }
    >({
      query: ({ userId, selectedDay }) => {
        return {
          url: `availability/user/${userId}/day/${selectedDay}`
        };
      },
      providesTags: ['availability']
    }),
    createAvailability: builder.mutation<
      AvailabilityDataResponse,
      CreateAvailabilityData
    >({
      query: (data) => {
        return {
          url: `availability`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['availability']
    }),
    getAllAvailabilitiesByUserId: builder.query<
      AvailabilityDataResponse[],
      { userId?: number }
    >({
      query: ({ userId }) => {
        return {
          url: `availability/user/${userId}/all`
        };
      },
      providesTags: ['availability']
    }),
    deleteAvailability: builder.mutation<Promise<void>, { uuid?: string }>({
      query: ({ uuid }) => {
        return {
          url: `availability/${uuid}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['availability']
    })
  })
});

export const {
  useGetAllAvailabilitiesByUserIdAndDayQuery,
  useCreateAvailabilityMutation,
  useGetAllAvailabilitiesByUserIdQuery,
  useDeleteAvailabilityMutation
} = availabilityApi;

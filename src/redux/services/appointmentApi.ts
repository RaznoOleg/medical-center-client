import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './utils/refreshToken';
import {
  AppointmentDataResponse,
  CreateAppointmentData
} from '../types/appointment.type';

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['appointment'],
  endpoints: (builder) => ({
    createAppointment: builder.mutation<
      AppointmentDataResponse,
      CreateAppointmentData
    >({
      query: (data) => {
        return {
          url: `appointment`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['appointment']
    }),
    getAllAppointmentsByUserId: builder.query<
      AppointmentDataResponse[],
      { userId?: number }
    >({
      query: ({ userId }) => {
        return {
          url: `appointment/user/${userId}`
        };
      },
      providesTags: ['appointment']
    }),
    getAllTodayAppointmentsByUserId: builder.query<
      AppointmentDataResponse[],
      { userId?: number }
    >({
      query: ({ userId }) => {
        return {
          url: `appointment/today/user/${userId}`
        };
      },
      providesTags: ['appointment']
    }),
    getAllAppointmentsByPatientId: builder.query<
      AppointmentDataResponse[],
      { patientId?: number }
    >({
      query: ({ patientId }) => {
        return {
          url: `appointment/patient/${patientId}`
        };
      },
      providesTags: ['appointment']
    }),
    deleteAppointment: builder.mutation<Promise<void>, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `appointment/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['appointment']
    })
  })
});

export const {
  useCreateAppointmentMutation,
  useGetAllAppointmentsByUserIdQuery,
  useGetAllTodayAppointmentsByUserIdQuery,
  useGetAllAppointmentsByPatientIdQuery,
  useDeleteAppointmentMutation
} = appointmentApi;

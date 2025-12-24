import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './utils/refreshToken';
import {
  PatientVital,
  CreatePatientVitalData,
  UpdatePatientVitalData
} from '../types/vitals.type';

export const vitalsApi = createApi({
  reducerPath: 'vitalsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['vitals'],
  endpoints: (builder) => ({
    getAllVitals: builder.query<PatientVital[], void>({
      query: () => ({ url: 'vitals' }),
      providesTags: ['vitals']
    }),
    getVitalsByPatient: builder.query<PatientVital[], { patientId: number }>({
      query: ({ patientId }) => ({
        url: `vitals/patient/${patientId}`
      }),
      providesTags: ['vitals']
    }),
    getVitalById: builder.query<PatientVital, { id: number }>({
      query: ({ id }) => ({ url: `vitals/${id}` }),
      providesTags: ['vitals']
    }),
    createVital: builder.mutation<PatientVital, CreatePatientVitalData>({
      query: (data) => ({
        url: 'vitals',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['vitals']
    }),
    updateVital: builder.mutation<
      PatientVital,
      { id: number; vitalData: UpdatePatientVitalData }
    >({
      query: ({ id, vitalData }) => ({
        url: `vitals/${id}`,
        method: 'PATCH',
        body: vitalData
      }),
      invalidatesTags: ['vitals']
    }),
    deleteVital: builder.mutation<Promise<void>, { id: number }>({
      query: ({ id }) => ({
        url: `vitals/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['vitals']
    })
  })
});

export const {
  useGetAllVitalsQuery,
  useGetVitalsByPatientQuery,
  useGetVitalByIdQuery,
  useCreateVitalMutation,
  useUpdateVitalMutation,
  useDeleteVitalMutation
} = vitalsApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './utils/refreshToken';
import {
  Patient,
  PatientCheckEmailData,
  PatientDataResponse,
  UpdatePatientData
} from '../types/patient.type';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['patient'],
  endpoints: (builder) => ({
    getAllPatients: builder.query<PatientDataResponse[], void>({
      query: () => {
        return {
          url: 'patient'
        };
      },
      providesTags: ['patient']
    }),
    createPatient: builder.mutation<PatientDataResponse, Patient>({
      query: (data) => {
        return {
          url: `patient`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['patient']
    }),
    checkPatientEmail: builder.mutation({
      query: (data: PatientCheckEmailData) => {
        return {
          url: 'patient/check-email',
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['patient']
    }),
    getPatientById: builder.query<Patient, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `patient/${id}`
        };
      },
      providesTags: ['patient']
    }),
    updatePatient: builder.mutation<
      Patient,
      { id?: number; patientData: UpdatePatientData }
    >({
      query: ({ id, patientData }) => {
        return {
          url: `patient/${id}`,
          method: 'PATCH',
          body: patientData
        };
      },
      invalidatesTags: ['patient']
    })
  })
});

export const {
  useGetAllPatientsQuery,
  useCreatePatientMutation,
  useCheckPatientEmailMutation,
  useGetPatientByIdQuery,
  useUpdatePatientMutation
} = patientApi;

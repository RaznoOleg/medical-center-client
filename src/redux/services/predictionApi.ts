import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './utils/refreshToken';
import { PredictionDto, PredictionResponse } from '../types/prediction.type';

export const predictionApi = createApi({
  reducerPath: 'predictionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['prediction'],
  endpoints: (builder) => ({
    makePrediction: builder.mutation<PredictionResponse, PredictionDto>({
      query: (data) => ({
        url: 'predictions/predict',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['prediction']
    }),
    getPredictionByPatientId: builder.query<
      PredictionResponse[],
      { patientId: number }
    >({
      query: ({ patientId }) => ({
        url: `predictions/patient/${patientId}`,
        method: 'GET'
      }),
      providesTags: ['prediction']
    })
  })
});

export const { useMakePredictionMutation, useGetPredictionByPatientIdQuery } =
  predictionApi;

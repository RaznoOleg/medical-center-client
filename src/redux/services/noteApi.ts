import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './utils/refreshToken';
import { CreateNoteData, NoteDataResponse } from '../types/note.type';

export const noteApi = createApi({
  reducerPath: 'noteApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['note'],
  endpoints: (builder) => ({
    createNote: builder.mutation<
      NoteDataResponse,
      { note: CreateNoteData; files?: File[] }
    >({
      query: ({ note, files }) => {
        const noteData = new FormData();
        noteData.append('content', note.content);
        noteData.append('userId', JSON.stringify(note.userId));
        noteData.append('patientId', JSON.stringify(note.patientId));
        if (files) {
          files.forEach((file: File) => {
            noteData.append('files', file);
          });
        }
        return {
          url: '/note',
          method: 'POST',
          body: noteData
        };
      },
      invalidatesTags: ['note']
    }),
    getAllNotesByPatientId: builder.query<
      NoteDataResponse[],
      { patientId?: number }
    >({
      query: ({ patientId }) => {
        return {
          url: `note/patient/${patientId}`
        };
      },
      providesTags: ['note']
    }),
    downloadFile: builder.mutation<Promise<void>, { filename: string }>({
      query: ({ filename }) => {
        return {
          url: `note/file/${filename}`,
          method: 'GET'
        };
      },
      invalidatesTags: ['note']
    })
  })
});

export const {
  useCreateNoteMutation,
  useGetAllNotesByPatientIdQuery,
  useDownloadFileMutation
} = noteApi;

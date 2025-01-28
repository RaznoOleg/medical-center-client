import { NoteFile } from './file.type';
import { Patient } from './patient.type';
import { User } from './user.type';

export type CreateNoteData = {
  content: string;
  userId?: number;
  patientId?: number;
};

export type Note = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  patient: Patient;
  user: User;
  files: NoteFile[];
};

export type NoteDataResponse = Note;

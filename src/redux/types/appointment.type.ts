import { Patient } from './patient.type';
import { User } from './user.type';

export type CreateAppointmentData = {
  startTime: Date;
  endTime: Date;
  userId: number;
  patientId: number;
};

export type AppointmentDataResponse = {
  id: number;
  startTime: Date;
  endTime: Date;
  user: User;
  patient: Patient;
};

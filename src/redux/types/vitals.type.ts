export interface PatientVital {
  id: number;
  systolic: number;
  diastolic: number;
  glucose: number;
  pulse: number;
  measurementTime: string;
  patientId: number;
}

export interface CreatePatientVitalData {
  systolic: number;
  diastolic: number;
  glucose: number;
  pulse: number;
  patientId: number;
  measurementTime?: string;
}

export interface UpdatePatientVitalData {
  systolic?: number;
  diastolic?: number;
  glucose?: number;
  pulse?: number;
  measurementTime?: string;
}

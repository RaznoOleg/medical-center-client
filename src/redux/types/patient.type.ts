export type Patient = {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address?: string | null;
  birthDate?: string | null;
  city?: string | null;
  country?: string | null;
  gender?: string | null;
  overview?: string | null;
};

export type PatientDataResponse = Patient;

export type UpdatePatientData = Patient;

export interface PatientCheckEmailData {
  email: string;
}

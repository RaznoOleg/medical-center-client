export type FieldName =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phoneNumber'
  | 'password'
  | 'confirmPassword'
  | 'role'
  | 'address'
  | 'gender'
  | 'country'
  | 'city'
  | 'birthDate'
  | 'specialization'
  | 'doctor'
  | 'systolic'
  | 'diastolic'
  | 'glucose'
  | 'pulse'
  | 'measurementTime';

export type Option = {
  value: string | number;
  label: string | null;
};

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
  | 'doctor';

export type Option = {
  value: string | number;
  label: string | null;
};

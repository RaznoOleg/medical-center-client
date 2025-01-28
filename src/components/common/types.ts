export type AuthSignIn = {
  email: string;
  password: string;
};

export type AuthSignUpFirstStep = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthSignUpSecondStep = {
  phoneNumber: string;
  role: string;
  specialization: number;
  gender: string;
  country: string;
  city: string;
  birthDate: string;
  address: string;
};

export type AuthForgotPassword = {
  email: string;
};

export type AuthResetPassword = {
  password: string;
  confirmPassword: string;
};

export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  gender: string;
  birthDate: string;
  specialization: number;
};

export type Patient = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string | null;
  phoneNumber: string;
  country?: string | null;
  city?: string | null;
  birthDate?: string | null;
  address?: string | null;
  overview?: string | null;
  [key: string]: string | number | undefined | null;
};

export type BookAppointment = {
  specialization: string;
  doctor: string;
  date: string;
  time: string;
};

export type Help = {
  question: string;
  answer: string;
};

export type FormValues =
  | AuthSignIn
  | AuthSignUpFirstStep
  | AuthSignUpSecondStep
  | AuthForgotPassword
  | AuthResetPassword
  | Profile
  | Patient
  | BookAppointment;

export type WatchType = string | number | null | undefined;

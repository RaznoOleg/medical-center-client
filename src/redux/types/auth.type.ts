export type AuthSignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  phoneNumber?: string;
  role?: string;
  specialization?: number;
  gender?: string;
  country?: string;
  city?: string;
  birthDate?: string;
  photoUrl?: string;
  isVerified?: boolean;
  address?: string;
};

export type AuthSignInData = {
  email: string;
  password: string;
};

export type GoogleAuthData = {
  token: string | undefined;
};

export interface AuthCheckEmailData {
  email: string;
}

export interface AuthResetPasswordData {
  encodedToken: string;
  password: string;
}

export interface AuthVerificationData {
  link: string | undefined;
}

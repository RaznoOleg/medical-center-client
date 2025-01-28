export type User = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  isVerified: boolean;
  role: string;
  address: string;
  birthDate: string;
  city: string;
  country: string;
  specialization: number;
  photoUrl: string;
  gender: string;
};

export type UpdateUserData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  birthDate: string;
  city: string;
  country: string;
  specialization: number;
  gender: string;
};

export type UserDataResponse = User;

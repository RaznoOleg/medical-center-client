import { RootState } from '../../store';

export const selectAuthToken = (state: RootState) => state.auth.accessToken;

export const selectAuthData = (state: RootState) => state.auth.authData;

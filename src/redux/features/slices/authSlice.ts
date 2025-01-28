import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSignUpData } from '../../types/auth.type';
import { clearUserData } from './userSlice';
import { AppDispatch } from '../../store';
import { clearNavigationData } from './navigationSlice';

export interface IAuthState {
  authData?: AuthSignUpData | null;
  accessToken?: string | null;
}

export const initialState: IAuthState = {
  authData: null,
  accessToken: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    setSignUpFirstStepData: (state, action: PayloadAction<AuthSignUpData>) => {
      state.authData = action.payload;
    },
    clearAuthData: () => initialState
  }
});

export const signOut = () => (dispatch: AppDispatch) => {
  dispatch(clearUserData());
  dispatch(clearAuthData());
  dispatch(clearNavigationData());
};

export const { setSignUpFirstStepData, setAuthToken, clearAuthData } =
  authSlice.actions;

export default authSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user.type';

export interface IUserState {
  user: User | null;
}

export const initialState: IUserState = {
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    clearUserData: () => initialState
  }
});

export default userSlice.reducer;

export const { setUser, clearUserData } = userSlice.actions;

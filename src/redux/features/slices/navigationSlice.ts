import { createSlice } from '@reduxjs/toolkit';

export interface INavState {
  currentPage: string | null;
}

const initialState: INavState = {
  currentPage: null
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    clearNavigationData: () => initialState
  }
});

export default navigationSlice.reducer;

export const { setCurrentPage, clearNavigationData } = navigationSlice.actions;

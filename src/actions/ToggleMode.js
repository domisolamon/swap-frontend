import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDark: false,
  currentTitle: 'Home',
  userBalance: 0,
};


export const mode = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setDark:(state) => {
        state.isDark = !state.isDark;
    },
    setCurrentTitle: (state, action) => {
      state.currentTitle = action.payload;
    },
    setUserBalance: (state, action) => {
      state.userBalance = action.payload;
    },
  },
  
});

export const { setDark, setCurrentTitle, setUserBalance } = mode.actions;

export const getMode = (state) => state.mode.isDark;
export const getCurrentTitle = (state) => state.mode.currentTitle;
export const getUserBalance = (state) => state.mode.userBalance;


export default mode.reducer;

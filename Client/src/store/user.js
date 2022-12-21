import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isSet: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log('in set user');
      // console.log(current(state));
      // console.log(action.payload);

      state.user = action.payload;
      state.isSet = true;
    },
    resetUser: (state, action) => {
      state.user = null;
      state.isSet = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;

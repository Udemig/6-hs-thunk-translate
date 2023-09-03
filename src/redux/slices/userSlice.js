import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../actions/userActions';

const initialState = {
  users: [],
  isLoading: true,
  isError: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  //! thunk aksiyonlarını yönetmek için extraReducers kullanılıcak
  extraReducers: {
    //* henüz api'dan cevap gelmediyse
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },

    //* api'den olumlu cevap geldiyse
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.isError = false;
    },

    //* api'dan olumsuz cevap geldiyse
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export default userSlice.reducer;

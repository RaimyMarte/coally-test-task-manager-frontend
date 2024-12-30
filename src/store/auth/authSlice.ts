import { UserInterface } from '@/interfaces/user/userInterface';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  status: string,
  user: UserInterface | null
}

const initialState: InitialState = {
  status: "checking", //'checking', 'not-authenticated', 'authenticated'
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginState: (state, { payload }: { payload: UserInterface | null }) => {
      state.status = "authenticated";
      state.user = payload
    },

    logoutState: (state) => {
      state.status = "not-authenticated";
      state.user = null
    },

    checkingCredentials: (state) => {
      state.status = "checking";
    },
  }
});

export const { loginState, logoutState, checkingCredentials } = authSlice.actions;
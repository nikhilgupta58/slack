import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ILoginSlice } from "../types";

const initialState: ILoginSlice = {
  user: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<ILoginSlice>) => {
      state.user = action.payload.user;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer;

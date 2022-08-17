import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IMessageSlice {
  message: Object[];
}

const initialState: IMessageSlice = {
  message: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<IMessageSlice>) => {
      state.message = action.payload.message;
    },
  },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;

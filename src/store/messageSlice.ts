import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IMessageSlice {
  message: Object[];
  refetch: () => void;
}

const initialState: IMessageSlice = {
  message: null,
  refetch: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<IMessageSlice>) => {
      state.message = action.payload.message;
      state.refetch = action.payload.refetch;
    },
  },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;

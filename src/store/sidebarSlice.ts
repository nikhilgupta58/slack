import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ISidebarSlice {
  active: boolean;
}

const initialState: ISidebarSlice = {
  active: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebar: (state, action: PayloadAction<ISidebarSlice>) => {
      state.active = action.payload.active;
    },
  },
});

export const { setSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;

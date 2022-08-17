import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./store/loginSlice";
import messageSlice from "./store/messageSlice";
import sidebarSlice from "./store/sidebarSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    sidebar: sidebarSlice,
    message: messageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

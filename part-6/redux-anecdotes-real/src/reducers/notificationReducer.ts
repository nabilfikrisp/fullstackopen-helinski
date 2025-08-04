import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
    clearNotification: () => {
      return "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setTimedNotification = (
  message: string,
  timeInSeconds: number = 5
) => {
  return (dispatch: AppDispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeInSeconds * 1000);
  };
};

export const notificationReducer = notificationSlice.reducer;

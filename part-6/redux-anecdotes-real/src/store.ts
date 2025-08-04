import { configureStore } from "@reduxjs/toolkit";
import { anecdoteReducer } from "./reducers/anecdoteReducer";
import { filterReducer } from "./reducers/filterReducer";
import { notificationReducer } from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

// reducers
import authReducer from "./auth/authSlice";
import alertReducer from "./alert/alertSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

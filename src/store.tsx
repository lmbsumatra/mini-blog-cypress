import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/login";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: { login: loginReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

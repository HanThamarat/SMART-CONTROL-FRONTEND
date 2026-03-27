import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authReducer from "./slice/authSlice";
import widgetReducer from "./slice/widgetSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        widget: widgetReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
import {configureStore} from "@reduxjs/toolkit";
import sideBarContextReducer from "@/shared/store/slices/sideBarContextSlice";

export const store = configureStore({
    reducer: {
        sideBarContext: sideBarContextReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

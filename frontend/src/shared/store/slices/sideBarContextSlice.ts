import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SideBarContext = "messages" | "savedMessages" | "archiveChats" | "contacts" | "settings";

interface SideBarContextState {
    activeContext: SideBarContext;
}

const initialState: SideBarContextState = {
    activeContext: "messages",
};

const sideBarContextSlice = createSlice({
    name: "sideBarContext",

    initialState,

    reducers: {
        setActiveSideBarContext: (state, action: PayloadAction<SideBarContext>) => {
            state.activeContext = action.payload;
        },
    },
});

export const {setActiveSideBarContext} = sideBarContextSlice.actions;

export default sideBarContextSlice.reducer;

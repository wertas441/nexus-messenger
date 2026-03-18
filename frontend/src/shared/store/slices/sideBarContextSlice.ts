import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SideBarContext = "messages" | "savedMessages" | "archiveChats" | "contacts" | "settings";

interface SideBarContextState {
    activeContext: SideBarContext;
    isMobileMenuOpen: boolean;
}

const initialState: SideBarContextState = {
    activeContext: "messages",
    isMobileMenuOpen: false,
};

const sideBarContextSlice = createSlice({
    name: "sideBarContext",

    initialState,

    reducers: {
        setActiveSideBarContext: (state, action: PayloadAction<SideBarContext>) => {
            state.activeContext = action.payload;
            state.isMobileMenuOpen = false;
        },

        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
    },
});

export const { setActiveSideBarContext, toggleMobileMenu } = sideBarContextSlice.actions;

export default sideBarContextSlice.reducer;

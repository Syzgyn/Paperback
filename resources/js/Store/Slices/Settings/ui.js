import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import createFetchHandler from "@/Store/Slices/Creators/createFetchHandler";
import { toast } from "react-toastify";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    error: null,
    pendingChanges: {},
    isSaving: false,
    saveError: null,
    item: {},
};

export const fetchUISettings = createFetchHandler("settings/ui/fetchUISettings", "/api/settings/ui");
export const saveUISettings = createAsyncThunk(
    "settings/ui/saveSettings",
    async (values) => {
        const response = await axios.post("/api/settings", { ui: values });
        if (response.data === 1) {
            toast.dark("Settings Saved");
        } else {
            toast.dark("Error saving settings");
        }
    }
);

export const slice = createSlice({
    name: "ui",
    initialState: defaultState,
    reducers: {},
    extraReducers: {
        ...fetchUISettings.reducers,
        [fetchUISettings.fulfilled]: (state, action) => {
            state.item = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
        },
    },
});

export const UISettingsSelector = createSelector(
    (state) => state.settings.ui,
    (ui) => {
        return ui.item;
    }
);

export default slice.reducer;

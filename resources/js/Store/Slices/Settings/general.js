import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
};

export const fetchSettings = createAsyncThunk(
    "settings/general/fetchSettings",
    async () => {
        const response = await axios.get("/api/settings/general");
        return response.data;
    }
);

export const submitSettings = createAsyncThunk(
    "settings/general/submitSettings",
    async (values) => {
        const response = await axios.post("/api/settings", { general: values });
        if (response.data === 1) {
            toast.dark("Settings Saved");
        } else {
            toast.dark("Error saving settings");
        }
    }
);

export const slice = createSlice({
    name: "general",
    initialState: defaultState,
    reducers: {},
    extraReducers: {
        [fetchSettings.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchSettings.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchSettings.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export const settingsGeneralSelector = (state) => state.settings.general;

export default slice.reducer;

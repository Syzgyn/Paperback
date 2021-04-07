import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createFetchHandler from "@/Store/Slices/Creators/createFetchHandler";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    error: null,
    isSaving: false,
    saveError: null,
    items: [],
};

export const fetchRootFolders = createFetchHandler("rootFolders/fetchRootFolders", "/api/rootFolder");
export const addRootFolder = createAsyncThunk(
    "rootFolders/addItem",
    async (path, { dispatch }) => {
        const response = await axios.post("/api/rootFolder", { path });
        dispatch(fetchRootFolders());
        return response.data;
    }
);

export const deleteRootFolder = createAsyncThunk(
    "rootFolders/deleteItem",
    async (id, { dispatch }) => {
        const response = await axios.delete("/api/rootFolder/" + id);
        dispatch(fetchRootFolders());
        return response.data;
    }
);

const slice = createSlice({
    name: "rootFolders",
    initialState: defaultState,
    reducers: {},
    extraReducers: {
        [fetchRootFolders.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchRootFolders.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchRootFolders.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export const rootFoldersSelector = (state) => state.rootFolders;
export default slice.reducer;

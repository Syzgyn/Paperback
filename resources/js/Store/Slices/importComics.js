import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { batch } from "react-redux";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
};

export const fetchItems = createAsyncThunk(
    "importComics/fetch",
    async (folderId) => {
        const response = await axios.get("/api/rootFolder/" + folderId + "/import");
        return response.data.data;
    }
);

const slice = createSlice({
    name: "importComics",
    initialState: defaultState,
    reducers: {
        clearImportComics() {
            return defaultState;
        },
    },
    extraReducers: {
        [fetchItems.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchItems.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export const importComicsSelector = (state) => state.importComics;
export const { clearImportComics } = slice.actions;
export default slice.reducer;


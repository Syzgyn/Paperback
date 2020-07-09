import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { batch } from "react-redux";
//import { searchForComic } from '@/Store/Slices/indexers';
import { fetchComics } from "@/Store/Slices/comics";
import { toast } from "react-toastify";
import AddComicMessage from "@/AddComic/AddNewComic/AddComicMessage";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
    isAdding: false,
    isAdded: false,
};

export const searchComics = createAsyncThunk(
    "addComics/search",
    async (query) => {
        // eslint-disable-next-line
        if (!!query.trim()) {
            const response = await axios.get("/api/comic/search", {
                params: { query: query },
            });
            return response.data.data;
        }

        return false;
    }
);

export const addComic = createAsyncThunk(
    "addComics/add",
    async (cvid, { dispatch }) => {
        const response = await axios.post("/api/comic", { cvid });
        if (response.data.data) {
            toast(
                <AddComicMessage cvid={cvid} name={response.data.data.name} />
            );
            batch(() => {
                dispatch(fetchComics());
                dispatch(clearAddComics());
            });
        }

        return response.data.data;
    }
);

export const addComicAndSearch = (cvid) => async (dispatch) => {
    batch(() => {
        dispatch(addComic(cvid));
        //dispatch(searchForComic(cvid));
    });
};

const slice = createSlice({
    name: "addComics",
    initialState: defaultState,
    reducers: {
        clearAddComics() {
            return defaultState;
        },
    },
    extraReducers: {
        [searchComics.pending]: (state) => {
            state.isLoading = true;
        },
        [searchComics.fulfilled]: (state, action) => {
            if (action.payload) {
                state.items = action.payload;
            }
            state.isPopulated = true;
            state.isLoading = false;
        },
        [searchComics.rejected]: (state) => {
            state.isLoading = false;
        },
        [addComic.pending]: (state) => {
            state.isAdding = true;
        },
        [addComic.fulfilled]: (state) => {
            state.isAdded = true;
            state.isAdding = false;
        },
        [addComic.rejected]: (state) => {
            state.isAdding = false;
        },
    },
});

export const addComicsSelector = (state) => state.addComics;
export const { clearAddComics } = slice.actions;
export default slice.reducer;

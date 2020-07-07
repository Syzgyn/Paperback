import {
    createAction,
    createAsyncThunk,
    createSlice,
    createSelector,
} from "@reduxjs/toolkit";
import { getCurrentCvidSelector } from "@/Store/Slices/router";
import axios from "axios";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
};

export const fetchComics = createAsyncThunk("comics/fetchComics", async () => {
    const response = await axios.get("/api/comic");
    return response.data.data;
});

export const toggleComicMonitored = createAction("comics/toggleComicMonitored");

const slice = createSlice({
    name: "comics",
    initialState: defaultState,
    reducers: {},
    extraReducers: {
        [toggleComicMonitored]: (state, { payload }) => {
            console.log("inside");
            const { cvid, monitored } = payload;

            const index = state.items.findIndex((item) => item.cvid == cvid);
            state.items[index].monitored = monitored;
        },
        [fetchComics.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchComics.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchComics.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export const comicsSelector = (state) => state.comics;
export const currentComicSelector = createSelector(
    [comicsSelector, getCurrentCvidSelector],
    (comics, cvid) => comics.items.find((comic) => comic.cvid == cvid)
);

export default slice.reducer;

import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
};

export const searchComics = createAsyncThunk("addComics/search", async (query) => {
    const response = await axios.get("/api/comic/search", {params: {query: query}});
    return response.data.data;
});

const slice = createSlice({
    name: 'addComics',
    initialState: defaultState,
    reducers: {},
    extraReducers: {
        [searchComics.pending]: (state) => {
            state.isLoading = true
        },
        [searchComics.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [searchComics.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export const addComicsSelector = (state) => state.addComics

export default slice.reducer;

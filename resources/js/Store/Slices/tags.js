import {
    createAction,
    createAsyncThunk,
    createSlice,
    createSelector,
    current,
} from "@reduxjs/toolkit";
import axios from "axios";
import { push } from "connected-react-router";
import { batch } from "react-redux";
import createFetchHandler from "@/Store/Slices/Creators/createFetchHandler";
import createRemoveItemHandler from "@/Store/Slices/Creators/createRemoveItemHandler";

const defaultState = {
  isLoading: false,
  isPopulated: false,
  error: null,
  items: [],

  details: {
    isLoading: false,
    isPopulated: false,
    error: null,
    items: []
  }
}

export const fetchTags = createFetchHandler("tags/fetchTags", "/api/tags");
export const addTag    = createAsyncThunk(
    "tags/addTag",
    async (tag, { dispatch }) => {
        const response = await axios.post("/api/tags", { tag });
        return response.data.data;
    }
);
export const deleteTag = createRemoveItemHandler("tags/deleteTag", "/api/tags");
export const fetchTagDetails = createFetchHandler("tags/details", "/api/tags/detail");

const slice = createSlice({
    name: "tags",
    initialState: defaultState,
    reducers: {},
    extraReducers: {
        ...fetchTags.reducers,
        [fetchTags.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.isLoading = false;
            state.isPopulated = true;
        },
        [fetchTagDetails.pending]: (state) => {
            state.details.isLoading = true;
        },
        [fetchTagDetails.fulfilled]: (state, action) => {
            state.details.items.push(action.payload);
            state.details.isLoading = false;
            state.details.isPopulated = true; 
        },
        [fetchTagDetails.fulfilled]: (state, action) => {
            state.details.isLoading = false;
            state.details.isPopulated = false;
            state.details.error = action.error;
        },
    },
});

export const tagsSelector = createSelector(
    (state) => state.tags.items,
    (tags) => { tags }
);

export const tagDetailsSelector = createSelector(
    (state, { id }) => id,
    (state) => state.tags.details.items,
    (id, tagDetails) => {
        return tagDetails.find((t) => t.id === id);
    }
);

export default slice.reducer;

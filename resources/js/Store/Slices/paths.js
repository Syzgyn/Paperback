import {
    createAction,
    createAsyncThunk,
    createSlice,
    createSelector,
    current,
} from "@reduxjs/toolkit";
import axios from "axios";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    directories: [],
    files: [],
    currentPath: "",
};

export const fetchPaths = createAsyncThunk(
    "paths/fetchPaths",
    async (vars, {getState}) => {
        const state = getState();
        const response = await axios.get("/api/filesystem", { params: { path: state.paths.currentPath} });
        return response.data;
    }
);

export const setCurrentPath = createAction("paths/setCurrentPath");

const slice = createSlice({
    name: "paths",
    initialState: defaultState,
    reducers: {},
    extraReducers: {
        [fetchPaths.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchPaths.fulfilled]: (state, action) => {
            state.directories = action.payload.directories;
            state.files = action.payload.files;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchPaths.rejected]: (state) => {
            state.isLoading = false;
        },
        [setCurrentPath]: (state, action) => {
            if (action.payload == '..') {
                const currentState = current(state);
                state.currentPath = currentState.currentPath.slice (0, currentState.currentPath.lastIndexOf('/'));
            } else {
                state.currentPath = action.payload;
            }
        },
    },
});

export const pathsSelector = (state) => state.paths;
export default slice.reducer;

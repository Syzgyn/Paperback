import {
    createAction,
    createAsyncThunk,
    createSlice,
    current,
} from "@reduxjs/toolkit";
import axios from "axios";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    directories: [],
    files: [],
    currentPath: "",
    error: null,
    parent: null,
};

export const fetchPaths = createAsyncThunk(
    "paths/fetchPaths",
    async (payload, { dispatch }) => {
        const {
            path,
            allowFoldersWithoutTrailingSlashes = false,
            includeFiles = false
        } = payload;
        const response = await axios.get("/api/filesystem", {
            params: {
                path,
                allowFoldersWithoutTrailingSlashes,
                includeFiles,
            },
        });
        if (response.data) {
            dispatch(updatePaths({path,  ...response.data}));
        }
    }
);

export const updatePaths = createAction("paths/updatePaths");
export const clearPaths = createAction("paths/clearPaths");

const slice = createSlice({
    name: "paths",
    initialState: defaultState,
    reducers: {},
    extraReducers: {
        [fetchPaths.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchPaths.fulfilled]: (state, action) => {
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchPaths.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action;
        },
        [updatePaths]: (state, { payload }) => {
            state.currentPath = payload.path;
            state.directories = payload.directories;
            state.files = payload.files;
            state.parent = payload.parent;
        },
        [clearPaths]: (state) => {
            state.currentPath = '';
            state.directories = [];
            state.files = [];
            state.parent = '';
        },
    },
});

export const pathsSelector = (state) => state.paths;
export default slice.reducer;
